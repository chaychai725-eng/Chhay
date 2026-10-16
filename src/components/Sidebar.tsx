import React from 'react';
import {
  Home,
  Sparkles,
  FolderOpen,
  LayoutGrid,
  Settings,
  Briefcase,
  User,
  ShoppingCart,
  BookOpen,
  CheckSquare,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShieldCheck,
  History
} from 'lucide-react';
import { STARTER_TEMPLATES } from '../data/templates';
import { TemplateDefinition } from '../types';

interface SidebarProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenProjects: () => void;
  onOpenHistory?: () => void;
  onOpenTemplates: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onSelectTemplate: (template: TemplateDefinition) => void;
  onResetToNew: () => void;
  savedCount: number;
  historyCount?: number;
  isAdminActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenProjects,
  onOpenHistory,
  onOpenTemplates,
  onOpenSettings,
  onOpenAdmin,
  onSelectTemplate,
  onResetToNew,
  savedCount,
  historyCount = 0,
  isAdminActive = false,
}) => {
  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between h-full select-none shrink-0 z-20">
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
        {/* Logo */}
        <div className="p-5 flex items-center space-x-3 border-b border-slate-800/50">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-[#0d1424] rounded-[11px] flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-white flex items-center space-x-1">
              <span>QuantYield</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 -mt-0.5 tracking-wider">AI Builder</div>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-4 space-y-1">
          <button
            onClick={() => {
              onSelectCategory('all');
            }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentCategory === 'all'
                ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/40 text-white border border-indigo-500/30 shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-4 h-4 text-indigo-400" />
            <span>Home</span>
          </button>

          <button
            onClick={onResetToNew}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Create Website (New Chat)</span>
          </button>

          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all"
            >
              <div className="flex items-center space-x-3">
                <History className="w-4 h-4 text-purple-400" />
                <span>Chat History (ប្រវត្តិ)</span>
              </div>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-[10px] text-purple-300 font-bold border border-purple-500/30">
                  {historyCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenProjects}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all"
          >
            <div className="flex items-center space-x-3">
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span>My Projects</span>
            </div>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-bold border border-slate-700">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTemplates}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all"
          >
            <LayoutGrid className="w-4 h-4 text-emerald-400" />
            <span>Templates</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isAdminActive
                ? 'bg-gradient-to-r from-cyan-900/60 to-indigo-900/60 text-cyan-300 border border-cyan-500/40 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80 bg-slate-900/40 border border-indigo-500/20'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin គ្រប់គ្រង</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[9px] font-bold border border-cyan-500/30">
              PORTAL
            </span>
          </button>
        </div>

        {/* Templates Section */}
        <div className="px-4 pt-4 pb-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Templates
          </div>
          <div className="space-y-1">
            {STARTER_TEMPLATES.map((tmpl) => {
              const icons: Record<string, React.ReactNode> = {
                business: <Briefcase className="w-4 h-4 text-cyan-400" />,
                portfolio: <User className="w-4 h-4 text-purple-400" />,
                ecommerce: <ShoppingCart className="w-4 h-4 text-amber-400" />,
                blog: <BookOpen className="w-4 h-4 text-emerald-400" />,
                landing: <CheckSquare className="w-4 h-4 text-sky-400" />,
                dashboard: <LayoutDashboard className="w-4 h-4 text-indigo-400" />,
              };

              const isSelected = currentCategory === tmpl.category;

              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    onSelectCategory(tmpl.category);
                    onSelectTemplate(tmpl);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-slate-800/80 text-white font-semibold border border-slate-700/80'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    {icons[tmpl.category] || <Briefcase className="w-4 h-4" />}
                    <span className="capitalize truncate">
                      {tmpl.category === 'ecommerce' ? 'E-commerce' : tmpl.category === 'landing' ? 'Landing Page' : tmpl.category}
                    </span>
                  </div>
                  {tmpl.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {tmpl.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upgrade Promo Card */}
        <div className="p-3 mt-auto">
          <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900/50 via-purple-950/40 to-slate-900/80 p-4 border border-indigo-500/30 overflow-hidden shadow-lg shadow-indigo-950/40">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Build your vision with AI</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Turn your ideas into real websites, instantly.
            </p>
            <button
              onClick={onOpenSettings}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-slate-800/80 flex items-center justify-between bg-[#080d19]">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0 border border-indigo-400/40">
              CC
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Chay Chai</div>
              <div className="text-[10px] text-slate-400 truncate">chaychai725@gmail.com</div>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            title="User Profile / Settings"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
