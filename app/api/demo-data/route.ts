import { NextRequest, NextResponse } from 'next/server';
import { getMemoryAdapter } from '@/lib/memory';
import { MockMemoryAdapter } from '@/lib/memory/mock-adapter';
import { generateDemoMemories } from '@/lib/demo-data';
import { requireAppAccess } from '@/lib/security/access';

export async function POST(request: NextRequest) {
  const accessResponse = requireAppAccess(request);
  if (accessResponse) {
    return accessResponse;
  }

  try {
    const adapter = getMemoryAdapter();

    // Only works with mock adapter
    if (!(adapter instanceof MockMemoryAdapter)) {
      return NextResponse.json(
        { error: 'Demo data only available in mock mode' },
        { status: 400 }
      );
    }

    // Clear existing data and seed demo memories
    adapter.clearAll();
    const demoMemories = generateDemoMemories();
    adapter.seedMemories(demoMemories);

    return NextResponse.json({
      success: true,
      count: demoMemories.length,
    });
  } catch (error) {
    console.error('Demo data error:', error);
    return NextResponse.json({ error: 'Failed to load demo data' }, { status: 500 });
  }
}
