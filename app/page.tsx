import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Header with glow effect */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2 animate-gradient">
              EverBrief
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
          </div>
          <p className="text-2xl text-gray-200 font-light">Your memory-native project copilot</p>
        </header>

        {/* Main card with glassmorphism */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 mb-12 hover:bg-white/15 transition-all duration-300 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Stop losing context. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Start building better.</span>
            </h2>

            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              Working on a competition, hackathon, or research project that spans multiple days?
              You take notes, get feedback, make decisions... then forget half of it when you come back.
            </p>

            <p className="text-lg text-gray-100 mb-8 leading-relaxed">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">EverBrief remembers everything.</span> It captures
              your project journey—goals, feedback, decisions, ideas—and uses <strong className="text-purple-300">long-term memory</strong> to
              help you stay aligned with your vision across every session.
            </p>

            {/* Highlighted callout */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-l-4 border-purple-400 rounded-r-2xl p-6 mb-8 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
              <p className="text-gray-100 leading-relaxed">
                <span className="font-bold text-purple-300">This isn&apos;t a chatbot.</span> It&apos;s a persistent memory system
                that grows with your project. Ask it <span className="text-pink-300">&quot;What did the mentor criticize?&quot;</span> or <span className="text-pink-300">&quot;What did we decide yesterday?&quot;</span>
                and get accurate answers based on your actual project history.
              </p>
            </div>

            {/* Feature cards with hover effects */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <h3 className="font-bold text-white mb-2 text-lg">Memory-Aware Chat</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Ask questions and get answers grounded in your project&apos;s history
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
                <h3 className="font-bold text-white mb-2 text-lg">Timeline View</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  See your project&apos;s evolution from day one to deadline
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
                <h3 className="font-bold text-white mb-2 text-lg">Smart Planning</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Generate next steps based on goals, feedback, and time remaining
                </p>
              </div>
            </div>

            {/* CTA Button with glow */}
            <div className="text-center">
              <Link href="/app">
                <Button size="lg" className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 border-0">
                  Launch Dashboard →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer with subtle glow */}
        <div className="text-center text-gray-300 animate-fade-in">
          <p className="mb-2 text-lg">
            Powered by <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EverMemOS</span>
          </p>
          <p className="text-sm text-gray-400">
            Built for the EverMind Memory Genesis Competition 2026
          </p>
        </div>
      </div>
    </div>
  );
}
