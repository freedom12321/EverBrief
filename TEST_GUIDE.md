# Testing Guide for EverBrief

## ✅ Quick Test Checklist

Use this guide to verify everything is working correctly.

---

## Test 1: Check Server is Running

**Expected:** Server running on port 3001

**How to test:**
```bash
# Check server logs - should see:
✓ Ready in XXXms
- Environments: .env.local  # This means your .env.local is loaded!
```

**Status:** ✅ PASSED - Server is running!

---

## Test 2: Check Demo Data Import

### Step 1: Open the App
Navigate to: **http://localhost:3001**

### Step 2: Go to Dashboard
Click **"Launch Dashboard →"**

### Step 3: Load Demo Data
Click **"Load Demo Data"** button (top right)

### Expected Results:
- ✅ Button shows "Loading..." briefly
- ✅ Recent Memories sidebar shows 5 memories
- ✅ No error messages

### Step 4: Verify Demo Data Loaded
Click the **"Timeline"** tab

**Expected to see:**
- ✅ 10 memory entries
- ✅ Dated over 3 days
- ✅ Different colored badges (purple, orange, blue, green, yellow)
- ✅ Titles like:
  - "Competition Requirements"
  - "Mentor review with Dr. Sarah Chen"
  - "Pivot decision: Project Memory Copilot"

**If you see all 10 entries:** ✅ **DEMO DATA WORKS!**

**If you see "No memories yet":** ❌ **DEMO DATA FAILED**

---

## Test 3: Check OpenAI API Key

### Step 1: Go to Chat Tab
Click the **"Chat"** tab

### Step 2: Test with Rule-Based Question
Type: **"What did the mentor criticize?"**

**Expected Response:**
```
Here's the mentor feedback I found:

• Mentor review with Dr. Sarah Chen: [feedback content]
```

**Result:** ✅ This proves **memory retrieval works**

### Step 3: Test with LLM-Only Question
Type: **"How can I improve my project based on everything we discussed?"**

#### If OpenAI Key Works:
**Expected Response (Natural, conversational):**
```
Based on your project journey, I have a few recommendations:

1. Focus on making memory essential - Your mentor Dr. Chen's feedback was crucial here...
2. Complete the demo video showing the 3-day evolution...
3. Polish the UI to make memory retrieval visible...

[Detailed, contextual answer referencing specific memories]
```

**Result:** ✅ **OPENAI API KEY WORKS!**

#### If OpenAI Key Doesn't Work:
**Expected Response (Generic fallback):**
```
I found X relevant memories:

• Competition Requirements (competition brief)
  EverMind Memory Genesis Competition 2026...

• Mentor review with Dr. Sarah Chen (mentor feedback)
  Met with Dr. Chen (advisor, former competition...
```

**Result:** ⚠️ **Using Rule-Based Mode** (API key not working or not set)

---

## Test 4: Verify API Key is Loaded

### Method 1: Check Server Logs
Look for the line when you asked the LLM question:
```bash
# If LLM working:
# No errors in logs

# If API key invalid:
OpenAI API error: [some error message]
```

### Method 2: Test Multiple Questions

Ask these questions in order:

| Question | Rule-Based Response | LLM Response |
|----------|-------------------|--------------|
| "What did we decide yesterday?" | Structured list | Natural conversation |
| "Why did we make that choice?" | "I don't have enough context" | Explains reasoning |
| "What should I focus on?" | Generic template | Specific to your project |

**If all get natural responses:** ✅ **LLM MODE ACTIVE**

**If some fail with "no context":** ⚠️ **Rule-based mode**

---

## Test 5: Check Memory Storage

### Step 1: Add a New Memory
1. In the **"Add Memory"** sidebar
2. Select type: **"Meeting Note"**
3. Title: **"Test Memory"**
4. Content: **"This is a test to verify memory storage works."**
5. Click **"Add Memory"**

### Expected:
- ✅ Form clears
- ✅ New memory appears in "Recent Memories" sidebar
- ✅ New memory appears at top of Timeline

### Step 2: Query the New Memory
In Chat, ask: **"What was my test memory about?"**

**Expected:**
- LLM mode: "Your test memory noted that this is a test to verify memory storage works."
- Rule-based: Shows the memory in the list

**Result:** ✅ **MEMORY STORAGE WORKS!**

---

## Test 6: Action Plan Generator

### Step 1: Go to Actions Tab
Click **"Action Plan"** tab

### Step 2: Generate Actions
Click **"🚀 Generate Action Plan"**

### Expected:
- ✅ Shows "✨ Generating..." briefly
- ✅ Displays 3-5 action items
- ✅ Each has priority badge (high/medium/low)
- ✅ Checkboxes are interactive

### Step 3: Test Interactivity
- Click a checkbox → Item gets strikethrough ✅
- Click "Save to Memory" → Should save ✅

**Result:** ✅ **ACTION PLANNER WORKS!**

---

## 🐛 Troubleshooting

### Issue: "OpenAI API error" in logs

**Possible causes:**
1. API key is invalid
2. No credits in OpenAI account
3. Network/firewall blocking OpenAI

**Fix:**
1. Verify key at: https://platform.openai.com/api-keys
2. Check billing at: https://platform.openai.com/usage
3. Try a different network

### Issue: Demo data doesn't load

**Possible causes:**
1. Button was clicked too fast
2. Browser cached old state

**Fix:**
1. Refresh the page (Cmd/Ctrl + R)
2. Click "Load Demo Data" again
3. Check browser console for errors (F12)

### Issue: Chat says "no context" for everything

**This means:** Rule-based mode (no OpenAI key or key not working)

**Fix:**
1. Check `.env.local` has: `OPENAI_API_KEY=sk-...`
2. Restart the server completely
3. Verify key is valid on OpenAI dashboard

---

## ✅ Final Checklist

| Test | Status | Notes |
|------|--------|-------|
| Server running on 3001 | ✅ | Check logs |
| Demo data loads | ✅ | Should see 10 memories |
| Timeline shows memories | ✅ | Color-coded badges |
| Chat retrieves memories | ✅ | Rule-based works |
| LLM responses work | ⚠️ | Only if API key valid |
| Add new memory works | ✅ | Shows in sidebar |
| Action plan generates | ✅ | 3-5 items appear |

---

## 🎯 Expected Test Results

### WITHOUT OpenAI Key:
- ✅ Demo data works
- ✅ Timeline works
- ✅ Memory storage works
- ✅ Action plan works
- ✅ Chat works for matching patterns
- ❌ Chat says "no context" for complex questions

### WITH OpenAI Key:
- ✅ Everything above PLUS
- ✅ Chat understands ANY question
- ✅ Natural conversational responses
- ✅ References memories contextually

---

## 📊 Current Status

Based on server logs:
- ✅ Server: Running on port 3001
- ✅ Environment: `.env.local` loaded
- ✅ Memory: Using Mock adapter (demo mode)
- ⚠️ LLM: **Test needed** - Ask a complex question to verify

**Next step:** Test the chat with a complex question to confirm LLM is working!
