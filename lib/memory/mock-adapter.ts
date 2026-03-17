import { MemoryItem } from '@/lib/types';
import {
  MemoryAdapter,
  AddMemoryParams,
  SearchMemoriesParams,
  ListMemoriesParams,
} from './adapter';

// In-memory storage for demo purposes
let memoryStore: MemoryItem[] = [];

export class MockMemoryAdapter implements MemoryAdapter {
  async addMemory(params: AddMemoryParams): Promise<MemoryItem> {
    const memory: MemoryItem = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId: params.projectId,
      userId: params.userId,
      type: params.type,
      category: params.category,
      title: params.title,
      content: params.content,
      timestamp: new Date().toISOString(),
      metadata: params.metadata,
    };

    memoryStore.push(memory);
    return memory;
  }

  async searchMemories(params: SearchMemoriesParams): Promise<MemoryItem[]> {
    const { query, projectId, userId, limit = 10, category } = params;

    let filtered = memoryStore.filter(
      (mem) => mem.projectId === projectId && mem.userId === userId
    );

    if (category) {
      filtered = filtered.filter((mem) => mem.category === category);
    }

    // Enhanced keyword matching with fallback to all memories
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2); // Split into words, ignore short words

    const scored = filtered
      .map((mem) => {
        const titleLower = mem.title.toLowerCase();
        const contentLower = mem.content.toLowerCase();
        const typeLower = mem.type.toLowerCase().replace('_', ' ');

        let score = 0;

        // Exact phrase match (highest score)
        if (titleLower.includes(queryLower)) score += 5;
        if (contentLower.includes(queryLower)) score += 3;

        // Individual word matches
        queryWords.forEach(word => {
          if (titleLower.includes(word)) score += 2;
          if (contentLower.includes(word)) score += 1;
          if (typeLower.includes(word)) score += 1;
        });

        // Semantic matching for common concepts
        if (queryLower.includes('pivot') && (contentLower.includes('change') || contentLower.includes('decision') || contentLower.includes('feedback'))) {
          score += 2;
        }
        if (queryLower.includes('mentor') && mem.type === 'mentor_feedback') {
          score += 3;
        }
        if (queryLower.includes('decide') && mem.type === 'project_decision') {
          score += 3;
        }

        return { mem, score };
      })
      .sort((a, b) => b.score - a.score);

    // If no good matches, return all memories (let LLM figure it out)
    const goodMatches = scored.filter(item => item.score > 0);

    if (goodMatches.length === 0) {
      // No matches found - return all memories sorted by date (most recent first)
      console.log('No keyword matches found, returning all memories for LLM to process');
      return filtered
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);
    }

    return goodMatches.slice(0, limit).map((item) => item.mem);
  }

  async listMemories(params: ListMemoriesParams): Promise<MemoryItem[]> {
    const { projectId, userId, limit = 50, category } = params;

    let filtered = memoryStore.filter(
      (mem) => mem.projectId === projectId && mem.userId === userId
    );

    if (category) {
      filtered = filtered.filter((mem) => mem.category === category);
    }

    return filtered
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Helper method for demo data seeding
  seedMemories(memories: MemoryItem[]) {
    memoryStore = [...memoryStore, ...memories];
  }

  // Helper to clear all memories (for testing)
  clearAll() {
    memoryStore = [];
  }

  // Helper to get all memories (for debugging)
  getAll() {
    return memoryStore;
  }
}

export const mockAdapter = new MockMemoryAdapter();
