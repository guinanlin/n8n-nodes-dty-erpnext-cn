# 发布指南

## 发布到 npm 仓库

### 前置要求

1. **npm 账户**: 确保您有 npm 账户并已登录
2. **包名唯一性**: 确保包名 `n8n-nodes-dty-erpnext-cn` 在 npm 仓库中是唯一的

### 发布步骤

#### 1. 更新项目信息

在发布之前，请更新以下文件中的信息：

- `package.json` 中的作者信息
- `README.md` 中的项目描述
- 确保所有必要的文件都已准备好

#### 2. 构建项目

```bash
# 使用 pnpm 构建
pnpm run build

# 或者使用 npm
npm run build
```

#### 3. 检查构建结果

确保 `dist/` 目录包含以下文件：
- `dist/nodes/ExampleNode/ExampleNode.node.js`
- `dist/nodes/HttpBin/HttpBin.node.js`
- `dist/nodes/HttpBin/HttpVerbDescription.js`
- `dist/credentials/ExampleCredentialsApi.credentials.js`
- `dist/credentials/HttpBinApi.credentials.js`
- 相应的图标文件

#### 4. 登录 npm

```bash
npm login
```

#### 5. 发布包

**方法一：使用发布脚本（推荐）**
```bash
npm run publish:check
```

**方法二：直接发布**
```bash
npm publish
```

### 发布后验证

1. 访问 https://www.npmjs.com/package/n8n-nodes-dty-erpnext-cn
2. 确认包已成功发布
3. 检查包的内容和文档

### 更新版本

如果需要更新包，请：

1. 更新 `package.json` 中的版本号
2. 重新构建项目
3. 发布新版本

```bash
# 更新版本号（例如：0.1.1）
npm version patch  # 或 minor, major

# 重新构建
pnpm run build

# 发布
npm publish
```

### 常见问题

#### 包名已存在
如果包名已被占用，请：
1. 更改 `package.json` 中的 `name` 字段
2. 更新相关文档中的包名引用

#### 发布权限问题
确保您有发布权限：
1. 检查是否已登录正确的 npm 账户
2. 确认包名是否属于您的组织

#### 构建失败
如果构建失败：
1. 检查 TypeScript 配置
2. 确保所有依赖已安装
3. 检查代码中的语法错误

### 维护

发布后，请：
1. 监控包的使用情况
2. 及时响应用户反馈
3. 定期更新依赖
4. 修复发现的问题 