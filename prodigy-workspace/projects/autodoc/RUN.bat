@echo off
cd /d "%~dp0"
start "AutoDoc Backend" cmd /k "node backend/src/server.js" && cd frontend && start "AutoDoc Frontend" cmd /k "npm run dev" && start http://localhost:3000
