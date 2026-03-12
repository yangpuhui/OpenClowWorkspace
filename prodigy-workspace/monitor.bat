@echo off
echo ========================================
echo    CodeProdigy 状态监控器
echo ========================================
echo.

cd C:\Users\25326\.openclaw\workspace\prodigy-workspace

echo 请选择监控模式:
echo 1. 查看当前状态（一次性）
echo 2. 实时监控（每60秒刷新）
echo 3. 实时监控（每30秒刷新）
echo 4. 实时监控（每10秒刷新）
echo 5. 退出
echo.

set /p choice="请输入选项 (1-5): "

if "%choice%"=="1" (
    echo.
    echo 正在查看当前状态...
    node scripts/monitor.js
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo 启动实时监控（每60秒刷新）...
    echo 按 Ctrl+C 退出
    node scripts/monitor.js --watch --interval=60000
) else if "%choice%"=="3" (
    echo.
    echo 启动实时监控（每30秒刷新）...
    echo 按 Ctrl+C 退出
    node scripts/monitor.js --watch --interval=30000
) else if "%choice%"=="4" (
    echo.
    echo 启动实时监控（每10秒刷新）...
    echo 按 Ctrl+C 退出
    node scripts/monitor.js --watch --interval=10000
) else if "%choice%"=="5" (
    echo.
    echo 退出...
    exit /b
) else (
    echo.
    echo 无效选项
    pause
)
