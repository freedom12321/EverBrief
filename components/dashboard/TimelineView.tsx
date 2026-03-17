'use client';

import { MemoryItem } from '@/lib/types';

interface TimelineViewProps {
  memories: MemoryItem[];
}

const MEMORY_TYPE_COLORS: Record<string, string> = {
  competition_brief: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  mentor_feedback: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  project_decision: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  brainstorm_idea: 'bg-green-500/20 text-green-300 border-green-500/30',
  meeting_note: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  task_update: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export function TimelineView({ memories }: TimelineViewProps) {
  const sortedMemories = [...memories].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedMemories.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No memories yet. Start adding project updates!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedMemories.map((memory, idx) => (
        <div key={memory.id} className="flex gap-4 group">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300" />
            {idx < sortedMemories.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-blue-400/50 to-purple-500/30 mt-2" />}
          </div>

          <div className="flex-1 pb-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-3 gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-white text-lg mb-1">{memory.title}</h4>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-purple-400">📅</span>
                  {new Date(memory.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap ${
                  MEMORY_TYPE_COLORS[memory.type] || MEMORY_TYPE_COLORS.meeting_note
                }`}
              >
                {memory.type.replace('_', ' ')}
              </span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{memory.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
