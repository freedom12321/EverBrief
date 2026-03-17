'use client';

import { useState } from 'react';
import { ActionItem } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface ActionPlannerProps {
  projectId: string;
}

export function ActionPlanner({ projectId }: ActionPlannerProps) {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateActions = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          userId: 'demo-user',
          message: 'Generate my next 3-5 most urgent action items based on project context and deadline',
        }),
      });

      const data = await response.json();

      // Parse action items from response
      // Simple parsing - look for lines starting with numbers or bullets
      const lines = data.response.split('\n').filter((l: string) => l.trim());
      const parsedActions: ActionItem[] = lines
        .filter((line: string) => /^[\d\-\*•]/.test(line.trim()))
        .slice(0, 5)
        .map((line: string, idx: number) => ({
          id: `action_${Date.now()}_${idx}`,
          title: line.replace(/^[\d\-\*•.\)\]}\s]+/, '').trim(),
          description: '',
          priority: idx === 0 ? 'high' : idx < 3 ? 'medium' : 'low',
          completed: false,
        }));

      if (parsedActions.length > 0) {
        setActions(parsedActions);
      }
    } catch (error) {
      console.error('Failed to generate actions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((action) => (action.id === id ? { ...action, completed: !action.completed } : action))
    );
  };

  const saveActionsToMemory = async () => {
    try {
      const actionsSummary = actions.map((a) => `${a.completed ? '✓' : '○'} ${a.title}`).join('\n');

      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          userId: 'demo-user',
          type: 'task_update',
          title: 'Action Plan Generated',
          content: actionsSummary,
        }),
      });
    } catch (error) {
      console.error('Failed to save actions:', error);
    }
  };

  const PRIORITY_COLORS = {
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-300 border-green-500/30',
  };

  return (
    <div className="space-y-4">
      {actions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-300 mb-6 text-lg">🎯 Generate AI-powered action items based on your project memory</p>
          <Button onClick={generateActions} disabled={isGenerating} size="lg">
            {isGenerating ? '✨ Generating...' : '🚀 Generate Action Plan'}
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {actions.map((action) => (
              <div
                key={action.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
                  action.completed
                    ? 'bg-white/5 border-white/10 opacity-60'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
              >
                <input
                  type="checkbox"
                  checked={action.completed}
                  onChange={() => toggleAction(action.id)}
                  className="mt-1 h-5 w-5 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${action.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {action.title}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${PRIORITY_COLORS[action.priority]}`}
                >
                  {action.priority}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={saveActionsToMemory} variant="secondary" size="sm">
              Save to Memory
            </Button>
            <Button onClick={generateActions} variant="ghost" size="sm" disabled={isGenerating}>
              Regenerate
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
