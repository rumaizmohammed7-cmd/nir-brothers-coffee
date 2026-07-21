@echo off
netstat -o -an | findstr :5173 >nul
if %errorlevel% equ 0 (
    start http://localhost:5173
    exit
)
set PATH=C:\Users\Lenovo\node-portable;%PATH%
cd /d C:\Users\Lenovo\.gemini\antigravity\scratch\nir-brothers-coffee
start http://localhost:5173
npm run dev
