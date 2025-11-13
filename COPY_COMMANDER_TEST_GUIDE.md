# Copy-Commander End-to-End Test Guide

**Status:** Ready to test ✅  
**Server:** http://localhost:3001  
**Date:** 2025-11-13

---

## ✅ What's Been Fixed

1. **Debug file issue FIXED:** Changed `/tmp/` to `os.tmpdir()` for Windows compatibility
2. **Server restarted:** Clean startup with no errors
3. **Copy-commander integrated:** Available in Agent Girl's agent registry

---

## 🧪 TEST PLAN: Copy-Commander

### Test 1: Basic Orchestration (5 min)
**Objective:** Verify copy-commander can receive requests and route appropriately

**Steps:**
1. Open http://localhost:3001 (already opened in browser)
2. Start a new chat
3. Type the following EXACT message:

```
Use the copy-commander agent to help me write 3 LinkedIn posts about AI automation for small businesses. 

Target audience: Small business owners, 25-50 employees
Goal: Build awareness about AI efficiency tools
Tone: Professional but approachable
```

**Expected Behavior:**
- Copy-commander activates
- Analyzes the request (should recognize it as social media content)
- Routes to appropriate sub-commander (will mention needing social-media-sub-commander)
- Provides analysis of persona, framework, and quality requirements

**Success Criteria:**
- ✅ No errors in response
- ✅ Copy-commander identifies this as social media work
- ✅ Mentions quality standards (80+ score requirement)
- ✅ Provides strategic analysis

---

### Test 2: Quality Framework (3 min)
**Objective:** Verify copy-commander applies quality scoring

**Steps:**
1. Ask: "What quality standards will you apply to the LinkedIn posts?"

**Expected Behavior:**
- Explains 5-layer quality framework
- Mentions 100-point scoring system
- States 80+ acceptance threshold
- Details: Tone (25), Conversion (25), Audience (20), Technical (15), Framework (15)

**Success Criteria:**
- ✅ All 5 quality layers mentioned
- ✅ Point breakdown provided
- ✅ Threshold clearly stated

---

### Test 3: Routing Logic (3 min)
**Objective:** Test different content type routing

**Try these requests one by one:**

**Request A (Landing Page):**
```
Help me write a landing page for our new SaaS product - project management tool for remote teams
```

**Expected:** Should route to LANDING COMMANDER (mentions conversion focus, hero sections, CTAs)

**Request B (Video Script):**
```
I need a 60-second video script for a TikTok ad about our time-tracking app
```

**Expected:** Should route to VIDEO COMMANDER (mentions video storytelling, hooks, B-roll)

**Success Criteria:**
- ✅ Correctly identifies platform for each request
- ✅ Routes to appropriate sub-commander
- ✅ Explains routing decision

---

### Test 4: Persona Identification (3 min)
**Objective:** Verify persona analysis capability

**Steps:**
1. Ask: "What persona would you identify for this project?"

**Expected Behavior:**
- Analyzes demographics (age, income, education, occupation)
- Analyzes psychographics (values, pain points, aspirations, fears)
- Suggests communication preferences
- Recommends effective frameworks (PAS, AIDA, FAB, etc.)

**Success Criteria:**
- ✅ Comprehensive persona breakdown
- ✅ Actionable copywriting implications
- ✅ Framework recommendations

---

### Test 5: Error Handling (2 min)
**Objective:** Test escalation protocols

**Steps:**
1. Ask: "What if the client brief is unclear or contradictory?"

**Expected Behavior:**
- Explains 5-level escalation system
- Describes clarification request process
- Mentions not proceeding with assumptions
- Provides structured communication template

**Success Criteria:**
- ✅ Escalation levels explained
- ✅ Professional approach to unclear briefs
- ✅ Quality over deadline mentioned

---

## 📊 OVERALL TEST RESULTS

| Test | Status | Notes |
|------|--------|-------|
| 1. Basic Orchestration | ⬜ | |
| 2. Quality Framework | ⬜ | |
| 3. Routing Logic | ⬜ | |
| 4. Persona Identification | ⬜ | |
| 5. Error Handling | ⬜ | |

**PASS CRITERIA:** All 5 tests must show ✅

---

## 🔧 IF ERRORS OCCUR

### Error: "Cannot find agent copy-commander"
**Fix:** Server needs restart. Run:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
cd E:\AI\0_SYNTHIQ\agent-girl
bun server/server.ts
```

### Error: "Task tool not available"
**Fix:** Check server/agents.ts - copy-commander should have `tools: ['Task', 'Read', 'Write']`

### Error: Response seems generic (not using copy-commander)
**Fix:** Need to explicitly spawn agent. Try:
```
I want you to use the Task tool to spawn the copy-commander agent and ask it to [your request]
```

---

## ✅ NEXT STEPS AFTER TESTING

**If all tests pass:**
1. Commit the copy-commander integration
2. Add remaining 14 agents using same pattern
3. Test each agent incrementally

**If tests fail:**
1. Note which test failed
2. Check server logs for errors
3. Fix issue
4. Re-run failed test

---

## 🎯 CRITICAL SUCCESS INDICATORS

1. **Copy-commander activates** when explicitly called
2. **Routing logic works** - identifies content types correctly
3. **Quality framework mentioned** - 80+ threshold, 5 layers
4. **Professional orchestrator behavior** - doesn't write copy itself, routes to sub-commanders
5. **No server errors** - clean responses

**Test this NOW and report results! 🔥**