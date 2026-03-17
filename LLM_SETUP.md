# LLM Setup Guide for EverBrief

## Current Status

EverBrief now supports **BOTH** modes:
- ✅ **Rule-based mode** (default - works without API keys)
- ✅ **LLM mode** (with OpenAI API key - much smarter!)

---

## How It Works

### Without OpenAI Key (Current Default)
- Uses pattern matching (keywords like "mentor", "decision", "tasks")
- Returns structured responses from retrieved memories
- Works offline, no API costs
- Limited to predefined question types

### With OpenAI Key (Recommended)
- Uses GPT-4o-mini for intelligent responses
- Understands ANY question about your project
- Provides conversational, context-aware answers
- References specific memories in natural language
- Falls back to rule-based if API fails

---

## How to Enable LLM Mode

### Step 1: Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

### Step 2: Add the Key to Your Project

Create a `.env.local` file in the `everbrief` folder:

```bash
cd everbrief
touch .env.local
```

Add this line:

```env
OPENAI_API_KEY=your_openai_key_here
```

Optional for deployed demos:

```env
EVERBRIEF_ACCESS_PASSWORD=your_shared_app_password
```

### Step 3: Restart the Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

That's it! The chat will now use GPT-4o-mini.

---

## Testing LLM vs Rule-Based

### Without OpenAI Key (Rule-Based)

**Works well:**
- "What did the mentor criticize?"
- "What did we decide after the feedback?"
- "Summarize the project evolution"
- "What are my next steps?"

**Doesn't work well:**
- "How can I improve my project?"
- "What should I focus on next week?"
- "Why did we make this decision?"

### With OpenAI Key (LLM)

**All questions work!**
- "What did the mentor criticize?" → Natural answer referencing specific feedback
- "How can I improve my project?" → Smart suggestions based on all memories
- "Why did we pivot from the original idea?" → Explains the decision timeline
- "What's the most important thing to do right now?" → Context-aware prioritization

---

## Cost Information

**GPT-4o-mini pricing:**
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens

**Typical usage:**
- Each chat query: ~500-1000 tokens total
- Cost per query: ~$0.0005 (less than a cent!)
- 100 queries: ~$0.05
- Very affordable for demo and development

---

## How to Check Which Mode You're Using

Look at the server logs when you start:

```bash
# With OpenAI key:
✓ Ready in 1.2s
# Chat will use LLM

# Without OpenAI key:
✓ Ready in 1.2s
# Chat will use rule-based fallback
```

Or ask a complex question:
- If you get a natural, conversational answer → **LLM mode** ✅
- If you get "I don't have enough context" → **Rule-based mode** ⚠️

---

## Troubleshooting

### "I added the key but it's still using rule-based"

1. Make sure `.env.local` is in the `everbrief` folder (not the parent folder)
2. Check you replaced `your_openai_key_here` with your real key locally
3. Restart the dev server completely
4. Check server logs for errors

### "OpenAI API error"

- Check your API key is valid
- Ensure you have API credits in your OpenAI account
- Check your internet connection
- The app will automatically fall back to rule-based mode

### "I want to use a different model"

Edit [app/api/chat/route.ts](app/api/chat/route.ts#L29):

```typescript
model: 'gpt-4o',  // Change from 'gpt-4o-mini'
```

Available models:
- `gpt-4o-mini` - Fast & cheap (recommended)
- `gpt-4o` - More capable, slower, more expensive
- `gpt-3.5-turbo` - Legacy, cheaper

---

## Alternative: Use Other LLM Providers

You can also use:
- **Anthropic Claude** (via Anthropic SDK)
- **Google Gemini** (via Google SDK)
- **Local LLMs** (via Ollama, LM Studio)

Just replace the OpenAI client in `app/api/chat/route.ts` with your preferred provider.

---

## Recommendation for Competition Demo

**For the demo video:**
- ✅ Use **rule-based mode** (shows memory is the core feature)
- ✅ Ask questions that match the patterns

**For development/testing:**
- ✅ Use **LLM mode** (much more flexible and powerful)
- ✅ Test any type of question

**For judges to test:**
- ✅ Provide both options in README
- ✅ Make it clear the app works without API keys
- ✅ If you deploy with a real OpenAI key, add `EVERBRIEF_ACCESS_PASSWORD` so only approved testers can use the live app

---

## Example Comparison

### Rule-Based Mode
**Q:** "What did the mentor say?"
**A:** "Here's the mentor feedback I found: Dr. Chen said..."

### LLM Mode
**Q:** "What did the mentor say?"
**A:** "Your mentor Dr. Sarah Chen reviewed your project on [date] and had some important feedback. She felt that your productivity suite idea was too generic and that the memory feature felt like an add-on rather than a core value proposition. She specifically recommended focusing on use cases where memory continuity is essential, not just nice to have. This feedback led you to pivot to the project copilot concept you're working on now."

Much more natural and context-aware! 🎯
