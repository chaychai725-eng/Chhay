import React from 'react';
import { X, Settings, ShieldCheck, Key, Cpu, HelpCircle, RefreshCw } from 'lucide-react';
import { ApiStatus } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiStatus: ApiStatus | null;
  onCheckStatus: () => void;
  selectedModel: string;
  onSelectModel: (m: string) => void;
  onClearCache: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiStatus,
  onCheckStatus,
  selectedModel,
  onSelectModel,
  onClearCache,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Platform Settings</h2>
              <p className="text-xs text-slate-400">QuantYield AI Builder configuration & status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* AI Backend Status */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-300 flex items-center space-x-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span>Gemini API Backend</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  apiStatus?.configured
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {apiStatus?.configured ? 'CONNECTED' : 'NOT CONFIGURED (DEMO MODE)'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {apiStatus?.configured
                ? 'Your Gemini API key is securely attached on the server side. Real-time website code generation and conversational editing are active.'
                : 'The application is running in interactive Demo Mode. You can fully explore all starter templates, edit HTML/CSS/JS, test previews, and export zip bundles. To enable live AI generation, attach GEMINI_API_KEY in the AI Studio Secrets panel.'}
            </p>

            <button
              onClick={onCheckStatus}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-semibold pt-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh connection status</span>
            </button>
          </div>

          {/* Model Selection */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Default AI Model</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onSelectModel('gemini-3.8-flash')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedModel === 'gemini-3.8-flash'
                    ? 'bg-indigo-950/60 border-indigo-500/60 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Gemini 3.8 Flash</div>
                <div className="text-[10px] text-cyan-400 mt-1">Recommended &bull; Fast</div>
              </button>

              <button
                onClick={() => onSelectModel('gemini-flash-latest')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedModel === 'gemini-flash-latest'
                    ? 'bg-indigo-950/60 border-indigo-500/60 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Gemini Flash Latest</div>
                <div className="text-[10px] text-slate-400 mt-1">Standard Stable</div>
              </button>
            </div>
          </div>

          {/* Languages supported */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="font-semibold text-slate-300">Prompt Languages Supported</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Full native support for both English and Khmer (ភាសាខ្មែរ). You can describe layouts, change requests, or business requirements in Khmer and get tailored bilingual or Khmer content.
            </p>
          </div>

          {/* Reset Action */}
          <div className="pt-2 flex justify-between items-center">
            <button
              onClick={onClearCache}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              Reset local session data
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
