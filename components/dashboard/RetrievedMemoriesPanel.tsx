'use client';

import { useState } from 'react';
import { MemoryItem } from '@/lib/types';

interface RetrievedMemoriesPanelProps {
  memories: MemoryItem[];
}

export function RetrievedMemoriesPanel({ memories }: RetrievedMemoriesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (memories.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <span>{isExpanded ? '▼' : '▶'}</span>
        <span>Memories used ({memories.length})</span>
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          {memories.map((mem) => (
            <div key={mem.id} className="bg-gray-50 rounded p-2 text-xs">
              <div className="font-medium text-gray-700">{mem.title}</div>
              <div className="text-gray-600 mt-1 line-clamp-2">{mem.content}</div>
              <div className="text-gray-500 mt-1">
                {new Date(mem.timestamp).toLocaleDateString()} • {mem.type.replace('_', ' ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
