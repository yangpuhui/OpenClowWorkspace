@echo off
echo ========================================
echo   AutoDoc - Quick Start
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Starting backend server...
start "AutoDoc Backend" cmd /k "cd backend && npm install && node src/server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo [2/3] Starting frontend server...
start "AutoDoc Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo [3/3] AutoDoc is running!
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3001
echo.
echo Press any key to open the documentation in your browser...
pause > nul

start http://localhost:3000
