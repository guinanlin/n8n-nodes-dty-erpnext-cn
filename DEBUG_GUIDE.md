# ERPNextCN节点调试指南

## 🔧 节点更新同步方法

当您的ERPNextCN节点有更新时，有以下几种同步方法：

### 方法一：使用npm脚本（最简单）

```bash
# Linux/Mac
pnpm run sync

# Windows
pnpm run sync:win
```

### 方法二：使用批处理脚本

```bash
# Windows
./sync-to-n8n.bat

# Linux/Mac
./sync-to-n8n.sh
```

### 方法三：手动同步

1. **构建项目**
   ```bash
   pnpm run build
   ```

2. **停止n8n服务**
   ```bash
   # 在终端中按 Ctrl+C 停止n8n
   ```

3. **复制文件**
   ```bash
   # Linux/Mac
   cp -r dist/nodes/ERPNextCN ~/.n8n/custom/
   
   # Windows
   xcopy /e /i /y "dist\nodes\ERPNextCN" "%USERPROFILE%\.n8n\custom\ERPNextCN"
   ```

4. **重启n8n**
   ```bash
   n8n start
   ```

## 🚀 开发工作流

### 1. 开发模式
```bash
# 启动监听模式，自动重新编译
pnpm run dev
```

### 2. 代码检查
```bash
# 检查代码质量
pnpm run lint

# 自动修复代码格式
pnpm run lintfix
```

### 3. 同步到n8n
```bash
# 使用便捷脚本
pnpm run sync:win
```

## 🔍 调试技巧

### 1. 查看n8n日志
n8n启动时会在终端显示详细日志，包括：
- 数据库迁移信息
- 节点加载状态
- 错误信息

### 2. 验证节点加载
1. 访问 http://localhost:5678
2. 创建新工作流
3. 在节点面板中查找"erpNextcn"节点

### 3. 常见问题排查

**节点不显示：**
- 检查文件是否正确复制到 `~/.n8n/custom/ERPNextCN/`
- 检查 `package.json` 配置是否正确
- 重启n8n服务

**构建失败：**
- 运行 `pnpm run lint` 检查代码错误
- 确保所有依赖已安装

**API连接问题：**
- 检查ERPNext凭据配置
- 验证API端点是否正确

## 📁 目录结构

```
项目根目录/
├── nodes/ERPNextCN/          # 源代码
├── dist/nodes/ERPNextCN/     # 构建后的代码
├── ~/.n8n/custom/ERPNextCN/  # n8n中的节点文件
├── sync-to-n8n.sh           # Linux/Mac同步脚本
├── sync-to-n8n.bat          # Windows同步脚本
└── DEBUG_GUIDE.md           # 本文件
```

## 🎯 快速更新流程

1. 修改代码
2. 运行 `pnpm run sync:win`
3. 重启n8n（如果正在运行）
4. 在浏览器中测试节点

## 💡 提示

- 使用 `pnpm run dev` 进行开发时，修改代码后需要手动同步
- 同步后如果节点没有更新，尝试刷新浏览器页面
- 建议在修改代码前备份重要文件
