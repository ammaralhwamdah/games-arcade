@echo off
cd /d "C:\Users\ammar yaser\Documents\Default Project\games-arcade"
set "NODE=C:\Users\ammar yaser\Documents\Default Project\games-arcade\.toolchain\node-v24.19.0-win-x64\node.exe"
"%NODE%" "node_modules\next\dist\bin\next" start -p 3000 > server.log 2>&1
