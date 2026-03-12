@echo off
cd /d "%~dp0"

echo ========================================
echo   AutoDoc Demo - Quick Start
echo ========================================
echo.

echo [1/2] Starting backend server...
start "AutoDoc Backend" cmd /k "node backend/src/server.js"
echo     Done! Backend running on port 3001
echo.

echo [2/2] Starting frontend interface...
cd frontend
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
start "AutoDoc Frontend" cmd /k "npm run dev"
cd ..
echo     Done! Frontend running on port 3000
echo.

echo ========================================
echo   SUCCESS!
echo ========================================
echo.
echo   Open in browser:
echo   - Frontend: http://localhost:3000
echo   - Backend:  http://localhost:3001/api/docs
echo.
echo   Demo file: examples/app.py
echo   Guide: DEMO.md
echo.
echo   Tips:
echo   - Edit examples/app.py to add APIs
echo   - Changes auto-reload documentation
echo   - Close both windows to stop
echo.
echo ========================================

timeout /t 3 /nobreak > nul

echo.
echo Opening browser...
start http://localhost:3000

echo.
echo Browser opened! View the demo now.
echo.
pause
