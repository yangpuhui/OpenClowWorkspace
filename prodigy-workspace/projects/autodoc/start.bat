@echo off
cd /d "%~dp0"

echo Starting AutoDoc...
echo.

echo [1/2] Starting backend (port 3001)...
start "AutoDoc Backend" cmd /k "node backend/src/server.js"

echo [2/2] Starting frontend (port 3000)...
cd frontend
if not exist node_modules call npm install
start "AutoDoc Frontend" cmd /k "npm run dev"
cd ..

echo.
echo AutoDoc is running!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo.
echo Opening browser...
timeout /t 2 /nobreak > nul
start http://localhost:3000
