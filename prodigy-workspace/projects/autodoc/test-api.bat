@echo off
echo ========================================
echo   AutoDoc API Test
echo ========================================
echo.

echo [Test 1] Health Check
curl -s http://localhost:3001/health
echo.
echo.

echo [Test 2] Get API Docs
curl -s http://localhost:3001/api/docs
echo.
echo.

echo [Test 3] Get Config
curl -s http://localhost:3001/api/config
echo.
echo.

echo ========================================
echo   Tests Complete
echo ========================================
echo.

pause
