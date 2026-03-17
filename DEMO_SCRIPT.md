# EverBrief - Demo Script

## One-Sentence Pitch
**"EverBrief is a memory-native project copilot that remembers your goals, decisions, and feedback across days—so you never lose context on multi-day projects."**

---

## Devpost Description

### Tagline
Stop losing context. Start building better.

### What it does
EverBrief is a persistent memory system for managing multi-day projects like competitions, hackathons, and research initiatives. It captures your project journey—goals, feedback, decisions, ideas—and uses long-term memory to help you stay aligned across every session.

Unlike traditional note-taking apps or chatbots, EverBrief makes memory the core feature. Ask it "What did the mentor criticize?" or "What did we decide yesterday?" and get accurate answers based on your actual project history.

### How we built it
- **Next.js 14** with TypeScript for clean, type-safe architecture
- **EverMemOS Cloud API** for intelligent memory storage and retrieval
- **Tailwind CSS** for a polished, minimal UI
- **Memory adapter pattern** supporting both EverMemOS and local fallback

The architecture separates memory logic from UI, making it easy to swap between EverMemOS Cloud and a mock adapter for demos.

### Challenges we ran into
The biggest challenge was making memory feel **essential** rather than optional. Early designs felt like a generic productivity app with memory bolted on. We pivoted to focus on a use case where memory continuity is the core value: multi-day project management.

Another challenge: making memory usage transparent. We solved this by showing retrieved memories in the UI, so users can see exactly how the system uses their history.

### Accomplishments that we're proud of
- **Memory-first design:** The entire app is built around memory as the core feature
- **Transparent retrieval:** Users can see which memories inform each answer
- **Meta-narrative:** Using EverBrief to build EverBrief demonstrates the value proposition
- **Clean architecture:** Adapter pattern makes it easy to swap memory providers
- **Demo-ready:** Works perfectly without API keys for judges and demos

### What we learned
Long-term memory is most valuable when:
1. Workflows span multiple days
2. Context evolves over time (feedback → decisions → execution)
3. Users need to recall specific past interactions
4. Memory prevents repeating decisions or forgetting critical input

We also learned the importance of making AI/memory systems transparent—showing "which memories were used" builds trust.

### What's next for EverBrief
- **Team collaboration:** Multi-user projects with shared memory
- **Smart notifications:** "You haven't addressed the mentor feedback from Tuesday"
- **Integration with tools:** GitHub, Linear, Notion for automatic memory capture
- **Advanced planning:** Milestone tracking and deadline-aware suggestions
- **Memory analytics:** Visualize how your project evolved over time

---

## GitHub Description

**EverBrief** - A memory-native project copilot for multi-day projects.

Built for the EverMind Memory Genesis Competition 2026. Uses EverMemOS to remember your goals, decisions, feedback, and project evolution across sessions.

**Key Features:**
- Memory-aware chat with transparent retrieval
- Timeline view of project evolution
- Smart action planner based on context
- Works with EverMemOS or local mock for demos

**Tech:** Next.js 14, TypeScript, Tailwind CSS, EverMemOS Cloud API

---

## 3-Minute Demo Script

### Setup
- Have the app open at the landing page
- Screen recording software ready
- Demo data NOT loaded yet (we'll load it live)

---

### [0:00-0:30] Hook & Problem

**[Screen: Landing page]**

> "Picture this: You're working on a competition. Day 1, you brainstorm a great idea. Day 2, your mentor reviews it and says it's too broad—you need to pivot. Day 3, you're back at your computer, ready to code... but wait."

**[Pause for effect]**

> "What exactly did the mentor say? What did I decide to change? Where are my notes from yesterday?"

**[Frustrated gesture]**

> "Sound familiar? We lose context every single time we switch tasks. Traditional note-taking apps don't help—they're passive. They store your notes, but they don't actively help you remember what matters."

---

### [0:30-1:00] Solution Introduction

**[Still on landing page, scroll to features]**

> "That's why I built EverBrief. It's not a note-taking app. It's not a generic chatbot. It's a **memory-native project copilot** designed specifically for multi-day projects."

> "EverBrief remembers your project journey—your goals, your feedback, your decisions—and uses long-term memory to keep you aligned across every session."

**[Click "Launch Dashboard"]**

> "Let me show you how it works. And here's the cool part: I'm going to demo the actual project journey of building EverBrief itself. Meta, right?"

---

### [1:00-1:45] The Demo - Chat & Memory Retrieval

**[Screen: Dashboard with empty state]**

> "First, let me load the demo data. This simulates 3 days of real work."

**[Click "Load Demo Data" button]**

**[Screen: Timeline view loads with 10 memories]**

> "Look at this. Day 1: competition brief and initial idea. Day 2: mentor feedback that the idea was too generic. Day 3: pivoted to a project copilot concept."

**[Switch to Chat tab]**

> "Now here's where memory becomes powerful. I can ask:"

**[Type: "What did the mentor criticize?"]**

**[Response appears with retrieved memories panel]**

> "Look at this response. It tells me the mentor said the idea was 'too generic' and that 'memory felt like an add-on.' But check this out—"

**[Expand "Memories used" section]**

> "—it shows me exactly which memory it retrieved to answer that question. This is transparent, trustworthy memory. I can verify it's giving me real information from my project history."

**[Type: "What did we decide after that feedback?"]**

**[Response appears]**

> "It knows we pivoted to a project copilot. It understands the progression: feedback → decision → new direction."

**[Type: "Summarize the evolution of this project"]**

**[Response shows chronological summary]**

> "And it can synthesize the entire journey. This is memory continuity in action."

---

### [1:45-2:15] Why Memory is Essential

**[Screen: Switch to Timeline tab]**

> "Here's the timeline view. Every decision, every piece of feedback, chronologically organized. You can see how the project evolved from a vague productivity suite to a focused memory copilot."

**[Scroll through timeline]**

> "This ONLY works with long-term memory. A regular chatbot would forget everything after each conversation. A notes app would just store text—it wouldn't connect the dots like this."

**[Switch to Action Plan tab]**

> "And check this out—"

**[Click "Generate Action Plan"]**

**[Action items appear based on context]**

> "—it generates next steps based on my deadline, my past decisions, and my project state. Everything is grounded in memory. It knows where I've been, so it can suggest where to go next."

---

### [2:15-2:45] Technical Implementation

**[Screen: Can show code or architecture diagram if available, or just stay on app]**

> "Under the hood, this is powered by EverMemOS Cloud API. I'm using different memory categories:"
> - Episodic memory for notes and decisions
> - Foresight for tasks and deadlines
> - Profile for project criteria

> "The architecture uses a clean adapter pattern. It works seamlessly with EverMemOS, but also has a local fallback for demos—which is what you're seeing right now."

**[Briefly show the Add Memory form]**

> "Adding memories is simple. Just select a type—feedback, decision, idea—write a title and content, and it's stored with timestamps and metadata for intelligent retrieval."

---

### [2:45-3:00] Closing & Call to Action

**[Screen: Return to landing page or show logo]**

> "EverBrief: Stop losing context. Start building better."

> "This is a memory-native project copilot. It solves a real problem for anyone working on competitions, hackathons, or research projects that span multiple days."

> "Memory isn't an add-on here—it's the entire point. And I think that's exactly what makes it powerful."

**[Smile]**

> "Thanks for watching. Built for the EverMind Memory Genesis Competition 2026."

**[Fade out or end]**

---

## Key Talking Points

✅ **Problem**: Context loss on multi-day projects
✅ **Solution**: Memory-native copilot, not just storage
✅ **Demo**: Real 3-day project journey (meta-narrative)
✅ **Transparency**: Show retrieved memories in UI
✅ **Value**: Memory is essential, not optional
✅ **Tech**: EverMemOS + clean architecture

---

## Tips for Recording

1. **Practice the flow** 2-3 times before recording
2. **Speak clearly** and at a moderate pace
3. **Show enthusiasm** but stay professional
4. **Emphasize memory retrieval** when expanding the "memories used" panel
5. **Keep cursor movements smooth**—avoid jerky scrolling
6. **If you mess up a section**, just re-record that part and edit

---

## Backup Questions (if extending demo)

If you have more time or doing a live demo with Q&A:

**Q: How is this different from a notes app?**
A: Notes apps are passive storage. EverBrief actively retrieves relevant memories to answer questions and generate insights.

**Q: Does it work without EverMemOS?**
A: Yes! It has a local mock adapter for demos, but the real power comes with EverMemOS for semantic search and long-term persistence.

**Q: Who would use this?**
A: Anyone on a multi-day project: hackathon teams, competition participants, researchers, grad students, product managers tracking feature decisions.

**Q: Can it handle team collaboration?**
A: Not yet, but that's the next feature—shared project memory for teams.

---

**Good luck with your demo! 🚀**
