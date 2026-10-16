import React, { useState, useEffect, useRef } from 'react';
import {
  Eye,
  Code2,
  FolderTree,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  Copy,
  Check,
  Download,
  RotateCw,
  FileCode,
  FileText,
  Play,
  Maximize2
} from 'lucide-react';
import { Project, DeviceMode, ActiveTab, CodeSubTab } from '../types';
import { exportProjectToZip } from '../utils/zipExporter';

interface RightWorkspaceProps {
  project: Project;
  onUpdateProjectCode: (html: string, css: string, js: string) => void;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onDeploy: () => void;
}

export const RightWorkspace: React.FC<RightWorkspaceProps> = ({
  project,
  onUpdateProjectCode,
  activeTab,
  onChangeTab,
  onDeploy,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [codeSubTab, setCodeSubTab] = useState<CodeSubTab>('html');
  const [hasCopied, setHasCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  
  // Local code editor state
  const [editableHtml, setEditableHtml] = useState(project.html);
  const [editableCss, setEditableCss] = useState(project.css);
  const [editableJs, setEditableJs] = useState(project.js);
  const [hasUnsavedCode, setHasUnsavedCode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('index.html');

  useEffect(() => {
    setEditableHtml(project.html);
    setEditableCss(project.css);
    setEditableJs(project.js);
    setHasUnsavedCode(false);
    setIframeKey((k) => k + 1);
  }, [project.html, project.css, project.js, project.id]);

  const handleApplyCode = () => {
    onUpdateProjectCode(editableHtml, editableCss, editableJs);
    setHasUnsavedCode(false);
    setIframeKey((k) => k + 1);
  };

  const handleCopyCode = async () => {
    let textToCopy = '';
    if (codeSubTab === 'html') textToCopy = editableHtml;
    else if (codeSubTab === 'css') textToCopy = editableCss;
    else if (codeSubTab === 'js') textToCopy = editableJs;

    await navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    exportProjectToZip({
      ...project,
      html: editableHtml,
      css: editableCss,
      js: editableJs,
    });
  };

  // Build sandboxed HTML payload for iframe
  const buildSandboxSrcDoc = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.title || 'Preview'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif; margin: 0; padding: 0; }
    ${editableCss}
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${editableHtml}
  <script>
    try {
      ${editableJs}
    } catch(err) {
      console.warn("QuantYield Sandbox Script Notice:", err);
    }
  </script>
</body>
</html>`;
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([buildSandboxSrcDoc()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#080d19] h-full overflow-hidden select-none">
      {/* Top Bar with Navigation Tabs & Device Selectors */}
      <div className="h-14 border-b border-slate-800/80 px-5 flex items-center justify-between shrink-0 bg-[#090e1b]">
        {/* Tabs: Preview | Code | Files */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => onChangeTab('preview')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => onChangeTab('code')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Code</span>
          </button>

          <button
            onClick={() => onChangeTab('files')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5 text-amber-400" />
            <span>Files</span>
          </button>
        </div>

        {/* Device Switcher (Mobile | Tablet | Desktop) */}
        <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile (375px)"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              deviceMode === 'mobile' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet (768px)"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              deviceMode === 'tablet' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop (100%)"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              deviceMode === 'desktop' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Browser Address Bar */}
      <div className="px-5 py-2.5 bg-[#0b101d] border-b border-slate-800/80 flex items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex items-center space-x-2.5 px-3.5 py-1.5 bg-slate-950/90 rounded-xl border border-slate-800/90 text-xs text-slate-400 font-mono overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
          <span className="text-slate-300">https://</span>
          <span className="text-cyan-300 font-semibold truncate">
            quantyield-ai-builder.preview.app/{project.category || 'site'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            title="Reload sandbox preview"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenInNewTab}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* PREVIEW VIEW */}
        {activeTab === 'preview' && (
          <div className="flex-1 bg-[#050811] flex items-center justify-center p-3 sm:p-5 overflow-auto custom-scrollbar">
            <div
              className={`h-full bg-slate-950 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl border border-slate-800/80 flex flex-col ${
                deviceMode === 'mobile'
                  ? 'w-[375px] max-h-[720px] ring-8 ring-slate-900 rounded-[36px]'
                  : deviceMode === 'tablet'
                  ? 'w-[768px] max-h-[920px] ring-8 ring-slate-900 rounded-[28px]'
                  : 'w-full h-full'
              }`}
            >
              <iframe
                key={iframeKey}
                title="QuantYield AI Sandbox"
                srcDoc={buildSandboxSrcDoc()}
                sandbox="allow-scripts allow-forms allow-modals allow-same-origin"
                className="w-full h-full border-0 bg-slate-950"
              />
            </div>
          </div>
        )}

        {/* CODE VIEW */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col bg-[#070b14] overflow-hidden">
            {/* Code Sub Tabs & Actions */}
            <div className="px-5 py-2.5 border-b border-slate-800/80 bg-[#090e1b] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCodeSubTab('html')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    codeSubTab === 'html'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setCodeSubTab('css')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    codeSubTab === 'css'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setCodeSubTab('js')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    codeSubTab === 'js'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  JavaScript
                </button>
              </div>

              <div className="flex items-center space-x-2.5">
                {hasUnsavedCode && (
                  <button
                    onClick={handleApplyCode}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/30"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Apply to Preview</span>
                  </button>
                )}

                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadZip}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZIP</span>
                </button>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 flex overflow-hidden font-mono text-xs">
              {/* Line Numbers Simulation */}
              <div className="w-12 bg-[#050811] py-4 select-none text-right pr-3 text-slate-400 font-mono border-r border-slate-900 overflow-hidden shrink-0">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="leading-6">{i + 1}</div>
                ))}
              </div>

              {/* Editable Code Textarea */}
              <div className="flex-1 h-full bg-[#070b14] relative">
                {codeSubTab === 'html' && (
                  <textarea
                    value={editableHtml}
                    onChange={(e) => {
                      setEditableHtml(e.target.value);
                      setHasUnsavedCode(true);
                    }}
                    className="w-full h-full p-4 bg-transparent text-emerald-300 font-mono text-xs leading-6 resize-none focus:outline-none custom-scrollbar selection:bg-cyan-500/30 selection:text-white"
                    spellCheck={false}
                  />
                )}
                {codeSubTab === 'css' && (
                  <textarea
                    value={editableCss}
                    onChange={(e) => {
                      setEditableCss(e.target.value);
                      setHasUnsavedCode(true);
                    }}
                    className="w-full h-full p-4 bg-transparent text-cyan-300 font-mono text-xs leading-6 resize-none focus:outline-none custom-scrollbar selection:bg-cyan-500/30 selection:text-white"
                    spellCheck={false}
                  />
                )}
                {codeSubTab === 'js' && (
                  <textarea
                    value={editableJs}
                    onChange={(e) => {
                      setEditableJs(e.target.value);
                      setHasUnsavedCode(true);
                    }}
                    className="w-full h-full p-4 bg-transparent text-amber-300 font-mono text-xs leading-6 resize-none focus:outline-none custom-scrollbar selection:bg-cyan-500/30 selection:text-white"
                    spellCheck={false}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* FILES BROWSER VIEW */}
        {activeTab === 'files' && (
          <div className="flex-1 flex bg-[#070b14] overflow-hidden">
            {/* File Tree Left Column */}
            <div className="w-60 border-r border-slate-800/80 bg-[#090e1b] p-4 flex flex-col justify-between shrink-0">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Project Workspace
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedFile('index.html')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedFile === 'index.html'
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span>index.html</span>
                  </button>

                  <button
                    onClick={() => setSelectedFile('styles.css')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedFile === 'styles.css'
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span>styles.css</span>
                  </button>

                  <button
                    onClick={() => setSelectedFile('script.js')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedFile === 'script.js'
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <FileCode className="w-4 h-4 text-amber-400" />
                    <span>script.js</span>
                  </button>

                  <button
                    onClick={() => setSelectedFile('package.json')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedFile === 'package.json'
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>package.json</span>
                  </button>

                  <button
                    onClick={() => setSelectedFile('README.md')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedFile === 'README.md'
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>README.md</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleDownloadZip}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All Files (.zip)</span>
                </button>
              </div>
            </div>

            {/* File Viewer Right Column */}
            <div className="flex-1 flex flex-col bg-[#070b14] overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800/80 bg-[#090e1b] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{selectedFile}</span>
                <span className="text-[11px] text-slate-400">UTF-8 &bull; Read / Edit</span>
              </div>
              <div className="flex-1 p-5 overflow-auto custom-scrollbar font-mono text-xs leading-6 text-slate-300 bg-[#070b14]">
                {selectedFile === 'index.html' && <pre className="text-emerald-300 whitespace-pre-wrap">{editableHtml}</pre>}
                {selectedFile === 'styles.css' && <pre className="text-cyan-300 whitespace-pre-wrap">{editableCss}</pre>}
                {selectedFile === 'script.js' && <pre className="text-amber-300 whitespace-pre-wrap">{editableJs}</pre>}
                {selectedFile === 'package.json' && (
                  <pre className="text-purple-300 whitespace-pre-wrap">
{JSON.stringify({
  name: (project.title || 'site').toLowerCase().replace(/[^a-z0-9]/g, '-'),
  version: '1.0.0',
  description: project.description || 'Built with QuantYield AI Builder',
  scripts: {
    start: 'npx serve .'
  }
}, null, 2)}
                  </pre>
                )}
                {selectedFile === 'README.md' && (
                  <pre className="text-blue-300 whitespace-pre-wrap">
# {project.title}

{project.description}

## Generated Files
- \`index.html\`: Core semantic HTML and layout
- \`styles.css\`: Design styling & animations
- \`script.js\`: Frontend interactivity
- \`package.json\`: Manifest & runner scripts

## Run Locally
\`\`\`bash
npx serve .
\`\`\`
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
