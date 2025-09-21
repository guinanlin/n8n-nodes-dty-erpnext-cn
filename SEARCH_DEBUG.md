# 文档类型搜索功能调试指南

## 🐛 问题描述
用户反馈：在文档查询中，输入关键词后无法从后台返回正确的文档类型。

## 🔧 修复内容

### 1. 发现的核心问题
- **误解了n8n搜索机制**: n8n中的`searchable: true`是**客户端搜索**，不是服务器端搜索
- **不必要的服务器端过滤**: 原来尝试在API调用时进行搜索过滤，这是错误的
- **searchTerm参数无效**: n8n的loadOptions方法中的searchTerm参数在客户端搜索模式下不会被传递

### 2. 修复后的代码
```typescript
async getDocTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    // n8n的searchable: true是客户端搜索，不需要服务器端搜索参数
    const query: IDataObject = {
        // 获取所有DocType，让客户端进行搜索过滤
        limit_page_length: 100, // 增加限制以获取更多选项
        limit_start: 0,
    };
    
    const responseData = await erpNextApiRequest.call(
        this,
        'GET',
        '/api/resource/DocType',
        {},
        query,
    );
    
    const docTypes = responseData.data.map(({ name }: { name: string }) => {
        return { name, value: encodeURI(name) };
    });

    return processNames(docTypes);
}
```

### 3. n8n搜索机制说明
- **客户端搜索**: n8n的`searchable: true`参数启用客户端搜索
- **工作流程**: 
  1. 调用`getDocTypes()`获取所有选项
  2. n8n在浏览器中对选项进行实时过滤
  3. 用户输入时，客户端自动过滤匹配的选项
- **优势**: 响应速度快，用户体验好
- **限制**: 受限于初始加载的选项数量

## 🧪 测试步骤

### 1. 编译项目
```bash
pnpm build
```

### 2. 同步到n8n
```bash
# Windows
pnpm run sync:win

# Linux/Mac  
pnpm run sync
```

### 3. 测试搜索功能
1. 重启n8n服务
2. 创建新的工作流
3. 添加ERPNextCN节点
4. 选择资源为"文档查询"
5. 选择操作为"获取"或"Get Many"
6. 在"文档类型"字段中输入搜索关键词，如：
   - "Customer" (客户)
   - "Sales" (销售)
   - "Item" (项目)
   - "User" (用户)

### 4. 预期结果
- 输入关键词后，下拉列表应该显示匹配的文档类型
- 搜索结果应该按名称排序且无重复项
- 最多显示100个选项（在客户端过滤）
- 搜索是实时的，无需等待API响应

## 🔍 调试信息

### API请求格式
```
GET /api/resource/DocType?limit_page_length=100&limit_start=0
```

### 响应格式
```json
{
    "data": [
        {
            "name": "Customer",
            "creation": "2024-01-01 12:00:00",
            ...
        }
    ]
}
```

## ⚠️ 注意事项
1. 确保ERPNext API凭证配置正确
2. 确保ERPNext服务器可访问
3. 搜索功能依赖于ERPNext的DocType表数据
4. 如果仍有问题，检查网络请求日志和ERPNext服务器日志

## 📝 已修复的文件
- `nodes/ERPNextCN/ERPNextCN.node.ts` - 修复搜索逻辑
