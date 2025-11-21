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

### 2. Per-Agent Timeout Handling (10 Minutes Per Agent)
**Location:** 
- `server/agents.ts` lines 1015-1025 (Research Efficiency section)
- `server/agents.ts` lines 1027-1065 (File-based output with timeout responses)
- `server/modes/intense-research.txt` line 36, lines 62-69

**What it does:**
- Each research agent has a HARD 10-minute timeout
- Agent Girl waits max 12 minutes for all agents, then proceeds with available findings
- Agents return partial/timeout status in JSON if they don't complete
- Synthesis proceeds even if some agents fail/timeout
- Prevents indefinite hangs when one agent gets stuck

### 3. Source Diversity Requirements
**Location:** `server/agents.ts` lines 990-1018

**What it does:**
- Explicitly requires researchers to search Reddit, HackerNews, GitHub issues
- Adds community discussions alongside official docs
- Provides site-specific search strategies
- Structured time management: 0-6min research, 6-9min write, 9-10min save+JSON

### 4. Global Session Timeout (25 Minutes)
**Location:** `server/websocket/messageHandlers.ts` lines 619-651

**Changes:**
- intense-research mode: 25 minutes global timeout (1500000ms)
- Other modes: 10 minutes (600000ms)
- Warning at 12.5 minutes for intense-research
- Works with per-agent timeout: agents have 10min each, overall session has 25min max

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

# 2. Check per-agent timeout
# Each agent should complete within 10 minutes
# Agent Girl should proceed with synthesis after 12 minutes even if 1 agent times out
# FINAL report should note any missing angles

# 3. Check global timeout
# Overall session should NOT timeout before 25 minutes

# 4. Check source diversity
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
