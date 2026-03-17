import { MemoryCategory, MemoryItem, MemoryType } from '@/lib/types';
import {
  MemoryAdapter,
  AddMemoryParams,
  SearchMemoriesParams,
  ListMemoriesParams,
} from './adapter';

interface EverMemOSConfig {
  apiKey: string;
  baseUrl: string;
}

interface EverMemOSMemoryMetadata extends Record<string, unknown> {
  project_id?: string;
  type?: MemoryType;
  title?: string;
}

interface EverMemOSMemory {
  id?: string;
  memory_id?: string;
  metadata?: EverMemOSMemoryMetadata;
  memory_type?: MemoryCategory;
  content?: string;
  text?: string;
  timestamp?: string;
  created_at?: string;
}

interface EverMemOSWriteResponse {
  id?: string;
  memory_id?: string;
  timestamp?: string;
}

interface EverMemOSListResponse {
  results?: EverMemOSMemory[];
  memories?: EverMemOSMemory[];
}

export class EverMemOSAdapter implements MemoryAdapter {
  private config: EverMemOSConfig;

  constructor(config: EverMemOSConfig) {
    this.config = config;
  }

  async addMemory(params: AddMemoryParams): Promise<MemoryItem> {
    const response = await fetch(`${this.config.baseUrl}/memories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        user_id: params.userId,
        memory_type: params.category,
        content: params.content,
        metadata: {
          ...params.metadata,
          project_id: params.projectId,
          type: params.type,
          title: params.title,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`EverMemOS API error: ${response.statusText}`);
    }

    const data: EverMemOSWriteResponse = await response.json();

    // Map EverMemOS response to our MemoryItem format
    return {
      id: data.id || data.memory_id,
      projectId: params.projectId,
      userId: params.userId,
      type: params.type,
      category: params.category,
      title: params.title,
      content: params.content,
      timestamp: data.timestamp || new Date().toISOString(),
      metadata: params.metadata,
    };
  }

  async searchMemories(params: SearchMemoriesParams): Promise<MemoryItem[]> {
    const response = await fetch(`${this.config.baseUrl}/memories/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        query: params.query,
        user_id: params.userId,
        limit: params.limit || 10,
        memory_type: params.category,
        filters: {
          project_id: params.projectId,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`EverMemOS API error: ${response.statusText}`);
    }

    const data: EverMemOSListResponse = await response.json();
    const memories = data.results || data.memories || [];

    // Map EverMemOS response to our MemoryItem format
    return memories.map((mem) => ({
      id: mem.id || mem.memory_id,
      projectId: mem.metadata?.project_id || params.projectId,
      userId: params.userId,
      type: mem.metadata?.type || 'meeting_note',
      category: mem.memory_type || params.category || 'episodic_memory',
      title: mem.metadata?.title || 'Untitled',
      content: mem.content || mem.text,
      timestamp: mem.timestamp || mem.created_at,
      metadata: mem.metadata,
    }));
  }

  async listMemories(params: ListMemoriesParams): Promise<MemoryItem[]> {
    const response = await fetch(
      `${this.config.baseUrl}/memories?user_id=${params.userId}&limit=${params.limit || 50}${
        params.category ? `&memory_type=${params.category}` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`EverMemOS API error: ${response.statusText}`);
    }

    const data: EverMemOSListResponse = await response.json();
    const memories = data.memories || data.results || [];

    // Filter by project and map to our format
    return memories
      .filter((mem) => mem.metadata?.project_id === params.projectId)
      .map((mem) => ({
        id: mem.id || mem.memory_id,
        projectId: mem.metadata?.project_id || params.projectId,
        userId: params.userId,
        type: mem.metadata?.type || 'meeting_note',
        category: mem.memory_type || 'episodic_memory',
        title: mem.metadata?.title || 'Untitled',
        content: mem.content || mem.text,
        timestamp: mem.timestamp || mem.created_at,
        metadata: mem.metadata,
      }));
  }
}
