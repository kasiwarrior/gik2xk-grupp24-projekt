@echo off
echo Starting Server
cd server
start server.bat

echo Starting UI
cd ..
cd client
start client.bat