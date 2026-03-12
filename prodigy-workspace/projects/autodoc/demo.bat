@echo off
chcp 65001 >nul
echo ═══════════════════════════════════════════════════════════════
echo   AutoDoc 演示项目 - 快速启动
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/2] 正在启动后端文档服务器...
start "AutoDoc Backend" cmd /k "node backend/src/server.js"

echo     ✓ 后端服务器启动成功（端口3001）
echo.

echo [2/2] 正在启动前端界面...
cd frontend
start "AutoDoc Frontend" cmd /k "if not exist node_modules (echo 正在安装依赖... && npm install) && npm run dev"

echo     ✓ 前端服务器启动成功（端口3000）
echo.

echo ═══════════════════════════════════════════════════════════════
echo   🎉 启动完成！
echo ═══════════════════════════════════════════════════════════════
echo.
echo   📖 访问地址：
echo   • 前端界面：http://localhost:3000
echo   • 后端API：  http://localhost:3001/api/docs
echo.
echo   📝 演示文件：examples/app.py
echo   📚 详细说明：DEMO.md
echo.
echo   ⚠️  提示：
echo   • 修改 examples/app.py 文件会自动刷新文档
echo   • 关闭此窗口不会停止服务，请手动关闭弹出的两个窗口
echo   • 首次运行需要安装npm依赖（可能需要1-2分钟）
echo.
echo ═══════════════════════════════════════════════════════════════

timeout /t 3 /nobreak > nul

echo.
echo 正在打开浏览器...
start http://localhost:3000

echo.
echo ✅ 浏览器已打开，现在可以查看演示了！
echo.
pause
