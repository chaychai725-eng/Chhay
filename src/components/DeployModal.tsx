import React, { useState, useEffect } from 'react';
import { X, Rocket, Check, Copy, ExternalLink, Globe, ShieldCheck, Server } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../types';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [stage, setStage] = useState<'deploying' | 'success' | 'error'>('deploying');
  const [deployedUrl, setDeployedUrl] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setStage('deploying');
    setErrorMessage('');

    const runDeploy = async () => {
      try {
        const response = await fetch('/api/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: project.title,
            html: project.html,
            css: project.css,
            js: project.js,
          }),
        });

        if (!response.ok) {
          throw new Error('Deployment request failed with status ' + response.status);
        }

        const data = await response.json();
        if (isMounted) {
          const fullUrl = `${window.location.origin}${data.previewUrl}`;
          setDeployedUrl(fullUrl);
          setStage('success');
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } catch (err: any) {
        if (isMounted) {
          setStage('error');
          setErrorMessage(err?.message || 'Deployment service unavailable.');
        }
      }
    };

    runDeploy();

    return () => {
      isMounted = false;
    };
  }, [isOpen, project.html, project.css, project.js, project.title]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!deployedUrl) return;
    await navigator.clipboard.writeText(deployedUrl);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'deploying' && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
              <Rocket className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-white">Deploying to Live Cloud...</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Assembling production bundles, configuring edge routing, and verifying responsive assets.
            </p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-pulse"></div>
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="space-y-6 pt-2">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Website Live & Published!</h3>
              <p className="text-xs text-slate-400">
                Your project is deployed on the QuantYield live preview network.
              </p>
            </div>

            {/* Live URL Container */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Public Live Link</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">STATUS: ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={deployedUrl}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all shrink-0 flex items-center space-x-1"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  <span>{hasCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center border-t border-slate-800/80 pt-4">
              To host under your custom domain (e.g. yourcompany.com), download the ZIP bundle and connect it to Google Cloud Run, Vercel, or GitHub Pages.
            </div>
          </div>
        )}

        {stage === 'error' && (
          <div className="text-center py-6 space-y-4">
            <h3 className="text-lg font-bold text-rose-400">Deployment Notice</h3>
            <p className="text-xs text-slate-400">{errorMessage}</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
