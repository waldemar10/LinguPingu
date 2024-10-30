REM This batch file starts the server and client applications for the AWD-website project.
REM FILEPATH: ../AWD-website/START.bat
@echo off
start "Server" cmd /k "cd server && npm start"
start "Client" cmd /k "cd client && npm start"
