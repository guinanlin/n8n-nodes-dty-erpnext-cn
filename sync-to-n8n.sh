#!/bin/bash

# ERPNextCN节点同步到n8n脚本
# 使用方法: ./sync-to-n8n.sh

echo "🚀 开始同步ERPNextCN节点到n8n..."

# 1. 构建项目
echo "📦 构建项目..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查代码错误"
    exit 1
fi

echo "✅ 构建成功"

# 2. 停止n8n服务（如果正在运行）
echo "🛑 停止n8n服务..."
pkill -f "n8n start" || echo "n8n服务未运行"

# 3. 清理旧的节点文件
echo "🧹 清理旧的节点文件..."
rm -rf ~/.n8n/custom/ERPNextCN

# 4. 复制新的节点文件
echo "📋 复制新的节点文件..."
cp -r dist/nodes/ERPNextCN ~/.n8n/custom/

if [ $? -ne 0 ]; then
    echo "❌ 复制失败"
    exit 1
fi

echo "✅ 节点文件复制成功"

# 5. 重启n8n服务
echo "🔄 启动n8n服务..."
n8n start &

echo "🎉 同步完成！"
echo "📱 n8n界面: http://localhost:5678"
echo "💡 提示: 如果节点没有显示，请刷新浏览器页面"
