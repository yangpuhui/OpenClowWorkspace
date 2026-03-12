@echo off
echo ========================================
echo    CodeProdigy Launcher ⚡
echo ========================================
echo.
echo 正在启动程序天才agent...
echo.
echo 工作区: C:\Users\25326\.openclaw\workspace\prodigy-workspace
echo GitHub: https://github.com/yangpuhui/OpenClowWorkspace.git
echo.
echo ========================================
echo.

echo 请选择启动方式:
echo 1. 启动为独立会话 (推荐)
echo 2. 启动为编码agent
echo 3. 查看工作区文件
echo 4. 退出
echo.

set /p choice="请输入选项 (1-4): "

if "%choice%"=="1" (
    echo.
    echo 正在启动 CodeProdigy 独立会话...
    echo.
    echo 请在OpenClaw中执行以下命令:
    echo sessions_spawn --task "我是CodeProdigy，工作区在 C:\Users\25326\.openclaw\workspace\prodigy-workspace。请先读取IDENTITY.md和SOUL.md，然后开始第一周的需求挖掘工作。" --runtime "subagent" --label "code-prodigy" --mode "session" --thread true
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo 正在启动 CodeProdigy 编码agent...
    echo.
    echo 请在OpenClaw中执行以下命令:
    echo sessions_spawn --task "你是CodeProdigy，工作区在 C:\Users\25326\.openclaw\workspace\prodigy-workspace。请完成一周冲刺任务。" --runtime "acp" --agentId "codex" --thread true
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo 正在打开工作区...
    explorer "C:\Users\25326\.openclaw\workspace\prodigy-workspace"
    echo.
    echo 已打开工作区目录
    echo.
    pause
) else if "%choice%"=="4" (
    echo.
    echo 退出...
    exit /b
) else (
    echo.
    echo 无效选项
    pause
)
