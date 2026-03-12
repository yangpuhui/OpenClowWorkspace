@echo off
echo ========================================
echo    CodeProdigy 完整监控启动器
echo ========================================
echo.

cd C:\Users\25326\.openclaw\workspace\prodigy-workspace

echo 正在启动监控系统...
echo.
echo 1. 打开仪表板（浏览器）
start dashboard.html

echo 2. 启动实时监控（命令行）
echo    每30秒刷新一次
echo    按 Ctrl+C 退出
echo.
node scripts/monitor.js --watch --interval=30000

pause
