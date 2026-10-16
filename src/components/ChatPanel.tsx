import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Square,
  Upload,
  LayoutGrid,
  CheckCircle2,
  Eye,
  Code2,
  MessageSquare,
  AlertTriangle,
  Globe,
  HelpCircle,
  ChevronDown,
  Plus,
  History,
  Bot,
  Lightbulb,
  Palette,
  Smartphone,
  Check
} from 'lucide-react';
import { ChatMessage, ApiStatus } from '../types';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onStopGeneration?: () => void;
  onSelectAction: (action: 'preview' | 'code' | 'refine' | 'template', param?: string) => void;
  onOpenTemplates: () => void;
  onNewChat?: () => void;
  onOpenHistory?: () => void;
  historyCount?: number;
  apiStatus: ApiStatus | null;
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onStopGeneration,
  onSelectAction,
  onOpenTemplates,
  onNewChat,
  onOpenHistory,
  historyCount = 0,
  apiStatus,
  selectedModel,
  onSelectModel,
}) => {
  const [inputText, setInputText] = useState('');
  const [languageMode, setLanguageMode] = useState<'en' | 'km'>('km'); // Default friendly Khmer
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setInputText((prev) => 
            (prev ? prev + '\n\n' : '') + 
            `Design reference file attached (${file.name}):\n${content.slice(0, 1000)}...`
          );
        }
      };
      if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else {
        setInputText((prev) => 
          (prev ? prev + '\n\n' : '') + 
          `Please build a website inspired by uploaded design asset: ${file.name}`
        );
      }
    }
  };

  const khmerSuggestions = [
    '👋 សួស្តី! តើអ្នកសុខសប្បាយទេ?',
    '☕ បង្កើតគេហទំព័រសម្រាប់ហាងកាហ្វេទំនើប',
    '🛍️ បង្កើតហាងទំនិញអេឡិចត្រូនិក Online',
    '👨‍💻 បង្កើតគេហទំព័រ Portfolio IT Developer',
    '🏢 បង្កើតគេហទំព័រក្រុមហ៊ុនអាជីវកម្ម',
    '🎨 ប្តូរពណ៌ Hero Section ទៅជាពណ៌ខៀវចាស់'
  ];

  const englishSuggestions = [
    '👋 Hello! What can you help me build?',
    '☕ Build a modern coffee shop website',
    '🛍️ Create an online electronics store',
    '👨‍💻 Create a portfolio website for a developer',
    '🏢 Build a corporate business landing page',
    '🎨 Make the hero section darker with an animated gradient'
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0b101d] h-full overflow-hidden select-none border-r border-slate-800/80">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/60 shrink-0 bg-[#080d19]/80 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <span>QuantYield AI Builder</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                Friendly AI
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {languageMode === 'en'
                ? 'Chat naturally to design websites, ask questions, or request refinements.'
                : 'ជជែកសាកសួរ និងពិពណ៌នាពីគេហទំព័ររបស់អ្នកជាភាសាខ្មែរ ឬអង់គ្លេស។'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* New Chat Button */}
            {onNewChat && (
              <button
                type="button"
                onClick={onNewChat}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                title="ចាប់ផ្តើម New Chat ថ្មី"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Chat</span>
              </button>
            )}

            {/* History Button */}
            {onOpenHistory && (
              <button
                type="button"
                onClick={onOpenHistory}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                title="មើលប្រវត្តិការសន្ទនា និងគេហទំព័រ"
              >
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>ប្រវត្តិ ({historyCount})</span>
              </button>
            )}

            {/* Language Mode Pill */}
            <div className="flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
              <button
                onClick={() => setLanguageMode('km')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  languageMode === 'km'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ភាសាខ្មែរ
              </button>
              <button
                onClick={() => setLanguageMode('en')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  languageMode === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* API Key Not Configured Alert Notice */}
        {apiStatus && !apiStatus.configured && (
          <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Smart Demo Mode:</span> ម៉ាស៊ីនឆ្លាតវៃ QuantYield ដំណើរការជូនលោកអ្នកភ្លាមៗ! លោកអ្នកអាចជជែកលេង បង្កើតគេហទំព័រ និងទាញយកកូដបានគ្រប់ពេល។
            </div>
          </div>
        )}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0 mt-0.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-500"></div>
                </div>
                <div className="flex-1 bg-[#12192b] border border-slate-800/80 rounded-2xl p-4 text-slate-200 text-sm leading-relaxed shadow-sm">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.sender === 'ai') {
            const isChatMode = msg.isConversational || msg.type === 'chat';

            return (
              <div key={msg.id} className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-400 p-[1px] flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 mt-0.5">
                  <div className="w-full h-full bg-[#0d1424] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                <div className="flex-1 bg-[#111728] border border-slate-800/90 rounded-2xl p-5 text-slate-200 text-sm leading-relaxed shadow-lg">
                  {/* Friendly Message Header Badge */}
                  <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-800/70">
                    <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>QuantYield Assistant</span>
                    </span>
                    {isChatMode ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        ឆ្លើយតបរួសរាយ (Friendly Chat)
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        បង្កើតគេហទំព័រជោគជ័យ (Website Created)
                      </span>
                    )}
                  </div>

                  {/* Message body */}
                  <div className="text-xs sm:text-sm text-slate-300 space-y-3">
                    <p className="font-normal text-slate-200 whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </p>

                    {/* Dedicated Khmer Highlights Section */}
                    {((msg.khmerHighlights && msg.khmerHighlights.length > 0) || msg.summaryKhmer) && !isChatMode && (
                      <div className="mt-3 p-4 rounded-xl bg-[#0d1424] border border-emerald-500/30 shadow-inner">
                        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>ចំណុចសំខាន់ៗនៃគេហទំព័រដែលបានបង្កើត (Website Highlights & Features)</span>
                        </div>

                        {msg.summaryKhmer && (
                          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                            {msg.summaryKhmer}
                          </p>
                        )}

                        {msg.khmerHighlights && msg.khmerHighlights.length > 0 && (
                          <div className="space-y-2">
                            {msg.khmerHighlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"></span>
                                <span className="leading-relaxed">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Standard Summary Bullets if present and not in khmerHighlights */}
                    {msg.summaryBullets && msg.summaryBullets.length > 0 && (!msg.khmerHighlights || msg.khmerHighlights.length === 0) && (
                      <div className="pt-2 pb-1 space-y-1.5">
                        <div className="font-semibold text-slate-200 text-xs">ចំណុចលេចធ្លោ:</div>
                        <ul className="space-y-1.5 pl-0 list-none">
                          {msg.summaryBullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  {!isChatMode && (
                    <div className="pt-4 mt-4 border-t border-slate-800 flex flex-wrap gap-2">
                      <button
                        onClick={() => onSelectAction('preview')}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>មើលការបង្ហាញ (Preview)</span>
                      </button>

                      <button
                        onClick={() => onSelectAction('code')}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                      >
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>មើលកូដ (Code)</span>
                      </button>

                      <button
                        onClick={() => {
                          const input = document.getElementById('chatInputTextarea');
                          input?.focus();
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                        <span>កែសម្រួលបន្ថែម</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // System message
          return (
            <div key={msg.id} className="text-center py-2 text-xs text-slate-500">
              {msg.text}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3.5 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0d1424] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div className="bg-[#111728] border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span>QuantYield AI កំពុងដំណើរការ និងរៀបចំកូដគេហទំព័រជូនលោកអ្នក...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="px-4 sm:px-5 py-2.5 overflow-x-auto whitespace-nowrap flex space-x-2 shrink-0 border-t border-slate-800/40 bg-[#090e1b]">
        {(languageMode === 'en' ? englishSuggestions : khmerSuggestions).map((sug, i) => (
          <button
            key={i}
            onClick={() => setInputText(sug)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all shrink-0 shadow-sm"
          >
            + {sug}
          </button>
        ))}
      </div>

      {/* Input Box Area */}
      <div className="p-4 border-t border-slate-800/80 bg-[#090e1b] shrink-0">
        <form onSubmit={handleSubmit} className="relative rounded-2xl bg-[#111728] border border-slate-700/80 p-3 shadow-lg focus-within:border-indigo-500/80 transition-colors">
          <textarea
            id="chatInputTextarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              languageMode === 'en'
                ? 'Ask a question, say hello, or describe your website... (e.g. "Build a coffee shop website" or "Make the hero darker")'
                : 'សួរសំណួរ, និយាយលេង, ឬពិពណ៌នាពីគេហទំព័រដែលចង់បាន... (ឧ. "សួស្តី!", "បង្កើតគេហទំព័រហាងកាហ្វេ" ឬ "ប្តូរពណ៌ Hero")'
            }
            rows={3}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 resize-none focus:outline-none custom-scrollbar leading-relaxed"
          />

          {/* Action Toolbar Inside Box */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-2">
            <div className="flex items-center space-x-2">
              {/* Templates Button */}
              <button
                type="button"
                onClick={onOpenTemplates}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Templates</span>
              </button>

              {/* Upload Reference Asset */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".txt,.md,.json,.html,.css"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
                title="ភ្ជាប់ឯកសារពិពណ៌នា / Attach file"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {isLoading ? (
                <button
                  type="button"
                  onClick={onStopGeneration}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>បញ្ឈប់ (Stop)</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    inputText.trim()
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <span>ផ្ញើ (Send)</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
