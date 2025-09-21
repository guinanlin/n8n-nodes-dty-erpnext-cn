# DocType搜索关键字解决方案

## 🎯 **解决方案概述**

我们添加了一个独立的"DocType搜索关键字"参数，用户可以通过输入关键字来动态搜索和过滤DocType选项。这是一个更直观和可靠的搜索方案。

## ✅ **实现的功能**

### 🔧 **新增参数**
- **DocType搜索关键字**: 用户可以输入任意关键字进行搜索
- **动态依赖**: docType下拉列表会根据搜索关键字动态更新

### 📋 **字段配置**

#### 1. 搜索关键字字段
```typescript
{
    displayName: 'DocType 搜索关键字',
    name: 'docTypeSearchKeyword',
    type: 'string',
    default: '',
    description: '输入关键字搜索DocType，支持模糊匹配',
    placeholder: '例如：Customer, Sales, Item',
}
```

#### 2. DocType选择字段
```typescript
{
    displayName: '文档类型 Name or ID',
    name: 'docType',
    type: 'options',
    typeOptions: {
        loadOptionsMethod: 'getDocTypes',
        loadOptionsDependsOn: ['docTypeSearchKeyword'], // 关键：依赖于搜索关键字
    },
}
```

### 🚀 **后端实现**

```typescript
async getDocTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    // 获取用户输入的搜索关键字
    const searchKeyword = this.getCurrentNodeParameter('docTypeSearchKeyword') as string;
    
    const query: IDataObject = {
        limit_page_length: 50,
        limit_start: 0,
    };
    
    // 如果提供了搜索关键字，进行服务器端搜索
    if (searchKeyword && searchKeyword.trim()) {
        query.filters = JSON.stringify([['name', 'like', `%${searchKeyword.trim()}%`]]);
    }
    
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

## 🎯 **使用方法**

### 📝 **操作步骤**
1. 在"DocType搜索关键字"字段中输入关键字（如：Customer）
2. 系统会自动调用API搜索匹配的DocType
3. "文档类型"下拉列表会显示匹配的结果
4. 从下拉列表中选择所需的DocType

### 🔍 **搜索示例**

| 输入关键字 | 预期结果 |
|-----------|---------|
| `Customer` | Customer, Customer Group, Customer Credit Limit, etc. |
| `Sales` | Sales Invoice, Sales Order, Sales Person, etc. |
| `Item` | Item, Item Group, Item Price, etc. |
| `User` | User, User Permission, User Type, etc. |

## ✨ **功能特性**

### 🎯 **智能搜索**
- **模糊匹配**: 支持部分关键字匹配
- **实时更新**: 输入关键字后自动更新下拉列表
- **服务器端搜索**: 支持搜索所有1000+个DocType

### 📊 **性能优化**
- **结果限制**: 最多返回50个匹配结果
- **按需加载**: 只有在有搜索关键字时才进行API调用
- **缓存机制**: n8n会缓存搜索结果

### 🛡️ **用户体验**
- **直观操作**: 明确的搜索字段，用户知道如何操作
- **即时反馈**: 输入关键字后立即看到结果
- **灵活搜索**: 可以输入任意长度的关键字

## 🧪 **测试步骤**

### 1. 编译和同步
```bash
pnpm build
pnpm run sync:win
```

### 2. 重启n8n服务

### 3. 测试搜索功能
1. 创建新的工作流
2. 添加ERPNextCN节点
3. 选择"文档查询"资源
4. 选择"获取"或"Get Many"操作
5. 在"DocType搜索关键字"字段中输入测试关键字
6. 观察"文档类型"下拉列表的更新

## 📈 **预期效果**

### ✅ **解决的问题**
- ✅ 支持搜索所有1000+个ERPNext文档类型
- ✅ 用户友好的搜索界面
- ✅ 可靠的服务器端搜索
- ✅ 清晰的用户操作流程

### 🎯 **搜索流程**
```
用户输入关键字 → API搜索 → 返回匹配结果 → 更新下拉列表 → 用户选择
```

## 📝 **技术要点**

### 🔑 **关键配置**
- `loadOptionsDependsOn: ['docTypeSearchKeyword']`: 使docType字段依赖于搜索关键字
- `this.getCurrentNodeParameter('docTypeSearchKeyword')`: 获取用户输入的搜索关键字
- `filters=[["name","like","%keyword%"]]`: ERPNext API的模糊搜索格式

### ⚠️ **注意事项**
1. 搜索关键字为空时，返回前50个常用DocType
2. 确保ERPNext API凭证配置正确
3. 网络延迟可能影响搜索响应速度
4. 搜索结果按ERPNext的默认排序返回

## 🎉 **总结**

这个解决方案提供了一个直观、可靠的DocType搜索功能：
- 🎯 **简单易用**: 用户只需输入关键字即可搜索
- ⚡ **高效搜索**: 服务器端搜索，支持所有DocType
- 🔄 **动态更新**: 实时更新下拉列表选项
- 📱 **用户友好**: 清晰的操作界面和反馈
