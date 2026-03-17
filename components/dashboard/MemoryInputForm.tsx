'use client';

import { useState } from 'react';
import { MemoryType } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface MemoryInputFormProps {
  projectId: string;
  onMemoryAdded: () => void;
}

const MEMORY_TYPES: { value: MemoryType; label: string }[] = [
  { value: 'competition_brief', label: 'Competition Brief' },
  { value: 'mentor_feedback', label: 'Mentor Feedback' },
  { value: 'project_decision', label: 'Project Decision' },
  { value: 'brainstorm_idea', label: 'Brainstorm Idea' },
  { value: 'meeting_note', label: 'Meeting Note' },
  { value: 'task_update', label: 'Task Update' },
];

export function MemoryInputForm({ projectId, onMemoryAdded }: MemoryInputFormProps) {
  const [type, setType] = useState<MemoryType>('meeting_note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          userId: 'demo-user',
          type,
          title,
          content,
        }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        onMemoryAdded();
      }
    } catch (error) {
      console.error('Failed to add memory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">Memory Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as MemoryType)}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all"
        >
          {MEMORY_TYPES.map((mt) => (
            <option key={mt.value} value={mt.value} className="bg-slate-800 text-white">
              {mt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description..."
          required
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Details..."
          required
          rows={4}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full" size="md">
        {isSubmitting ? '✨ Adding...' : '➕ Add Memory'}
      </Button>
    </form>
  );
}
