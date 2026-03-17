import { MemoryItem, MemoryCategory, MemoryType } from '@/lib/types';

export interface AddMemoryParams {
  projectId: string;
  userId: string;
  type: MemoryType;
  category: MemoryCategory;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface SearchMemoriesParams {
  query: string;
  projectId: string;
  userId: string;
  limit?: number;
  category?: MemoryCategory;
}

export interface ListMemoriesParams {
  projectId: string;
  userId: string;
  limit?: number;
  category?: MemoryCategory;
}

export interface MemoryAdapter {
  addMemory(params: AddMemoryParams): Promise<MemoryItem>;
  searchMemories(params: SearchMemoriesParams): Promise<MemoryItem[]>;
  listMemories(params: ListMemoriesParams): Promise<MemoryItem[]>;
}
