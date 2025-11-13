# Fork Sync Documentation

**Upstream:** https://github.com/KenKaiii/agent-girl  
**Fork:** https://github.com/entranoweb/agent-girl

---

## 🔄 Automated Daily Sync

This fork automatically syncs with the upstream repository **every day at 2 AM UTC**.

**Workflow:** `.github/workflows/sync-upstream.yml`

### What It Does:

1. ✅ **Checks for new commits** in upstream (KenKaiii/agent-girl)
2. ✅ **Attempts automatic merge** if changes detected
3. ✅ **Runs build tests** to verify no breaking changes
4. ✅ **Pushes to master** if merge successful
5. ❌ **Creates GitHub Issue** if conflicts or build failures occur

---

## 🎯 When Sync Succeeds

**You don't need to do anything!** The workflow will:
- Merge upstream changes automatically
- Run `bun run build` to verify
- Push to your fork's master branch
- Log success in GitHub Actions

---

## ⚠️ When Sync Fails

### Failure Scenarios:

1. **Merge Conflicts**
   - Upstream changes conflict with your custom changes
   - Common files: `server/agents.ts`, `server/server.ts`

2. **Build Failures**
   - Upstream changes break the build
   - Dependencies incompatible

3. **Test Failures**
   - New code doesn't pass existing tests

### What Happens:

1. **GitHub Issue Created** automatically with label `upstream-sync` + `urgent`
2. **Workflow fails** and stops (doesn't push broken code)
3. **You get notified** via GitHub notifications

---

## 🔧 Manual Sync (When Automation Fails)

If you see an issue titled **"🔴 Upstream Sync Failed"**, follow these steps:

### Step 1: Setup Upstream Remote

```bash
cd E:\AI\0_SYNTHIQ\agent-girl

# Add upstream (one-time setup)
git remote add upstream https://github.com/KenKaiii/agent-girl.git

# Verify remotes
git remote -v
```

### Step 2: Fetch Upstream Changes

```bash
git fetch upstream
git fetch origin
```

### Step 3: Attempt Merge

```bash
git checkout master
git merge upstream/master
```

**If no conflicts:**
```bash
git push origin master
```

**If conflicts detected:**
```bash
# Git will show conflicted files
git status

# Resolve conflicts in each file manually
# Then:
git add .
git commit -m "fix: resolve upstream sync conflicts"
git push origin master
```

### Step 4: Verify Our Custom Changes

After manual merge, check these files to ensure our customizations are preserved:

```bash
# 1. Copy-commander agent (MUST BE PRESENT)
grep -A 5 "copy-commander" server/agents.ts

# 2. WSL Node.js check fix (MUST BE COMMENTED OUT)
grep -A 3 "Skipping Node.js check" server/server.ts

# 3. WSL startup scripts (MUST EXIST)
ls -la start-server.ps1 start-wsl.sh WSL_SETUP.md
```

---

## 🛡️ Protected Custom Changes

These files contain **our custom modifications** that might conflict:

| File | Our Changes | Why Important |
|------|-------------|---------------|
| `server/agents.ts` | Added copy-commander agent | Copywriting functionality |
| `server/server.ts` | Disabled Node.js check | WSL compatibility fix |
| `server/websocket/messageHandlers.ts` | Debug file path fix | Windows temp dir support |
| `start-server.ps1` | PowerShell startup script | Easy WSL startup |
| `start-wsl.sh` | Bash startup script | Background process management |
| `WSL_SETUP.md` | WSL configuration docs | Setup instructions |

**During conflicts:** Prefer **our version** for these files unless upstream has critical security fixes.

---

## 🎮 Manual Trigger

You can manually trigger the sync workflow:

1. Go to: https://github.com/entranoweb/agent-girl/actions
2. Select **"Sync Upstream Fork"** workflow
3. Click **"Run workflow"** → **"Run workflow"**

---

## 📊 Monitoring

### Check Sync Status:

**GitHub Actions:** https://github.com/entranoweb/agent-girl/actions/workflows/sync-upstream.yml

**Recent Runs:**
- ✅ Green = Successful sync
- ❌ Red = Failed (check issues)
- ⚪ Gray = No changes in upstream

### Check Open Issues:

Filter by label: [`upstream-sync`](https://github.com/entranoweb/agent-girl/issues?q=is%3Aissue+is%3Aopen+label%3Aupstream-sync)

---

## 🔄 Sync Frequency

**Current:** Daily at 2 AM UTC  
**To Change:** Edit `.github/workflows/sync-upstream.yml` line 5-6:

```yaml
schedule:
  - cron: '0 2 * * *'  # Change this cron expression
```

**Cron Examples:**
- `0 */6 * * *` = Every 6 hours
- `0 0 * * 0` = Weekly (Sunday midnight)
- `0 0 1 * *` = Monthly (1st of month)

---

## ✅ Verification Checklist

After any sync (auto or manual), verify:

- [ ] Server starts: `.\start-server.ps1`
- [ ] Build succeeds: `bun run build`
- [ ] Copy-commander exists: Check `server/agents.ts`
- [ ] WSL fixes intact: Check `server/server.ts`
- [ ] http://localhost:3001 responds

---

## 🆘 Emergency: Revert Bad Sync

If a sync breaks everything:

```bash
# See recent commits
git log --oneline -10

# Find the commit BEFORE the bad sync
# Then reset to it:
git reset --hard <commit-hash>
git push origin master --force

# Example:
git reset --hard HEAD~1  # Go back 1 commit
git push origin master --force
```

**⚠️ WARNING:** `--force` overwrites history. Only use if fork is broken!

---

## 📝 Notes

- **Automation runs in GitHub Actions** (not local)
- **Issues are auto-created** on failure
- **Manual intervention rare** (only on conflicts)
- **Upstream updates tracked** automatically

**Last Updated:** 2025-11-13  
**Sync Workflow Version:** 1.0
