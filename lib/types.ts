export type ProjectType = 'competition' | 'hackathon' | 'research' | 'application';

export type MemoryType =
  | 'competition_brief'
  | 'mentor_feedback'
  | 'project_decision'
  | 'brainstorm_idea'
  | 'meeting_note'
  | 'task_update';

export type MemoryCategory = 'profile' | 'episodic_memory' | 'foresight' | 'event_log';

export interface Project {
  id: string;
  title: string;
  deadline: string;
  projectType: ProjectType;
  goal: string;
  judgingCriteria: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryItem {
  id: string;
  projectId: string;
  userId: string;
  type: MemoryType;
  category: MemoryCategory;
  title: string;
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  retrievedMemories?: MemoryItem[];
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  completed: boolean;
}
