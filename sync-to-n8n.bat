@echo off
chcp 65001 >nul

echo 🚀 开始同步ERPNextCN节点到n8n...

REM 1. 构建项目
echo 📦 构建项目...
call pnpm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败，请检查代码错误
    pause
    exit /b 1
)

echo ✅ 构建成功

REM 2. 停止n8n服务（如果正在运行）
echo 🛑 停止n8n服务...
taskkill /f /im node.exe /fi "WINDOWTITLE eq n8n*" >nul 2>&1

REM 3. 清理旧的节点文件
echo 🧹 清理旧的节点文件...
if exist "%USERPROFILE%\.n8n\custom\ERPNextCN" (
    rmdir /s /q "%USERPROFILE%\.n8n\custom\ERPNextCN"
)

REM 4. 复制新的节点文件
echo 📋 复制新的节点文件...
xcopy /e /i /y "dist\nodes\ERPNextCN" "%USERPROFILE%\.n8n\custom\ERPNextCN"

if %errorlevel% neq 0 (
    echo ❌ 复制失败
    pause
    exit /b 1
)

echo ✅ 节点文件复制成功

REM 5. 重启n8n服务
echo 🔄 启动n8n服务...
start "n8n" cmd /k "n8n start"

echo 🎉 同步完成！
echo 📱 n8n界面: http://localhost:5678
echo 💡 提示: 如果节点没有显示，请刷新浏览器页面
pause
