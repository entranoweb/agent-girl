# Agent Girl - Start Server in WSL
# Double-click this file or run: .\start-server.ps1

Write-Host "🚀 Starting Agent Girl in WSL..." -ForegroundColor Cyan

# Run the WSL startup script
wsl bash start-wsl.sh

# Open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:3001"

Write-Host "`n✅ Server running at http://localhost:3001" -ForegroundColor Green
Write-Host "📝 View logs: wsl cat /tmp/agent-girl.log" -ForegroundColor Yellow
Write-Host "🛑 Stop server: wsl pkill -9 bun`n" -ForegroundColor Red
