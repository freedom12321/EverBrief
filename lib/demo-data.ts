import { MemoryItem, Project } from './types';

export const DEMO_PROJECT: Project = {
  id: 'demo-project',
  title: 'Memory Genesis Demo Submission',
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  projectType: 'competition',
  goal: 'Build a memory-native application that showcases long-term memory capabilities for the EverMind Memory Genesis Competition',
  judgingCriteria:
    'Innovation in memory usage, practical utility, technical implementation, user experience, and demonstration of memory continuity across sessions',
  notes: 'Focus on making memory integration obvious and valuable',
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export function generateDemoMemories(): MemoryItem[] {
  const now = Date.now();
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
  const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;
  const oneDayAgo = now - 1 * 24 * 60 * 60 * 1000;

  return [
    // Day 1: Initial idea and competition brief
    {
      id: 'mem_demo_1',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'competition_brief',
      category: 'profile',
      title: 'Competition Requirements',
      content: `EverMind Memory Genesis Competition 2026

Deadline: March 23, 2026
Prize: $50,000 total

Key requirements:
- Must use EverMemOS Cloud API
- Demonstrate long-term memory across multiple sessions
- Show practical utility of memory
- Memory should provide clear value over stateless alternatives

Judging will focus on innovation and practical demonstration of memory continuity.`,
      timestamp: new Date(threeDaysAgo).toISOString(),
    },
    {
      id: 'mem_demo_2',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'brainstorm_idea',
      category: 'episodic_memory',
      title: 'Initial Concept: Multi-tool productivity suite',
      content: `Original idea: Build a comprehensive productivity suite with calendar, tasks, notes, email, and chat.

Memory features:
- Remember user preferences
- Recall past conversations
- Track habits over time
- Personalized recommendations

Integration plan: Use EverMemOS for all data persistence and cross-feature context.`,
      timestamp: new Date(threeDaysAgo + 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_3',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'meeting_note',
      category: 'episodic_memory',
      title: 'Team brainstorm session',
      content: `Discussed project scope and features. Team is excited about the productivity suite idea.

Concerns raised:
- Might be too broad for a competition submission
- Hard to demo memory value in a short video
- Lots of existing competition in productivity space

Action items:
- Research existing solutions
- Validate that memory adds unique value
- Prepare architecture diagram`,
      timestamp: new Date(threeDaysAgo + 5 * 60 * 60 * 1000).toISOString(),
    },

    // Day 2: Mentor feedback and pivot
    {
      id: 'mem_demo_4',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'mentor_feedback',
      category: 'episodic_memory',
      title: 'Mentor review with Dr. Sarah Chen',
      content: `Met with Dr. Chen (advisor, former competition judge).

Her feedback:
"Your productivity suite idea is too generic. Why does it NEED long-term memory? You could build the same thing with a regular database. The judges want to see applications where memory is essential, not optional."

Key critique: Memory feels like an add-on rather than the core value proposition.

Suggestion: Focus on a use case where memory continuity over days/weeks is the primary benefit. Think about workflows that span multiple sessions and benefit from context that grows over time.

This was a wake-up call. Need to rethink the approach.`,
      timestamp: new Date(twoDaysAgo + 10 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_5',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'project_decision',
      category: 'episodic_memory',
      title: 'Pivot decision: Project Memory Copilot',
      content: `After mentor feedback, decided to pivot completely.

NEW CONCEPT: A project copilot for managing multi-day projects (competitions, hackathons, research).

Why memory is essential:
- Projects evolve over days/weeks
- Need to remember: decisions made, feedback received, goals changed
- Users resume work across sessions and need context
- Memory prevents "what did I decide yesterday?" problem

This makes memory the CORE feature, not a nice-to-have.

Target use case: Someone working on this very competition! Meta and relatable.`,
      timestamp: new Date(twoDaysAgo + 14 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_6',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'brainstorm_idea',
      category: 'episodic_memory',
      title: 'Feature brainstorm for new direction',
      content: `Core features for project copilot:
1. Memory-aware chat - answers based on project history
2. Timeline view - see evolution of project
3. Smart action planner - suggests next steps based on context
4. Memory input system - easy to log decisions, feedback, ideas

Visual design idea: Show retrieved memories in UI so judges can SEE the memory working.

Name ideas: ProjectMind, EverBrief, MemoryPilot, ContextKeeper

Leaning toward "EverBrief" - brief updates that last forever.`,
      timestamp: new Date(twoDaysAgo + 16 * 60 * 60 * 1000).toISOString(),
    },

    // Day 3: Implementation and refinement
    {
      id: 'mem_demo_7',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'task_update',
      category: 'foresight',
      title: 'Implementation plan finalized',
      content: `Tech stack decided:
- Next.js 14 (app router)
- TypeScript for type safety
- Tailwind CSS for clean UI
- EverMemOS Cloud API for memory

Architecture:
- Memory adapter pattern (supports both EverMemOS and mock mode)
- Clean separation: UI components, API routes, memory layer
- Demo data seeder for quick showcase

Timeline:
- Today: Build MVP
- Tomorrow: Polish and test
- Day after: Record demo video
- Submit by deadline

Focusing on quality over features. Better to have 3 features that work perfectly than 10 that are half-baked.`,
      timestamp: new Date(oneDayAgo + 9 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_8',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'meeting_note',
      category: 'episodic_memory',
      title: 'Design review session',
      content: `Reviewed UI mockups with team.

Decisions made:
- Keep it clean and minimal, not over-designed
- Use subtle colors to differentiate memory types
- Make memory retrieval visible in chat responses
- Add expandable "memories used" section
- Timeline should feel like a story of the project

Reference inspiration: Linear (clean), Notion (organized), Height (thoughtful)

Accessibility: Ensure good contrast, keyboard navigation, clear labels.`,
      timestamp: new Date(oneDayAgo + 13 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_9',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'project_decision',
      category: 'episodic_memory',
      title: 'Demo strategy',
      content: `For the demo video, we'll use this very project as the example!

Script outline:
1. Show problem: "I'm working on a competition, took a break, forgot my decisions"
2. Introduce EverBrief: "Remembers everything across sessions"
3. Demo the 3-day journey (using this actual data)
4. Show chat retrieving memories
5. Show action planner using context
6. Emphasize: This ONLY works with long-term memory

The meta-narrative (using EverBrief to build EverBrief) makes the value crystal clear.`,
      timestamp: new Date(oneDayAgo + 15 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mem_demo_10',
      projectId: 'demo-project',
      userId: 'demo-user',
      type: 'task_update',
      category: 'foresight',
      title: 'Current status and next steps',
      content: `Status: MVP in progress, on track for deadline.

Completed:
✓ Core architecture
✓ Memory adapter system
✓ UI components
✓ Demo data
✓ Basic chat with memory retrieval

Remaining:
- Polish UI styling
- Test memory search accuracy
- Add error handling
- Write comprehensive README
- Record demo video
- Prepare Devpost submission

Timeline pressure is real but manageable. Focus: quality demo over feature bloat.`,
      timestamp: new Date(oneDayAgo + 18 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
