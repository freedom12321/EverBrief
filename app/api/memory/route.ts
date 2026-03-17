import { NextRequest, NextResponse } from 'next/server';
import { getMemoryAdapter } from '@/lib/memory';
import { requireAppAccess } from '@/lib/security/access';
import { MemoryType, MemoryCategory } from '@/lib/types';

const MEMORY_TYPE_TO_CATEGORY: Record<MemoryType, MemoryCategory> = {
  competition_brief: 'profile',
  mentor_feedback: 'episodic_memory',
  project_decision: 'episodic_memory',
  brainstorm_idea: 'episodic_memory',
  meeting_note: 'episodic_memory',
  task_update: 'foresight',
};

export async function POST(request: NextRequest) {
  const accessResponse = requireAppAccess(request);
  if (accessResponse) {
    return accessResponse;
  }

  try {
    const body = await request.json();
    const { projectId, userId, type, title, content } = body;

    if (!projectId || !userId || !type || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adapter = getMemoryAdapter();
    const category = MEMORY_TYPE_TO_CATEGORY[type as MemoryType] || 'episodic_memory';

    const memory = await adapter.addMemory({
      projectId,
      userId,
      type,
      category,
      title,
      content,
    });

    return NextResponse.json(memory);
  } catch (error) {
    console.error('Memory API error:', error);
    return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const accessResponse = requireAppAccess(request);
  if (accessResponse) {
    return accessResponse;
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!projectId || !userId) {
      return NextResponse.json({ error: 'Missing projectId or userId' }, { status: 400 });
    }

    const adapter = getMemoryAdapter();
    const memories = await adapter.listMemories({
      projectId,
      userId,
      limit,
    });

    return NextResponse.json({ memories });
  } catch (error) {
    console.error('Memory API error:', error);
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}
