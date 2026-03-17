'use client';

import { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { RetrievedMemoriesPanel } from './RetrievedMemoriesPanel';

interface ChatPanelProps {
  projectId: string;
}

export function ChatPanel({ projectId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          userId: 'demo-user',
          message: input,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        retrievedMemories: data.retrievedMemories,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-900/50 rounded-t-xl">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p className="mb-2 text-lg font-semibold">💬 Ask me anything about your project!</p>
            <p className="text-sm text-gray-500">Try: &quot;What did we decide last time?&quot;</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'} rounded-2xl px-4 py-3 shadow-md`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              {msg.retrievedMemories && msg.retrievedMemories.length > 0 && (
                <RetrievedMemoriesPanel memories={msg.retrievedMemories} />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <span className="animate-pulse">🤔</span> Thinking...
              </p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your project..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} size="md">
            Send →
          </Button>
        </div>
      </form>
    </div>
  );
}
