@ECHO OFF
ECHO Starting the project. Running "api/npm start" and "frontend/npm start" commands...
start cmd.exe @cmd /k "cd api && npm start && cd .."
cd frontend && npm start
cd ..
PAUSE