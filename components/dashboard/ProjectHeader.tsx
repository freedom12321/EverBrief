'use client';

import { Project } from '@/lib/types';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const daysUntilDeadline = Math.ceil(
    (new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-slide-up">
      <Card className="md:col-span-2 group">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/30">
            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide">
              {project.projectType.replace('_', ' ')}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">Goal</h4>
              <p className="text-sm text-gray-200 leading-relaxed">{project.goal}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2 uppercase tracking-wide">Judging Criteria</h4>
              <p className="text-sm text-gray-200 leading-relaxed">{project.judgingCriteria}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⏰</span> Deadline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 relative z-10">
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {new Date(project.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-sm ${
              daysUntilDeadline <= 3
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : daysUntilDeadline <= 7
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {daysUntilDeadline > 0 ? `${daysUntilDeadline} days remaining` : 'Deadline passed'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
