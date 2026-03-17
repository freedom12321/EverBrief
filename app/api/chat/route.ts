import { NextRequest, NextResponse } from 'next/server';
import { getMemoryAdapter } from '@/lib/memory';
import { MemoryItem } from '@/lib/types';
import { requireAppAccess } from '@/lib/security/access';
import OpenAI from 'openai';

// Initialize OpenAI (will be undefined if no API key)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function generateResponseWithLLM(query: string, memories: MemoryItem[]): Promise<string> {
  if (!openai) {
    // Fallback to rule-based if no OpenAI key
    return generateRuleBasedResponse(query, memories);
  }

  try {
    // Build context from memories
    const memoryContext = memories.length > 0
      ? memories
          .map(
            (m) =>
              `[${new Date(m.timestamp).toLocaleDateString()}] ${m.type.replace('_', ' ').toUpperCase()}: ${m.title}\n${m.content}`
          )
          .join('\n\n---\n\n')
      : 'No memories available yet.';

    // Call OpenAI with memory context
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are EverBrief, a memory-native project copilot assistant. You help users manage multi-day projects by remembering their goals, decisions, feedback, and project evolution.

Your responses should be:
- Based on the retrieved project memories provided
- Helpful and conversational
- Focused on the user's project context
- Clear about what you remember from their project history

If memories are provided, reference them specifically. If no relevant memories exist, acknowledge this and suggest adding memories.`,
        },
        {
          role: 'user',
          content: `Here are my project memories:\n\n${memoryContext}\n\n---\n\nMy question: ${query}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to rule-based on error
    return generateRuleBasedResponse(query, memories);
  }
}

function generateRuleBasedResponse(query: string, memories: MemoryItem[]): string {
  const lowerQuery = query.toLowerCase();

  // Rule-based responses based on retrieved memories
  if (lowerQuery.includes('decide') || lowerQuery.includes('decision')) {
    const decisions = memories.filter((m) => m.type === 'project_decision');
    if (decisions.length > 0) {
      return `Based on your project decisions:\n\n${decisions
        .slice(0, 3)
        .map((d) => `• ${d.title}: ${d.content}`)
        .join('\n\n')}`;
    }
  }

  if (lowerQuery.includes('mentor') || lowerQuery.includes('feedback') || lowerQuery.includes('criticize')) {
    const feedback = memories.filter((m) => m.type === 'mentor_feedback');
    if (feedback.length > 0) {
      return `Here's the mentor feedback I found:\n\n${feedback
        .slice(0, 3)
        .map((f) => `• ${f.title}: ${f.content}`)
        .join('\n\n')}`;
    }
  }

  if (lowerQuery.includes('task') || lowerQuery.includes('next') || lowerQuery.includes('urgent')) {
    const tasks = memories.filter((m) => m.type === 'task_update' || m.category === 'foresight');
    if (tasks.length > 0) {
      return `Your current tasks and next steps:\n\n${tasks
        .slice(0, 5)
        .map((t, idx) => `${idx + 1}. ${t.title}\n   ${t.content}`)
        .join('\n\n')}`;
    }
    return `Based on your project context, here are suggested next steps:\n\n1. Review competition criteria and align current work\n2. Address any outstanding mentor feedback\n3. Complete core features before the deadline\n4. Prepare demo and documentation\n5. Test and polish the submission`;
  }

  if (lowerQuery.includes('evolution') || lowerQuery.includes('summarize') || lowerQuery.includes('history')) {
    if (memories.length === 0) {
      return "I don't have enough project history yet. Add more memories as you work!";
    }

    const sorted = [...memories].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return `Project Evolution:\n\n${sorted
      .map((m, idx) => {
        const date = new Date(m.timestamp).toLocaleDateString();
        return `${idx + 1}. [${date}] ${m.title}\n   ${m.content.substring(0, 100)}${m.content.length > 100 ? '...' : ''}`;
      })
      .join('\n\n')}`;
  }

  if (lowerQuery.includes('criteria') || lowerQuery.includes('judging')) {
    const criteria = memories.filter((m) => m.type === 'competition_brief');
    if (criteria.length > 0) {
      return `Judging criteria to keep in mind:\n\n${criteria
        .map((c) => `${c.title}:\n${c.content}`)
        .join('\n\n')}`;
    }
  }

  // Default response with memory context
  if (memories.length > 0) {
    return `I found ${memories.length} relevant memories:\n\n${memories
      .slice(0, 5)
      .map((m) => `• ${m.title} (${m.type.replace('_', ' ')})\n  ${m.content.substring(0, 150)}${m.content.length > 150 ? '...' : ''}`)
      .join('\n\n')}`;
  }

  return "I don't have enough context yet. Try adding some project memories first!";
}

export async function POST(request: NextRequest) {
  const accessResponse = requireAppAccess(request);
  if (accessResponse) {
    return accessResponse;
  }

  try {
    const body = await request.json();
    const { projectId, userId, message } = body;

    if (!projectId || !userId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adapter = getMemoryAdapter();

    // Search for relevant memories
    const retrievedMemories = await adapter.searchMemories({
      query: message,
      projectId,
      userId,
      limit: 10,
    });

    // Generate response with LLM (or fallback to rule-based)
    const response = await generateResponseWithLLM(message, retrievedMemories);

    return NextResponse.json({
      response,
      retrievedMemories: retrievedMemories.slice(0, 5),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
