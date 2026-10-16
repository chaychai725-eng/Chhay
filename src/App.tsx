import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ChatPanel } from './components/ChatPanel';
import { RightWorkspace } from './components/RightWorkspace';
import { AdminPortal } from './components/AdminPortal';
import { AdminPasscodeModal } from './components/AdminPasscodeModal';
import { AuthModal } from './components/AuthModal';
import { TemplatesModal } from './components/TemplatesModal';
import { DeployModal } from './components/DeployModal';
import { ProjectsModal } from './components/ProjectsModal';
import { HistoryModal } from './components/HistoryModal';
import { SettingsModal } from './components/SettingsModal';
import { STARTER_TEMPLATES } from './data/templates';
import { Project, ChatMessage, ActiveTab, ApiStatus, TemplateDefinition, AppUser, ChatSession } from './types';
import { MessageSquare, Eye, Code2, ShieldCheck, Plus, History } from 'lucide-react';

const STORAGE_KEY_PROJECTS = 'quantyield_saved_projects_v1';
const STORAGE_KEY_CURRENT = 'quantyield_current_project_v1';
const STORAGE_KEY_USER = 'quantyield_auth_user_v1';
const STORAGE_KEY_SESSIONS = 'quantyield_chat_sessions_v2';

export default function App() {
  const defaultTemplate = STARTER_TEMPLATES[0]; // QuantYield Global Business

  // Primary Project State
  const [currentProject, setCurrentProject] = useState<Project>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached project:', e);
    }
    return {
      ...defaultTemplate.project,
      id: 'proj-' + Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
  });

  const [savedProjects, setSavedProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved projects:', e);
    }
    return [];
  });

  // Current authenticated user (Default to pre-approved Chay Chai)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user session:', e);
    }
    return {
      id: 'user-admin-chaychai',
      email: 'chaychai725@gmail.com',
      name: 'Chay Chai',
      status: 'APPROVED',
      role: 'admin',
      registeredAt: Date.now() - 86400000,
    };
  });

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Create a modern business website for QuantYield Global. It should have a hero section, about us, services, features, testimonials, and contact page. Use a clean, professional design with blue and green colors.',
      timestamp: Date.now() - 60000,
    },
    {
      id: 'msg-2',
      sender: 'ai',
      type: 'build',
      text: "I've created your website for QuantYield Global! 🎉",
      timestamp: Date.now() - 30000,
      summaryKhmer: 'គេហទំព័រ QuantYield Global ត្រូវបានបង្កើតឡើងយ៉ាងយកចិត្តទុកដាក់ ដោយរួមបញ្ចូលនូវ Hero Section, Services, Testimonials, និង Contact Form ដំណើរការបានយ៉ាងរលូន។',
      khmerHighlights: [
        '🎯 គោលបំណង: គេហទំព័រក្រុមហ៊ុនបច្ចេកវិទ្យា និងយុទ្ធសាស្ត្រ AI សកល',
        '📱 Responsive Design: ដំណើរការយ៉ាងរលូនលើទូរស័ព្ទ (iPhone) និងកុំព្យូទ័រ',
        '🎨 ការរចនាទំនើប: ប្រើប្រាស់ Tailwind CSS ជាមួយ Color Palette ពណ៌ខៀវ និងបៃតងស្រស់ស្អាត',
        '⚡ មុខងារអន្តរកម្ម: មាន Menu Navigation, ប៊ូតុង Call to Action, និង Form ផ្ញើសារពិតៗ',
        '🚀 ភាពបត់បែន: អាចកែសម្រួលកូដក្នុង Code tab ឬទាញយកជា ZIP បានភ្លាមៗ'
      ],
      summaryBullets: [
        'Modern, responsive design for desktop and mobile',
        'Sections: Home, About, Services, Features, Testimonials, Contact',
        'Clean and professional UI/UX with Tailwind CSS',
        'Full source code editable in Code tab',
      ],
    },
  ]);

  // Persistent Chat Sessions History
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read chat sessions:', e);
    }
    // Seed initial session
    return [
      {
        id: 'session-seed-1',
        title: 'QuantYield Global Official',
        createdAt: Date.now() - 60000,
        updatedAt: Date.now() - 30000,
        messages: [
          {
            id: 'msg-1',
            sender: 'user',
            text: 'Create a modern business website for QuantYield Global. It should have a hero section, about us, services, features, testimonials, and contact page. Use a clean, professional design with blue and green colors.',
            timestamp: Date.now() - 60000,
          },
          {
            id: 'msg-2',
            sender: 'ai',
            type: 'build',
            text: "I've created your website for QuantYield Global! 🎉",
            timestamp: Date.now() - 30000,
            summaryKhmer: 'គេហទំព័រ QuantYield Global ត្រូវបានបង្កើតឡើងយ៉ាងយកចិត្តទុកដាក់។',
            khmerHighlights: [
              '🎯 គោលបំណង: គេហទំព័រក្រុមហ៊ុនបច្ចេកវិទ្យា និងយុទ្ធសាស្ត្រ AI សកល',
              '📱 Responsive Design: ដំណើរការយ៉ាងរលូនលើទូរស័ព្ទ (iPhone) និងកុំព្យូទ័រ',
              '🎨 ការរចនាទំនើប: ប្រើប្រាស់ Tailwind CSS ជាមួយ Color Palette ពណ៌ខៀវ និងបៃតង',
            ],
          },
        ],
        project: {
          ...defaultTemplate.project,
          id: 'proj-quantyield-seed',
          createdAt: Date.now() - 60000,
          updatedAt: Date.now() - 30000,
          version: 1,
        },
        category: 'business',
      },
    ];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>('session-seed-1');

  // View state: 'studio' (AI website builder) or 'admin' (Website Admin គ្រប់គ្រង)
  const [currentView, setCurrentView] = useState<'studio' | 'admin'>('studio');
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview' | 'code' | 'admin'>('chat');

  // Admin secret passcode lock state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [isAdminPasscodeModalOpen, setIsAdminPasscodeModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // UI state
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [currentCategory, setCurrentCategory] = useState<string>('business');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Modals
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // AI Backend state
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.5-flash');
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Check API status on mount
  const checkApiStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
        if (data.model) {
          setSelectedModel(data.model);
        }
      }
    } catch (err) {
      console.error('Failed to query API status:', err);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  // Save current project state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentProject));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentProject]);

  // Save projects collection
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(savedProjects));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedProjects]);

  // Save chat sessions history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(chatSessions));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [chatSessions]);

  // Save user profile state
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  // Helper to sync current session into chatSessions
  const syncSessionToHistory = (msgs: ChatMessage[], proj: Project) => {
    setChatSessions((prev) => {
      const firstUserMsg = msgs.find((m) => m.sender === 'user');
      const title =
        proj.title && proj.title !== 'New Website Project' && proj.title !== 'Untitled Website'
          ? proj.title
          : firstUserMsg?.text.slice(0, 36) || 'ការសន្ទនាថ្មី';

      const existingIdx = prev.findIndex((s) => s.id === currentSessionId);
      const sessionItem: ChatSession = {
        id: currentSessionId,
        title,
        createdAt: existingIdx >= 0 ? prev[existingIdx].createdAt : Date.now(),
        updatedAt: Date.now(),
        messages: msgs,
        project: proj,
        category: proj.category || 'custom',
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = sessionItem;
        return copy;
      }
      return [sessionItem, ...prev];
    });
  };

  // Handle opening Admin with Secret Passcode Protection
  const handleOpenAdminTrigger = () => {
    if (currentView === 'admin') {
      setCurrentView('studio');
      setMobileTab('chat');
      return;
    }

    if (isAdminUnlocked) {
      setCurrentView('admin');
      setMobileTab('admin');
    } else {
      setIsAdminPasscodeModalOpen(true);
    }
  };

  const handleAdminPasscodeSuccess = () => {
    setIsAdminUnlocked(true);
    setIsAdminPasscodeModalOpen(false);
    setCurrentView('admin');
    setMobileTab('admin');
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    setCurrentView('studio');
    setMobileTab('chat');
  };

  // Handle Send Message
  const handleSendMessage = async (text: string) => {
    // If not approved, prompt authentication first
    if (!currentUser || currentUser.status !== 'APPROVED') {
      setIsAuthModalOpen(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    syncSessionToHistory(newMsgs, currentProject);
    setIsLoading(true);

    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          currentProject: {
            title: currentProject.title,
            html: currentProject.html,
            css: currentProject.css,
            js: currentProject.js,
          },
          instruction: text,
          model: selectedModel,
        }),
      });

      const result = await res.json();

      if (result.success && result.data) {
        const generated = result.data;
        const isChat = generated.type === 'CHAT' || (!generated.html && Boolean(generated.friendlyReply));

        let updatedProj = currentProject;
        if (!isChat && generated.html) {
          updatedProj = {
            ...currentProject,
            title: generated.title || currentProject.title,
            tagline: generated.tagline || currentProject.tagline,
            html: generated.html || currentProject.html,
            css: generated.css || currentProject.css,
            js: generated.js || currentProject.js,
            updatedAt: Date.now(),
            version: (currentProject.version || 1) + 1,
          };
          setCurrentProject(updatedProj);
        }

        const isKhmer = /[\u1780-\u17FF]/.test(text);
        const failoverNote =
          result.meta?.status === 'FAILOVER_RESOLVED'
            ? isKhmer
              ? `(តាមរយៈ ${result.meta.modelUsed})`
              : `(via ${result.meta.modelUsed})`
            : '';

        const replyContent =
          generated.friendlyReply ||
          generated.summary ||
          (isKhmer
            ? `ខ្ញុំបានកែសម្រួលគេហទំព័រជូនលោកអ្នករួចរាល់ហើយ! ${failoverNote}`
            : `I've updated your website with your changes! ${failoverNote}`);

        const aiMsg: ChatMessage = {
          id: 'msg-' + Date.now(),
          sender: 'ai',
          type: isChat ? 'chat' : 'build',
          isConversational: isChat,
          text: replyContent,
          timestamp: Date.now(),
          summaryKhmer: generated.summaryKhmer,
          khmerHighlights: generated.khmerHighlights || (isChat ? undefined : [
            '🎯 ឈ្មោះ និងគោលបំណង: គេហទំព័រ ' + (generated.title || updatedProj.title) + ' ត្រូវបានរៀបចំយ៉ាងស្រស់ស្អាត',
            '📱 Responsive Design: ដំណើរការយ៉ាងរលូនលើទូរស័ព្ទ (iPhone) និងកុំព្យូទ័រ',
            '🎨 ការរចនាបែបទំនើប Tailwind CSS ជាមួយ Color Palette សមស្រប',
            '⚡ មុខងារអន្តរកម្មដំណើរការបានពិតប្រាកដ',
            '🚀 អាចកែសម្រួលកូដ ឬទាញយក ZIP យកទៅប្រើប្រាស់បានភ្លាមៗ'
          ]),
          summaryBullets: generated.suggestedChanges || [
            isKhmer ? 'កែសម្រួលរចនាបថ និងកូដដោយជោគជ័យ' : 'Updated semantic layout and styling',
            isKhmer ? 'ដំណើរការបានស្អាតលើទូរស័ព្ទ និងកុំព្យូទ័រ' : 'Optimized for mobile and desktop viewports',
          ],
        };

        const updatedMessages = [...newMsgs, aiMsg];
        setMessages(updatedMessages);
        syncSessionToHistory(updatedMessages, updatedProj);
      } else {
        const errorMsg = result.message || 'Generation issue.';
        const errorAiMsg: ChatMessage = {
          id: 'msg-' + Date.now(),
          sender: 'ai',
          text: `⚠️ សេចក្តីជូនដំណឹង: ${errorMsg}`,
          timestamp: Date.now(),
          isError: true,
        };
        const updatedMessages = [...newMsgs, errorAiMsg];
        setMessages(updatedMessages);
        syncSessionToHistory(updatedMessages, currentProject);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        const networkAiMsg: ChatMessage = {
          id: 'msg-' + Date.now(),
          sender: 'ai',
          text: `⚠️ Network notice: ${err.message}`,
          timestamp: Date.now(),
          isError: true,
        };
        const updatedMessages = [...newMsgs, networkAiMsg];
        setMessages(updatedMessages);
        syncSessionToHistory(updatedMessages, currentProject);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopGeneration = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  const handleSelectTemplate = (template: TemplateDefinition) => {
    setCurrentCategory(template.category);
    const newProj: Project = {
      ...template.project,
      id: 'proj-' + Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    setCurrentProject(newProj);

    const templateMessages: ChatMessage[] = [
      ...messages,
      {
        id: 'msg-' + Date.now(),
        sender: 'user',
        text: template.defaultPrompt,
        timestamp: Date.now(),
      },
      {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        type: 'build',
        text: `ខ្ញុំបានផ្ទុកគំរូ ${template.title} ជូនលោកអ្នករួចរាល់ហើយ! 🎉`,
        timestamp: Date.now() + 1,
        summaryKhmer: `គំរូ ${template.title} ត្រូវបានបង្កើតឡើងជាស្រេច ជាមួយរចនាបថទំនើប និង Responsive ពេញលេញ។`,
        khmerHighlights: [
          `🎯 ប្រភេទគេហទំព័រ: ${template.title} (${template.category})`,
          '📱 សមស្របលើទូរស័ព្ទដៃ និងកុំព្យូទ័រ',
          '⚡ មាន UI Components ពេញលេញសម្រាប់តេស្តសាកល្បង',
          '💾 អាចកែសម្រួលកូដ HTML, CSS, JavaScript និងទាញយកជា ZIP បានភ្លាមៗ'
        ],
        summaryBullets: [
          'Pre-configured modern responsive layout',
          'Interactive UI components ready to test in sandbox',
          'Editable HTML, CSS, and JavaScript source files',
          'Exportable to standalone ZIP package',
        ],
      },
    ];

    setMessages(templateMessages);
    syncSessionToHistory(templateMessages, newProj);
  };

  const handleSaveProject = () => {
    setIsSaving(true);
    setSavedProjects((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === currentProject.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...currentProject, updatedAt: Date.now() };
        return copy;
      }
      return [{ ...currentProject, updatedAt: Date.now() }, ...prev];
    });

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 400);
  };

  const handleDeleteProject = (id: string) => {
    setSavedProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Start a fresh new chat and website project (New Chat feature)
  const handleNewProject = () => {
    // 1. Ensure previous session is synced if it had conversation
    if (messages.length > 0) {
      syncSessionToHistory(messages, currentProject);
    }

    // 2. Setup fresh session
    const newSessionId = 'session-' + Date.now();
    setCurrentSessionId(newSessionId);

    const blankProj: Project = {
      id: 'proj-' + Date.now(),
      title: 'New Website Project',
      tagline: 'Built with QuantYield AI Builder',
      description: 'Custom website project',
      category: 'custom',
      html: `
<div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8 text-center">
  <div class="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
  </div>
  <h1 class="text-3xl font-extrabold text-white mb-3">ត្រៀមខ្លួនបង្កើតគេហទំព័រថ្មីរបស់អ្នក</h1>
  <p class="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
    សូមពិពណ៌នាអំពីគេហទំព័រដែលអ្នកចង់បង្កើតនៅក្នុងប្រអប់ Chat ខាងឆ្វេង (ឧ. "បង្កើតគេហទំព័រសម្រាប់ហាងកាហ្វេទំនើប" ឬ "Create a modern SaaS landing page") ឬសួរសំណួរផ្សេងៗបានដោយសេរី!
  </p>
  <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
    <span>💡 គន្លឹះ: លោកអ្នកអាចជជែកលេង ឬសួរសំណួរជាមួយ AI បានគ្រប់ពេល</span>
  </div>
</div>
`,
      css: '',
      js: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    const initialMessages: ChatMessage[] = [
      {
        id: 'msg-' + Date.now(),
        sender: 'ai',
        type: 'chat',
        isConversational: true,
        text: '✨ សួស្តីបាទ! ខ្ញុំបាទគឺ QuantYield AI Builder រីករាយណាស់ដែលបានជួបលោកអ្នក! 😊🎉\n\nតើថ្ងៃនេះលោកអ្នកចង់ជជែកលេងពិភាក្សា ឬចង់ឱ្យខ្ញុំជួយបង្កើតគេហទំព័រប្រភេទណាដែរ? លោកអ្នកអាចសរសេរជាភាសាខ្មែរ ឬអង់គ្លេសបានតាមចិត្ត។\n\nឧទាហរណ៍:\n• ☕ "បង្កើតគេហទំព័រហាងកាហ្វេទំនើប"\n• 🛍️ "បង្កើតហាងទំនិញអេឡិចត្រូនិក Online"\n• 👨‍💻 "បង្កើតគេហទំព័រ Portfolio IT Developer"',
        timestamp: Date.now(),
      },
    ];

    setCurrentProject(blankProj);
    setCurrentCategory('all');
    setCurrentView('studio');
    setMobileTab('chat');
    setMessages(initialMessages);

    // Add new session immediately to history
    setChatSessions((prev) => [
      {
        id: newSessionId,
        title: 'ការសន្ទនាថ្មី (New Chat)',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: initialMessages,
        project: blankProj,
        category: 'custom',
      },
      ...prev,
    ]);
  };

  // Switch to a previous chat session from History
  const handleSelectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setCurrentProject(session.project);
    setMessages(session.messages);
    setCurrentCategory(session.category || 'all');
    setCurrentView('studio');
    setMobileTab('chat');
  };

  // Delete a chat session from History
  const handleDeleteSession = (sessionId: string) => {
    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (sessionId === currentSessionId) {
      handleNewProject();
    }
  };

  const handleUpdateProjectCode = (html: string, css: string, js: string) => {
    const updatedProj: Project = {
      ...currentProject,
      html,
      css,
      js,
      updatedAt: Date.now(),
      version: (currentProject.version || 1) + 1,
    };
    setCurrentProject(updatedProj);
    syncSessionToHistory(messages, updatedProj);
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden ${isDarkMode ? 'dark' : ''} bg-[#070b14] text-slate-100 font-sans`}>
      {/* Top Header */}
      <TopHeader
        currentProject={currentProject}
        onSaveProject={handleSaveProject}
        onDeploy={() => setIsDeployModalOpen(true)}
        onTogglePreview={() => {
          setCurrentView('studio');
          setActiveTab('preview');
          setMobileTab('preview');
        }}
        onNewChat={handleNewProject}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        historyCount={chatSessions.length}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
        onOpenAdmin={handleOpenAdminTrigger}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        isAdminActive={currentView === 'admin'}
      />

      {/* Main Content Area */}
      {currentView === 'admin' ? (
        <div className="flex-1 flex overflow-hidden">
          <AdminPortal
            onBackToStudio={() => {
              setCurrentView('studio');
              setMobileTab('chat');
            }}
            onLockAdmin={handleLockAdmin}
          />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar (Desktop) */}
          <div className="hidden lg:block shrink-0">
            <Sidebar
              currentCategory={currentCategory}
              onSelectCategory={(cat) => setCurrentCategory(cat)}
              onOpenProjects={() => setIsProjectsModalOpen(true)}
              onOpenHistory={() => setIsHistoryModalOpen(true)}
              onOpenTemplates={() => setIsTemplatesModalOpen(true)}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onOpenAdmin={handleOpenAdminTrigger}
              onSelectTemplate={handleSelectTemplate}
              onResetToNew={handleNewProject}
              savedCount={savedProjects.length}
              historyCount={chatSessions.length}
              isAdminActive={false}
            />
          </div>

          {/* Center Chat Panel (Visible on mobile if mobileTab === 'chat', or on desktop) */}
          <div className={`w-full lg:w-[480px] xl:w-[520px] shrink-0 h-full flex flex-col ${
            mobileTab !== 'chat' ? 'hidden md:flex' : 'flex'
          }`}>
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onStopGeneration={handleStopGeneration}
              onNewChat={handleNewProject}
              onOpenHistory={() => setIsHistoryModalOpen(true)}
              historyCount={chatSessions.length}
              onSelectAction={(action) => {
                if (action === 'preview') {
                  setActiveTab('preview');
                  setMobileTab('preview');
                } else if (action === 'code') {
                  setActiveTab('code');
                  setMobileTab('code');
                }
              }}
              onOpenTemplates={() => setIsTemplatesModalOpen(true)}
              apiStatus={apiStatus}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
          </div>

          {/* Right Preview & Code Workspace (Visible on mobile if mobileTab is 'preview' or 'code', or on desktop) */}
          <div className={`flex-1 h-full overflow-hidden ${
            mobileTab === 'chat' ? 'hidden md:flex' : 'flex'
          }`}>
            <RightWorkspace
              project={currentProject}
              onUpdateProjectCode={handleUpdateProjectCode}
              activeTab={mobileTab === 'code' ? 'code' : activeTab}
              onChangeTab={(tab) => {
                setActiveTab(tab);
                if (tab === 'code') setMobileTab('code');
                else if (tab === 'preview') setMobileTab('preview');
              }}
              onDeploy={() => setIsDeployModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Enhanced for iPhone / Android view) */}
      <div className="md:hidden h-14 bg-[#090e1b] border-t border-slate-800/80 px-2 flex items-center justify-around shrink-0 z-30">
        <button
          onClick={() => {
            setCurrentView('studio');
            setMobileTab('chat');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            currentView === 'studio' && mobileTab === 'chat'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>Chat (ជជែក)</span>
        </button>

        <button
          onClick={handleNewProject}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
        >
          <Plus className="w-4 h-4 mb-0.5 text-cyan-400" />
          <span>New Chat</span>
        </button>

        <button
          onClick={() => setIsHistoryModalOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <History className="w-4 h-4 mb-0.5 text-amber-400" />
          <span>ប្រវត្តិ</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('studio');
            setMobileTab('preview');
            setActiveTab('preview');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            currentView === 'studio' && mobileTab === 'preview'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 mb-0.5" />
          <span>Preview (មើល)</span>
        </button>

        <button
          onClick={handleOpenAdminTrigger}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            currentView === 'admin'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          <span>Admin</span>
        </button>
      </div>

      {/* History Modal for Chat Sessions and Saved Projects */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        sessions={chatSessions}
        activeSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onNewChat={handleNewProject}
        savedProjects={savedProjects}
        onSelectProject={(proj) => {
          setCurrentProject(proj);
          setCurrentCategory(proj.category || 'all');
        }}
        onDeleteProject={handleDeleteProject}
      />

      {/* Secret Passcode Protection Modal for Admin */}
      <AdminPasscodeModal
        isOpen={isAdminPasscodeModalOpen}
        onClose={() => setIsAdminPasscodeModalOpen(false)}
        onSuccess={handleAdminPasscodeSuccess}
      />

      {/* Authentication & User Approval Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        onLogout={() => {
          setCurrentUser(null);
          setIsAuthModalOpen(false);
        }}
      />

      {/* Modals */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        project={currentProject}
      />

      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        projects={savedProjects}
        activeProjectId={currentProject.id}
        onSelectProject={(proj) => {
          setCurrentProject(proj);
          setCurrentCategory(proj.category || 'all');
        }}
        onDeleteProject={handleDeleteProject}
        onNewProject={handleNewProject}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        apiStatus={apiStatus}
        onCheckStatus={checkApiStatus}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onClearCache={() => {
          localStorage.removeItem(STORAGE_KEY_CURRENT);
          localStorage.removeItem(STORAGE_KEY_PROJECTS);
          localStorage.removeItem(STORAGE_KEY_SESSIONS);
          setSavedProjects([]);
          setChatSessions([]);
          handleNewProject();
          setIsSettingsModalOpen(false);
        }}
      />
    </div>
  );
}
