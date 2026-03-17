# EverBrief

> **Your memory-native project copilot**

EverBrief is a persistent memory system designed to help you manage multi-day projects like competitions, hackathons, research initiatives, and applications. Unlike traditional note-taking apps or chatbots, EverBrief uses **long-term memory** as its core value proposition—remembering your goals, decisions, feedback, and project evolution across every session.

Built for the **EverMind Memory Genesis Competition 2026** using **EverMemOS Cloud API**.

---

## 🎯 The Problem

When working on multi-day projects, you:
- Take notes, get feedback, make decisions
- Come back the next day and forget half the context
- Waste time searching through scattered notes
- Lose alignment with your original vision
- Repeat decisions or miss critical feedback

**Traditional solutions** (Notion, Google Docs, generic chatbots) treat memory as an afterthought. They store data, but don't actively use it to help you stay on track.

---

## 💡 The Solution

**EverBrief remembers everything that matters.**

It's not just storage—it's a **memory-aware copilot** that:
- Captures project updates, decisions, feedback, and ideas
- Uses EverMemOS to retrieve relevant context when you need it
- Answers questions like "What did the mentor criticize?" based on actual history
- Generates next steps grounded in your timeline and goals
- Shows you the evolution of your project from day one

**Memory is the feature, not a nice-to-have.**

---

## 🚀 Features

### 1. Memory-Aware Chat
Ask questions and get answers grounded in your project's history:
- "What did we decide last time?"
- "What feedback did the mentor give?"
- "What are my most urgent tasks?"
- "Summarize the evolution of this project"

Each response shows **which memories were retrieved**, making the memory system transparent and trustworthy.

### 2. Timeline View
See your project journey in chronological order:
- Visual labels for different memory types
- Track how ideas evolved
- Understand decision progression

### 3. Action Planner
Generate next steps based on:
- Project deadline and time remaining
- Past decisions and feedback
- Current project state

Save generated actions back into memory to maintain continuity.

### 4. Structured Memory Input
Easily log different types of memories:
- Competition brief
- Mentor feedback
- Project decisions
- Brainstorm ideas
- Meeting notes
- Task updates

Each memory is timestamped and categorized for intelligent retrieval.

---

## 🏗️ Architecture

### Tech Stack
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for clean UI
- **EverMemOS Cloud API** for memory storage and retrieval

### Folder Structure
```
everbrief/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── app/page.tsx            # Dashboard
│   └── api/
│       ├── memory/route.ts     # Memory CRUD operations
│       ├── chat/route.ts       # Memory-aware chat
│       └── demo-data/route.ts  # Demo data seeder
├── components/
│   ├── ui/                     # Reusable UI components
│   └── dashboard/              # Dashboard-specific components
├── lib/
│   ├── types.ts               # TypeScript definitions
│   ├── demo-data.ts           # Sample project data
│   └── memory/                # Memory adapter layer
│       ├── adapter.ts         # Interface definition
│       ├── evermemos-adapter.ts  # EverMemOS implementation
│       ├── mock-adapter.ts    # Local fallback
│       └── index.ts           # Adapter factory
```

### Memory Adapter Pattern

EverBrief uses an **adapter pattern** to support both EverMemOS Cloud and a local mock implementation:

```typescript
interface MemoryAdapter {
  addMemory(params: AddMemoryParams): Promise<MemoryItem>;
  searchMemories(params: SearchMemoriesParams): Promise<MemoryItem[]>;
  listMemories(params: ListMemoriesParams): Promise<MemoryItem[]>;
}
```

**Automatic fallback:** If `EVERMEM_API_KEY` is not set, the app uses the mock adapter so judges can still demo the app.

### EverMemOS Integration

Memories are stored with appropriate metadata and categories:
- **profile**: User/project preferences and criteria
- **episodic_memory**: Notes, feedback, decisions, meetings
- **foresight**: Tasks, deadlines, action plans
- **event_log**: System actions (if needed)

Memory search uses semantic retrieval to find relevant context for chat queries.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### 1. Clone the repository
```bash
git clone <repository-url>
cd everbrief
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
# EverMemOS Cloud API (optional - app works without it)
EVERMEM_API_KEY=your_api_key_here
EVERMEM_BASE_URL=https://api.evermemos.com/v1

# LLM API (optional - rule-based fallback available)
OPENAI_API_KEY=your_openai_key_here

# Optional: lock the app when deployed so only people with the password can use it
EVERBRIEF_ACCESS_PASSWORD=your_shared_app_password
```

**Note:** If these variables are not set, EverBrief will:
- Use a **mock memory adapter** for storage (perfect for demos!)
- Use **rule-based responses** for chat (still works, but less flexible)

`.env.local` is ignored by Git. Commit only placeholder values in `.env.example`, never your real keys.

**For full LLM-powered chat,** add your `OPENAI_API_KEY`. See [LLM_SETUP.md](LLM_SETUP.md) for details.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the app.

**Note:** EverBrief runs on port 3001 by default to avoid conflicts with other projects.

## 🔐 Safe GitHub Sharing

- Keep your real `OPENAI_API_KEY`, `EVERMEM_API_KEY`, and `EVERBRIEF_ACCESS_PASSWORD` only in `.env.local` on your machine or in your hosting provider's secret settings.
- Commit [`.env.example`](.env.example) with placeholder values like `your_openai_key_here`.
- Do not create any `NEXT_PUBLIC_*` variable for private keys. Anything with `NEXT_PUBLIC_` is visible in the browser.
- Before pushing, run `git status --short --ignored` and confirm `.env.local` appears as ignored.
- If you deploy the app with a real OpenAI key, set `EVERBRIEF_ACCESS_PASSWORD` too so the UI is locked before anyone can use your quota.

---

## 📖 Usage Guide

### Quick Start with Demo Data

1. Launch the app and navigate to the Dashboard
2. Click **"Load Demo Data"** in the top right
3. This loads a 3-day project simulation showing:
   - Day 1: Initial project idea and competition brief
   - Day 2: Mentor feedback leading to a pivot
   - Day 3: Refined plan and implementation strategy

### Try These Queries

In the **Chat** tab, ask:
- "What did the mentor criticize?"
- "What did we decide after the feedback?"
- "Summarize the evolution of this project"
- "What are my next steps?"

Notice how each response shows the **memories used** to generate the answer.

### Add Your Own Memories

1. Use the **"Add Memory"** form in the sidebar
2. Select a memory type (feedback, decision, idea, etc.)
3. Enter a title and content
4. Memories appear in the timeline and become searchable

### Generate Action Items

1. Go to the **Action Plan** tab
2. Click **"Generate Action Plan"**
3. Get AI-powered next steps based on your project context
4. Mark items complete as you work
5. Save actions to memory for future reference

---

## 🎬 Demo Script (3 minutes)


## Why This Project Demonstrates Memory

### Memory is Essential, Not Optional

- **Traditional approach:** You could build a notes app with a database. Memory is just storage.
- **EverBrief approach:** Memory is queried intelligently to provide context-aware answers. You can't replicate this with a static database.

### Memory Continuity Across Sessions

- Demonstrates **multi-day workflows** where context matters
- Shows how memory evolves: initial idea → feedback → pivot → execution
- Proves that long-term memory provides value beyond a single session

### Transparent Memory Usage

- Every chat response shows **which memories were retrieved**
- Users can see exactly how the system uses memory
- Builds trust in the memory system

### Practical Utility

- Solves a real problem: context loss in multi-day projects
- Target users: competition participants, hackathon teams, researchers
- Memory provides clear, demonstrable value

---


**EverBrief** - Because your project deserves to be remembered.
