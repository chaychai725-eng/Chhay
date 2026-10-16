import React, { useState } from 'react';
import {
  X,
  History,
  MessageSquare,
  FolderOpen,
  Plus,
  Trash2,
  ArrowRight,
  Download,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ChatSession, Project } from '../types';
import { exportProjectToZip } from '../utils/zipExporter';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onNewChat: () => void;
  savedProjects: Project[];
  onSelectProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onNewChat,
  savedProjects,
  onSelectProject,
  onDeleteProject,
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'projects'>('chats');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProjects = savedProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b101d] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-[#080d19] flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>ប្រវត្តិការប្រើប្រាស់ & គម្រោង</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  History
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                រក្សាទុកនូវរាល់ការសន្ទនា និងគេហទំព័រដែលលោកអ្នកបានបង្កើត
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onNewChat();
                onClose();
              }}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat ថ្មី</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-[#0d1424] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'chats'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ប្រវត្តិការសន្ទនា ({sessions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>គេហទំព័រដែលបានរក្សាទុក ({savedProjects.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកតាមចំណងជើង..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
          {activeTab === 'chats' ? (
            filteredSessions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-300">មិនទាន់មានប្រវត្តិការសន្ទនានៅឡើយទេ</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  រាល់ពេលដែលលោកអ្នកបង្កើតគេហទំព័រ ឬចាប់ផ្តើមការសន្ទនាថ្មី ប្រព័ន្ធនឹងរក្សាទុកដោយស្វ័យប្រវត្តិនៅទីនេះ។
                </p>
                <button
                  onClick={() => {
                    onNewChat();
                    onClose();
                  }}
                  className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ចាប់ផ្តើម New Chat ឥឡូវនេះ</span>
                </button>
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isActive = session.id === activeSessionId;
                const lastMsg = session.messages[session.messages.length - 1];

                return (
                  <div
                    key={session.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-indigo-950/30 border-indigo-500/60 shadow-lg shadow-indigo-950/40'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm text-white truncate">
                          {session.title || 'ការសន្ទនាគ្មានចំណងជើង'}
                        </span>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold shrink-0">
                            កំពុងបើក
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                          {session.messages.length} សារ
                        </span>
                      </div>

                      {lastMsg && (
                        <p className="text-xs text-slate-400 truncate mt-1">
                          <span className="text-slate-500">{lastMsg.sender === 'user' ? 'អ្នក: ' : 'AI: '}</span>
                          {lastMsg.text}
                        </p>
                      )}

                      <div className="flex items-center space-x-3 text-[10px] text-slate-500 mt-2 font-mono">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{new Date(session.updatedAt || session.createdAt).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => exportProjectToZip(session.project)}
                        title="ទាញយកកូដគេហទំព័រ (ZIP)"
                        className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteSession(session.id)}
                        title="លុបការសន្ទនានេះ"
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectSession(session);
                          onClose();
                        }}
                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <span>បន្តការសន្ទនា</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            filteredProjects.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                មិនទាន់មានគម្រោងដែលបានរក្សាទុកទេ។ ចុចប៊ូតុង "រក្សាទុក (Save)" នៅរបារខាងលើ ដើម្បីរក្សាទុកគេហទំព័រដែលអ្នកពេញចិត្ត!
              </div>
            ) : (
              filteredProjects.map((proj) => {
                return (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-white truncate">{proj.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-1">
                        {proj.description || 'គ្មានការពិពណ៌នា'}
                      </p>
                      <div className="text-[10px] text-slate-500 mt-2 font-mono">
                        កែសម្រួលចុងក្រោយ: {new Date(proj.updatedAt || proj.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => exportProjectToZip(proj)}
                        title="Download ZIP"
                        className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        title="លុបគម្រោង"
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectProject(proj);
                          onClose();
                        }}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                      >
                        <span>បើកមើល</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      </div>
    </div>
  );
};
