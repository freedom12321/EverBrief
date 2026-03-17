'use client';

import { useState, useEffect } from 'react';
import { MemoryItem } from '@/lib/types';
import { DEMO_PROJECT } from '@/lib/demo-data';
import { ProjectHeader } from '@/components/dashboard/ProjectHeader';
import { MemoryInputForm } from '@/components/dashboard/MemoryInputForm';
import { ChatPanel } from '@/components/dashboard/ChatPanel';
import { TimelineView } from '@/components/dashboard/TimelineView';
import { ActionPlanner } from '@/components/dashboard/ActionPlanner';
import { DemoDataButton } from '@/components/dashboard/DemoDataButton';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

export default function DashboardPage() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'timeline' | 'actions'>('chat');
  const [accessStatus, setAccessStatus] = useState<'checking' | 'locked' | 'granted'>('checking');
  const [accessPassword, setAccessPassword] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const loadMemories = async () => {
    try {
      const response = await fetch(
        `/api/memory?projectId=${DEMO_PROJECT.id}&userId=demo-user&limit=100`
      );

      if (response.status === 401) {
        setMemories([]);
        setAccessError('This app is locked. Enter the access password to continue.');
        setAccessStatus('locked');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load memories');
      }

      const data = await response.json();
      setMemories(data.memories || []);
    } catch (error) {
      console.error('Failed to load memories:', error);
    }
  };

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch('/api/access', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to verify access');
        }

        const data = await response.json();
        setAccessStatus(data.authenticated ? 'granted' : 'locked');
      } catch (error) {
        console.error('Failed to verify access:', error);
        setAccessError('Unable to verify access right now. Refresh and try again.');
        setAccessStatus('locked');
      }
    };

    checkAccess();
  }, []);

  useEffect(() => {
    if (accessStatus === 'granted') {
      loadMemories();
    }
  }, [accessStatus]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    setAccessError('');

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: accessPassword }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Access denied' }));
        setAccessError(data.error || 'Access denied');
        return;
      }

      setAccessPassword('');
      setAccessStatus('granted');
    } catch (error) {
      console.error('Failed to unlock app:', error);
      setAccessError('Unable to unlock right now. Try again.');
    } finally {
      setIsUnlocking(false);
    }
  };

  if (accessStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-lg font-semibold text-white">Checking access...</p>
            <p className="mt-2 text-sm text-gray-300">Loading your local EverBrief workspace.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accessStatus === 'locked') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Unlock EverBrief</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="space-y-4">
              <p className="text-sm text-gray-300">
                This deployment is protected by an app password. Your OpenAI key stays on the server and is never committed to GitHub.
              </p>
              <input
                type="password"
                value={accessPassword}
                onChange={(e) => setAccessPassword(e.target.value)}
                placeholder="Enter app password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all"
                autoComplete="current-password"
                required
              />
              {accessError && (
                <p className="text-sm text-red-300">{accessError}</p>
              )}
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 disabled:opacity-60"
                disabled={isUnlocking}
              >
                {isUnlocking ? 'Unlocking...' : 'Unlock'}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
              EverBrief Dashboard
            </h1>
            <p className="text-gray-400 text-sm">Memory-powered project intelligence</p>
          </div>
          <DemoDataButton onDataLoaded={loadMemories} />
        </div>

        <ProjectHeader project={DEMO_PROJECT} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="border-b border-white/10">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-5 py-2.5 font-bold rounded-xl transition-all duration-300 ${
                    activeTab === 'chat'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-5 py-2.5 font-bold rounded-xl transition-all duration-300 ${
                    activeTab === 'timeline'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  📅 Timeline
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-5 py-2.5 font-bold rounded-xl transition-all duration-300 ${
                    activeTab === 'actions'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🎯 Actions
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === 'chat' && (
                <div className="p-4">
                  <ChatPanel projectId={DEMO_PROJECT.id} />
                </div>
              )}
              {activeTab === 'timeline' && (
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <TimelineView memories={memories} />
                </div>
              )}
              {activeTab === 'actions' && (
                <div className="p-6">
                  <ActionPlanner projectId={DEMO_PROJECT.id} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Memory</CardTitle>
              </CardHeader>
              <CardContent>
                <MemoryInputForm projectId={DEMO_PROJECT.id} onMemoryAdded={loadMemories} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Memories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {memories.slice(0, 5).map((mem) => (
                    <div key={mem.id} className="border-b border-white/10 pb-3 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                      <h4 className="font-medium text-sm text-white">{mem.title}</h4>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">{mem.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(mem.timestamp).toLocaleDateString()} •{' '}
                        {mem.type.replace('_', ' ')}
                      </p>
                    </div>
                  ))}
                  {memories.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No memories yet. Click &quot;Load Demo Data&quot; to see a sample project!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
