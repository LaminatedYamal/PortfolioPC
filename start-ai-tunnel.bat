@echo off
title Pedro's LM Studio Tunnel Manager
color 0b

echo =======================================================================
echo              PEDRO'S PORTFOLIO - LOCAL AI TUNNEL MANAGER              
echo =======================================================================
echo.
echo This script will help you expose your local LM Studio server (port 1234)
echo to the public internet using Ngrok, allowing your portfolio chatbot
echo to communicate with your local Qwen3 model!
echo.
echo =======================================================================
echo.

:: Check if ngrok is in the current directory or system PATH
set "NGROK_CMD=ngrok"
if exist "ngrok.exe" (
    set "NGROK_CMD=.\ngrok"
) else (
    where ngrok >nul 2>nul
    if %errorlevel% neq 0 (
        echo [ERROR] Ngrok was not found on your system PATH or project folder.
        echo.
        echo Please make sure you have:
        echo 1. Downloaded Ngrok from: https://ngrok.com/download
        echo 2. Extracted and copied ngrok.exe into this folder:
        echo    %~dp0
        echo.
        echo Press any key to exit...
        pause >nul
        exit /b
    )
)

:: Check if configuration exists
set "CONFIG_FILE=.env.tunnel"
set "STATIC_URL="

if exist "%CONFIG_FILE%" (
    for /f "tokens=2 delims==" %%A in ('findstr "NGROK_STATIC_URL" %CONFIG_FILE%') do set "STATIC_URL=%%A"
)

if "%STATIC_URL%"=="" (
    echo [SETUP] It looks like this is your first time running this script.
    echo.
    echo Please enter your Ngrok Static Domain:
    echo (Example: your-ngrok-static-url.ngrok-free.app)
    echo.
    set /p "STATIC_URL=Static Domain: "
    
    :: Save to configuration file
    echo NGROK_STATIC_URL=%STATIC_URL%> "%CONFIG_FILE%"
    echo [SAVED] Saved static URL to %CONFIG_FILE%
    echo.
)

echo [STARTING] Launching Ngrok tunnel to http://localhost:1234...
echo [INFO] Exposing static domain: %STATIC_URL%
echo.
echo -----------------------------------------------------------------------
echo   IMPORTANT: Make sure LM Studio is running on port 1234
echo   with CORS enabled (go to LM Studio -> Server tab -> Enable CORS).
echo -----------------------------------------------------------------------
echo.

:: Start ngrok
if "%STATIC_URL%"=="" (
    %NGROK_CMD% http 1234
) else (
    %NGROK_CMD% http 1234 --url %STATIC_URL%
)

pause
