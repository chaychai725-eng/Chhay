import React from 'react';
import {
  Sparkles,
  Save,
  Eye,
  Rocket,
  Moon,
  Sun,
  Check,
  Code2,
  FolderOpen,
  Plus,
  User,
  History
} from 'lucide-react';
import { Project, AppUser } from '../types';

interface TopHeaderProps {
  currentProject: Project;
  onSaveProject: () => void;
  onDeploy: () => void;
  onTogglePreview: () => void;
  onNewChat?: () => void;
  onOpenHistory?: () => void;
  historyCount?: number;
  isSaving: boolean;
  saveSuccess: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenProjects: () => void;
  onOpenAdmin: () => void;
  onOpenAuth?: () => void;
  currentUser?: AppUser | null;
  isAdminActive?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentProject,
  onSaveProject,
  onDeploy,
  onTogglePreview,
  onNewChat,
  onOpenHistory,
  historyCount = 0,
  isSaving,
  saveSuccess,
  isDarkMode,
  onToggleTheme,
  onOpenProjects,
  onOpenAdmin,
  onOpenAuth,
  currentUser,
  isAdminActive,
}) => {
  return (
    <header className="h-14 border-b border-slate-800/80 bg-[#090e1b] px-5 flex items-center justify-between select-none z-10 shrink-0">
      {/* Left Badge: Create • Edit • Deploy */}
      <div className="flex items-center space-x-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 text-xs font-medium shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-200">Create &bull; Edit &bull; Deploy</span>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 pl-2">
          <span>Current:</span>
          <span className="text-white font-semibold truncate max-w-[200px]">
            {currentProject.title || 'Untitled Website'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            v{currentProject.version || 1}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Toggle UI Mood"
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-cyan-300" /> : <Sun className="w-4 h-4 text-amber-300" />}
        </button>

        {/* New Chat Button */}
        {onNewChat && (
          <button
            onClick={onNewChat}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-md shadow-cyan-500/20"
            title="Start fresh with a New Chat"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        )}

        {/* History Button */}
        {onOpenHistory && (
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all"
            title="ប្រវត្តិការសន្ទនា និងគេហទំព័រ"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ប្រវត្តិ</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-amber-300 font-mono">
                {historyCount}
              </span>
            )}
          </button>
        )}

        {/* Save Project */}
        <button
          onClick={onSaveProject}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            saveSuccess
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-slate-600'
          }`}
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-slate-300" />
              <span>Save Project</span>
            </>
          )}
        </button>

        {/* Preview Button */}
        <button
          onClick={onTogglePreview}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Preview</span>
        </button>

        {/* Deploy Button */}
        <button
          onClick={onDeploy}
          className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-indigo-600/30"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Deploy</span>
        </button>

        {/* Admin Portal Toggle */}
        <button
          onClick={onOpenAdmin}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            isAdminActive
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/30'
          }`}
        >
          <span>Admin គ្រប់គ្រង</span>
        </button>

        {/* User Account / Profile */}
        <div
          onClick={onOpenAuth || onOpenProjects}
          title={currentUser ? `Logged in as ${currentUser.name} (${currentUser.email})` : 'Account Login / Registration'}
          className="flex items-center space-x-1.5 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-cyan-500/40 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-indigo-300">
              {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'CC'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
