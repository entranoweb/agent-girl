# Custom Modifications - Deep Research V2

**Fork:** entranoweb/agent-girl  
**Upstream:** KenKaiii/agent-girl  
**Base Version:** v7.2.0  

## Critical Custom Features (DO NOT LOSE WHEN SYNCING)

### 1. Deep Research V2 with File-Based Architecture
**Files Modified:**
- `server/modes/intense-research.txt` - Full workflow with 5-agent parallel research
- `server/agents.ts` - `research-agent-stateful` agent with diverse source requirements
- `server/websocket/messageHandlers.ts` - 25-minute timeout for intense-research mode

**Key Features:**
- 5 parallel research agents (Technical, Market, Practical, Critical, Future)
- File-based output (findings_*.md) to prevent context overflow
- Diverse source requirements: Reddit, HN, GitHub, dev blogs, official docs
- 25-minute timeout (vs 10 minutes default)
- Full synthesis report creation (FINAL_*_RESEARCH.md)

### 2. Source Diversity Requirements
**Location:** `server/agents.ts` lines 990-1018

**What it does:**
- Explicitly requires researchers to search Reddit, HackerNews, GitHub issues
- Adds community discussions alongside official docs
- Provides site-specific search strategies
- 8-minute efficiency guideline per agent

### 3. Timeout Modifications
**Location:** `server/websocket/messageHandlers.ts` lines 619-651

**Changes:**
- intense-research mode: 25 minutes (1500000ms)
- Other modes: 10 minutes (600000ms)
- Warning at 12.5 minutes for intense-research

## Merge Conflict Resolution Guide

### If Upstream Changes These Files:

#### `server/agents.ts`
**Keep:** 
- Source Diversity Requirements section
- research-agent-stateful agent definition
- Research Efficiency section

#### `server/modes/intense-research.txt`
**Keep:** ENTIRE file - this is your custom mode

#### `server/websocket/messageHandlers.ts`
**Keep:**
- Custom timeout values for intense-research
- All mode-specific timeout logic

## Testing After Upstream Sync

```bash
# 1. Test Deep Research still works
npm run dev
# Navigate to http://localhost:3001
# Select "Intense Research" mode
# Test query: "Latest AI developments 2025"
# Verify: 5 findings_*.md files + FINAL_*.md created

# 2. Check timeout
# Should NOT timeout before 25 minutes

# 3. Check source diversity
# Open findings files
# Verify sources include: official docs, Reddit, HN, GitHub
```

## Backup Strategy

Before any upstream sync:
```bash
# Create backup branch
git branch backup-before-sync-$(date +%Y%m%d)
git push origin backup-before-sync-$(date +%Y%m%d)
```

## Quick Recovery (If Sync Goes Wrong)

```bash
# Reset to last known good state
git reset --hard backup-before-sync-YYYYMMDD
git push -f origin master
```

## Commit Message Prefix

All custom commits use prefixes:
- `feat:` - New features (Deep Research V2)
- `fix:` - Bug fixes (timeout, synthesis)
- `refactor:` - Code improvements
- Commits related to Deep Research mention "research" or "synthesis"

## Contact

If upstream sync breaks Deep Research, revert to commit: `65add37`
This commit has the complete working implementation.
