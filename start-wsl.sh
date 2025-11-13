#!/bin/bash
# Agent Girl WSL Startup Script
# Run from PowerShell: wsl bash start-wsl.sh

set -e

cd /mnt/e/AI/0_SYNTHIQ/agent-girl

# Kill any existing bun processes
pkill -9 bun 2>/dev/null || true

# Start server detached in background
# setsid + disown ensures it stays running even after shell closes
setsid bun server/server.ts > /tmp/agent-girl.log 2>&1 < /dev/null &
disown

# Wait a moment for server to start
sleep 3

# Verify it's running
if ps aux | grep 'bun server/server.ts' | grep -v grep > /dev/null; then
    echo "✅ Agent Girl server started successfully"
    echo "📍 URL: http://localhost:3001"
    echo "📋 PID: $(ps aux | grep 'bun server/server.ts' | grep -v grep | awk '{print $2}')"
    echo "📝 Logs: /tmp/agent-girl.log"
else
    echo "❌ Failed to start server. Check /tmp/agent-girl.log for errors"
    exit 1
fi
