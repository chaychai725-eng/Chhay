import React from 'react';
import { X, FolderOpen, Trash2, Download, ArrowRight, Plus } from 'lucide-react';
import { Project } from '../types';
import { exportProjectToZip } from '../utils/zipExporter';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  projects,
  activeProjectId,
  onSelectProject,
  onDeleteProject,
  onNewProject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0a0f1d]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">My Saved Projects</h2>
              <p className="text-xs text-slate-400">All websites created or saved in your browser session.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onNewProject();
                onClose();
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No saved projects yet. Click "Save Project" in the top bar to save your current work!
            </div>
          ) : (
            projects.map((proj) => {
              const isActive = proj.id === activeProjectId;
              return (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white truncate">{proj.title}</h3>
                      {isActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold">
                          Active
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {proj.description || 'No description'}
                    </p>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono">
                      Updated {new Date(proj.updatedAt || proj.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => exportProjectToZip(proj)}
                      title="Download ZIP"
                      className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      title="Delete Project"
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
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
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
