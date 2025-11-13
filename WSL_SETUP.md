# Agent Girl - WSL Setup & Fixes

**Date:** 2025-11-13  
**Status:** ✅ Working

---

## 🔧 Required One-Time Setup

These fixes were applied to make Agent Girl work in WSL:

### 1. Bun Symlink (CRITICAL)
Claude SDK subprocess needs `bun` in system PATH:
```bash
sudo ln -sf /home/sahil/.bun/bin/bun /usr/local/bin/bun
```

**Verify:**
```bash
which bun  # Should show: /usr/local/bin/bun
```

### 2. Node.js Check Disabled
The `checkNodeAvailability()` call causes `execSync` to hang in WSL.

**File:** `server/server.ts` (lines 60-63)
```typescript
// Check Node.js availability for Claude SDK subprocess
// TEMPORARILY DISABLED - causes hang in WSL due to execSync issue
// await checkNodeAvailability();
console.log('⚠️  Skipping Node.js check (WSL compatibility)');
```

---

## 🚀 Starting the Server

### Option 1: PowerShell Script (Easiest)
```powershell
.\start-server.ps1
```

### Option 2: Manual WSL Command
```powershell
wsl bash start-wsl.sh
```

### Option 3: Direct Command
```powershell
wsl bash -c "cd /mnt/e/AI/0_SYNTHIQ/agent-girl && setsid bun server/server.ts > /tmp/agent-girl.log 2>&1 < /dev/null & disown"
```

---

## 🛑 Stopping the Server

```powershell
wsl pkill -9 bun
```

---

## 📝 Viewing Logs

```powershell
wsl cat /tmp/agent-girl.log
```

**Live logs:**
```powershell
wsl tail -f /tmp/agent-girl.log
```

---

## 🔍 Troubleshooting

### Server Won't Start
```powershell
# Check if bun is in PATH
wsl which bun

# Should show: /usr/local/bin/bun
# If not, run the symlink command again
```

### SDK Subprocess Errors
```
Failed to spawn Claude Code process: Executable not found in $PATH: "bun"
```

**Fix:** Run the bun symlink command (see #1 above)

### Server Hangs on Startup
If logs stop at "MOONSHOT_API_KEY set", the Node.js check is hanging.

**Fix:** Verify `server/server.ts` has the Node check disabled (see #2 above)

### Port Already in Use
```powershell
wsl lsof -i :3001
wsl pkill -9 bun
```

---

## 📊 Current Configuration

**Project Location:** `/mnt/e/AI/0_SYNTHIQ/agent-girl` (Windows filesystem)  
**Performance Note:** Running from `/mnt/e/` causes 10-20x slower I/O  
**Future Optimization:** Move to `~/projects/agent-girl` for better performance

**Dependencies:**
- ✅ Bun: `/home/sahil/.bun/bin/bun` + `/usr/local/bin/bun` (symlink)
- ✅ Node.js: v20.19.5 (required for Claude SDK subprocess)
- ✅ WSL: Ubuntu

**Port:** 3001  
**Logs:** `/tmp/agent-girl.log`

---

## 🎯 Quick Reference

**Start:** `.\start-server.ps1`  
**Stop:** `wsl pkill -9 bun`  
**Logs:** `wsl cat /tmp/agent-girl.log`  
**Status:** `wsl ps aux | grep 'bun.*server'`

---

## ✅ Verification Checklist

- [x] Bun symlink created (`/usr/local/bin/bun`)
- [x] Node.js check disabled in `server/server.ts`
- [x] Dependencies installed (`bun install`)
- [x] `.env` file exists with API keys
- [x] Server starts without hanging
- [x] Port 3001 responds (HTTP 200)
- [x] Copy-commander agent integrated

**Last Verified:** 2025-11-13 18:54 UTC

---

## 📌 Important Notes

1. **Always use WSL** - Don't run with PowerShell/Windows `bun` directly
2. **Background process** - Uses `setsid` + `disown` to stay alive
3. **Fast restart** - Kill old process before starting new one
4. **Logs persist** - Check `/tmp/agent-girl.log` for debugging

**This configuration is WORKING and TESTED ✅**
