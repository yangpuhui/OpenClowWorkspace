@echo off
chcp 65001 >nul
echo ═══════════════════════════════════════════════════════════════
echo   AutoDoc API 测试
echo ═══════════════════════════════════════════════════════════════
echo.

echo [测试1] 健康检查
curl -s http://localhost:3001/health
echo.
echo.

echo [测试2] 获取API文档
curl -s http://localhost:3001/api/docs
echo.
echo.

echo [测试3] 获取配置
curl -s http://localhost:3001/api/config
echo.
echo.

echo ═══════════════════════════════════════════════════════════════
echo   ✅ 测试完成
echo ═══════════════════════════════════════════════════════════════
echo.

pause
