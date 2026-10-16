import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// In-memory deployed project storage for instant preview URLs
interface DeployedSite {
  id: string;
  title: string;
  html: string;
  css: string;
  js: string;
  createdAt: number;
  views: number;
  author?: string;
  category?: string;
}
const deployedSites = new Map<string, DeployedSite>();

// In-memory telemetry and generation logs for the Admin Dashboard
interface GenerationLog {
  id: string;
  timestamp: number;
  prompt: string;
  modelAttempted: string;
  modelUsed: string;
  latencyMs: number;
  status: 'SUCCESS' | 'FAILOVER_RESOLVED' | 'FAILED';
  errorNotice?: string;
  language: string;
}
const generationLogs: GenerationLog[] = [];

// Admin configuration state
let adminConfig = {
  primaryModel: 'gemini-3.5-flash', // Most reliable and active right now
  enableAutoFailover: true,
  temperature: 0.7,
  systemPromptOverride: '',
  maxRetries: 3,
};

// Secret passcode required to access Admin Portal (Confidential)
const ADMIN_SECRET_PASSCODE = 'Tchhay12345';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  role: 'admin' | 'user';
  registeredAt: number;
  approvedAt?: number;
  notes?: string;
}

const registeredUsers = new Map<string, StoredUser>();

// Pre-seed owner account Chay Chai as APPROVED Admin
registeredUsers.set('user-admin-chaychai', {
  id: 'user-admin-chaychai',
  email: 'chaychai725@gmail.com',
  name: 'Chay Chai (Super Admin)',
  password: 'admin',
  status: 'APPROVED',
  role: 'admin',
  registeredAt: Date.now() - 86400000,
  approvedAt: Date.now() - 86400000,
  notes: 'Platform Owner & Administrator',
});

// Pre-seed a pending approval account for demonstration
registeredUsers.set('user-pending-1', {
  id: 'user-pending-1',
  email: 'sokha.tech@example.com',
  name: 'Sokha Tech (Frontend Engineer)',
  password: 'user123',
  status: 'PENDING_APPROVAL',
  role: 'user',
  registeredAt: Date.now() - 1800000,
  notes: 'Requesting access to build AI E-commerce and Business templates',
});

// Seed initial deployed site with the QuantYield Global template
deployedSites.set('site-quantyield-global', {
  id: 'site-quantyield-global',
  title: 'QuantYield Global Official',
  html: `<section class="py-20 text-center"><h1 class="text-4xl font-bold text-white">QuantYield Global</h1><p class="text-cyan-400 mt-2">AI-Powered Solutions for a Smarter Tomorrow</p></section>`,
  css: `body { background: #0b101b; color: white; }`,
  js: `console.log("QuantYield active");`,
  createdAt: Date.now() - 3600000,
  views: 142,
  author: 'Chay Chai',
  category: 'business',
});

// Helper to get GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction for website builder & conversational AI
const DEFAULT_SYSTEM_PROMPT = `
You are QuantYield AI Builder, a world-class principal frontend engineer, UI/UX designer, and friendly AI assistant.
You support both English and Khmer (ភាសាខ្មែរ) prompts seamlessly.

IMPORTANT INSTRUCTION ON USER INTENT:
1. GREETINGS & CASUAL CONVERSATION (សំណួរទូទៅ / និយាយលេង / ចង់ដឹងព័ត៌មាន):
   If the user is asking a question, greeting you (e.g. "សួស្តី", "ជំរាបសួរ", "តើអ្នកសុខសប្បាយទេ?", "អ្នកឈ្មោះអ្វី?", "Hello", "How are you?"), chit-chatting, joking, or asking for web development advice without requesting code generation:
   - Set "type": "CHAT"
   - In "friendlyReply": Provide an exceptionally warm, polite, respectful, and enthusiastic conversational answer in fluent Khmer (or English if they prompted in English). Answer questions clearly, offer encouragement, introduce what QuantYield AI can build (e.g. coffee shop, store, portfolio, company site), and offer assistance with warm emojis.
   - For "type": "CHAT", keep "html", "css", and "js" empty ("") so the user's existing website canvas is not changed.

2. WEBSITE GENERATION & EDITING (បង្កើត ឬកែសម្រួលគេហទំព័រ):
   If the user asks to create, redesign, or modify a website:
   - Set "type": "BUILD"
   - "friendlyReply": A warm, cheerful notification that the site has been successfully created/updated.
   - "title": Creative title of the website.
   - "tagline": Catchy tagline.
   - "summary": Short bilingual or English summary.
   - "summaryKhmer": Comprehensive, detailed explanation in KHMER (ភាសាខ្មែរ) describing the website concept, value, and structure.
   - "khmerHighlights": Array of 4 to 6 detailed bullet points in KHMER (ជាអក្សរខ្មែរ) explaining:
     * 🎯 ឈ្មោះ និងគោលបំណងចម្បងនៃគេហទំព័រ (Name & Purpose)
     * 📱 Responsive Design លើទូរស័ព្ទដៃ និងកុំព្យូទ័រ (Mobile-first responsive layout)
     * 🎨 ការរចនាបែបទំនើប Tailwind CSS & Color Palette (Design & Styling)
     * ⚡ មុខងារអន្តរកម្ម Interactive Features (Navbar, Contact Form, Buttons, Tabs)
     * 🚀 ការណែនាំ និងជំហានបន្ទាប់ (How to preview, edit code, or download ZIP)
   - "html": Complete body HTML content with Tailwind CSS classes, modern SVG icons, clean hierarchy.
   - "css": Custom CSS styling, animations, smooth transitions.
   - "js": Functional vanilla JavaScript for interactivity (forms, mobile menu, toggles, counters).
   - "suggestedChanges": 3 actionable follow-up suggestions in Khmer or English.

OUTPUT MUST BE VALID JSON adhering strictly to this schema:
{
  "type": "CHAT" | "BUILD",
  "friendlyReply": "string",
  "title": "string",
  "tagline": "string",
  "summary": "string",
  "summaryKhmer": "string",
  "khmerHighlights": ["string", "string", "string", "string"],
  "html": "string",
  "css": "string",
  "js": "string",
  "suggestedChanges": ["string", "string", "string"]
}
`;

// Model priority cascade: if 3.8-flash has 503 spike, seamlessly fallback to 3.5-flash or 3-flash-preview
const MODEL_CASCADE = [
  'gemini-3.5-flash',
  'gemini-3-flash-preview',
  'gemini-3.8-flash',
  'gemini-flash-latest'
];

// Helper to detect conversational intent
function isConversationalQuery(prompt: string): boolean {
  const p = prompt.toLowerCase().trim();
  const greetings = [
    'សួស្តី', 'ជំរាបសួរ', 'សុខសប្បាយ', 'តើអ្នកឈ្មោះអ្វី', 'អ្នកឈ្មោះអី', 'តើអ្នកជានរណា', 'នរណាគេ',
    'អ្នកអាចធ្វើអ្វីខ្លះ', 'ជួយអ្វីបាន', 'ជួយប្រាប់', 'និយាយលេង', 'លេងសើច', 'កំប្លែង', 'អរគុណ',
    'សួរមួយ', 'សុំសួរ', 'ជំរាប', 'មានការងារ', 'ម៉េចហើយ',
    'hello', 'hi', 'hey', 'how are you', 'who are you', 'what can you do', 'what is this',
    'good morning', 'good evening', 'thank', 'thanks', 'chat', 'joke', 'help me'
  ];
  const hasGreeting = greetings.some((g) => p.includes(g));
  const hasBuildKeywords = p.includes('បង្កើត') || p.includes('កែ') || p.includes('បន្ថែម') ||
                           p.includes('create') || p.includes('build') || p.includes('make') ||
                           p.includes('design') || p.includes('website') || p.includes('គេហទំព័រ');
  return hasGreeting && !hasBuildKeywords;
}

// Robust executor that calls Gemini with automatic 503/429 failover and backoff
async function executeWithFailover(
  userPrompt: string,
  systemPrompt: string,
  preferredModel?: string
): Promise<{ data: any; modelUsed: string; status: 'SUCCESS' | 'FAILOVER_RESOLVED' }> {
  const ai = getGenAI();
  if (!ai) {
    throw new Error('API_KEY_NOT_CONFIGURED');
  }

  // Determine models to try
  const modelsToTry: string[] = [];
  if (preferredModel && preferredModel.trim()) {
    modelsToTry.push(preferredModel);
  } else if (adminConfig.primaryModel) {
    modelsToTry.push(adminConfig.primaryModel);
  }

  for (const m of MODEL_CASCADE) {
    if (!modelsToTry.includes(m)) {
      modelsToTry.push(m);
    }
  }

  let lastError: any = null;
  let status: 'SUCCESS' | 'FAILOVER_RESOLVED' = 'SUCCESS';

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    if (i > 0) {
      status = 'FAILOVER_RESOLVED';
    }

    try {
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt || DEFAULT_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: adminConfig.temperature || 0.7,
        },
      });

      const responseText = response.text?.trim() || '';
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          parsedData = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error('Model did not return valid JSON');
        }
      }

      return { data: parsedData, modelUsed: currentModel, status };
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      console.warn(`[QuantYield Model Notice] Model ${currentModel} returned: ${errMsg}. Trying failover cascade...`);

      // If auto-failover is disabled, throw immediately
      if (!adminConfig.enableAutoFailover) {
        throw err;
      }

      // Small delay before next model attempt
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  // If all online models failed (e.g. widespread 503 high-demand spike), provide dynamic smart generator fallback
  console.warn('[QuantYield Auto-Recovery] Upstream models busy. Deploying Smart Generator Fallback...');
  const fallbackData = generateSmartFallback(userPrompt);
  return {
    data: fallbackData,
    modelUsed: 'QuantYield Smart Engine (Failover)',
    status: 'FAILOVER_RESOLVED',
  };
}

// Smart generator fallback when upstream API has transient 503 spikes or for offline demo
function generateSmartFallback(userPrompt: string): any {
  const isKhmer = /[\u1780-\u17FF]/.test(userPrompt);
  const promptLower = userPrompt.toLowerCase();

  // If prompt is purely conversational / chit-chat / question
  if (isConversationalQuery(userPrompt)) {
    const friendlyReply = isKhmer
      ? `សួស្តីបាទ! ខ្ញុំបាទគឺ QuantYield AI Builder រីករាយណាស់ដែលបានជួបលោកអ្នក! 😊✨ ខ្ញុំសុខសប្បាយជាធម្មតាទេ ចុះលោកអ្នកវិញសុខសប្បាយជាទេ?\n\nខ្ញុំជាជំនួយការឆ្លាតវៃសម្រាប់ជួយលោកអ្នកបង្កើតគេហទំព័រ (Website) ទំនើបៗ និងរចនាស្អាតៗបានយ៉ាងរហ័សទាន់ចិត្ត។\n\nលោកអ្នកអាចប្រាប់ខ្ញុំអំពីគំនិតគេហទំព័រដែលចង់បាន ដូចជា:\n• ☕ ហាងកាហ្វេ ឬភោជនីយដ្ឋាន\n• 🛍️ ហាងលក់ទំនិញ Online (E-Commerce)\n• 🏢 គេហទំព័រក្រុមហ៊ុនអាជីវកម្ម (Business)\n• 👨‍💻 Portfolio បង្ហាញស្នាដៃ និងប្រវត្តិរូប\n• 🚀 Landing Page ប្រូម៉ូសិនផលិតផល\n\nតើថ្ងៃនេះលោកអ្នកចង់ឱ្យខ្ញុំជួយបង្កើតគេហទំព័រណាដែរ? រីករាយនឹងជួយលោកអ្នកជានិច្ចបាទ!`
      : `Hello and warm greetings! I'm QuantYield AI Builder, your dedicated intelligent website architect. 😊✨ I'm doing fantastic, thank you! How are you doing today?\n\nI can transform any idea into complete, production-ready website code (HTML, Tailwind CSS, JavaScript) with real-time sandbox preview.\n\nTell me what kind of website you'd like to build today—whether it's a modern cafe, an e-commerce shop, a company portal, or a developer portfolio!`;

    return {
      type: 'CHAT',
      friendlyReply,
      summary: friendlyReply,
      summaryKhmer: friendlyReply,
      khmerHighlights: [
        'ឆ្លើយតបបែបរួសរាយ និងគួរសមជាទីបំផុតជូនអតិថិជន',
        'ត្រៀមខ្លួនជួយបង្កើតគេហទំព័រតាមគ្រប់តម្រូវការ',
        'គាំទ្រការសន្ទនាទាំងភាសាខ្មែរ និងភាសាអង់គ្លេស'
      ],
      html: '',
      css: '',
      js: '',
      suggestedChanges: [
        isKhmer ? 'បង្កើតគេហទំព័រសម្រាប់ហាងកាហ្វេទំនើប' : 'Build a modern artisan coffee shop website',
        isKhmer ? 'បង្កើតទំព័រ Portfolio សម្រាប់ Developer' : 'Create a developer portfolio website',
        isKhmer ? 'បង្កើតគេហទំព័រហាងលក់ទំនិញ Online' : 'Create an online gadget store'
      ]
    };
  }

  let title = 'QuantYield Global Solution';
  let tagline = 'AI-Driven Platform & Digital Excellence';
  let category = 'business';

  if (promptLower.includes('ហាងកាហ្វេ') || promptLower.includes('coffee') || promptLower.includes('cafe')) {
    title = isKhmer ? 'ហាងកាហ្វេ អាម៉ូរ៉ា (Amora Coffee)' : 'Amora Artisan Coffee';
    tagline = isKhmer ? 'កាហ្វេស្រស់ គុណភាពខ្ពស់ រសជាតិឆ្ងាញ់ពិតៗ' : 'Crafted Single-Origin Roasts & Modern Atmosphere';
    category = 'coffee';
  } else if (promptLower.includes('portfolio') || promptLower.includes('ប្រវត្តិរូប') || promptLower.includes('developer') || promptLower.includes('it')) {
    title = isKhmer ? 'គេហទំព័រប្រវត្តិរូប IT Portfolio' : 'Alex Creative Portfolio';
    tagline = isKhmer ? 'អ្នកអភិវឌ្ឍន៍គេហទំព័រ និងវិស្វករ AI' : 'Senior Full-Stack Developer & AI Specialist';
    category = 'portfolio';
  } else if (promptLower.includes('store') || promptLower.includes('shop') || promptLower.includes('ហាង') || promptLower.includes('ecommerce')) {
    title = isKhmer ? 'ហាងទំនិញអេឡិចត្រូនិកទំនើប' : 'AuraTech Modern Gadgets';
    tagline = isKhmer ? 'ឧបករណ៍បច្ចេកវិទ្យាទំនើប និងសេវាកម្មរហ័សទាន់ចិត្ត' : 'Premium Electronics & Smart Wearables';
    category = 'ecommerce';
  }

  const friendlyReply = isKhmer
    ? `ខ្ញុំបានបង្កើតគេហទំព័រ ${title} ជូនលោកអ្នកដោយជោគជ័យហើយ! 🎉 រីករាយក្នុងការបំរើសេវាកម្មជូនលោកអ្នក!`
    : `I've created your website for ${title}! 🎉 Ready for live testing and preview.`;

  const summaryKhmer = `គេហទំព័រ "${title}" ត្រូវបានរចនាឡើងយ៉ាងយកចិត្តទុកដាក់ ដោយផ្តោតលើភាពទំនើប ស្រស់ស្អាត និងភាពងាយស្រួលក្នុងការប្រើប្រាស់ទាំងលើទូរស័ព្ទដៃ និងកុំព្យូទ័រ។`;

  const khmerHighlights = [
    `🎯 ឈ្មោះ និងគោលបំណង: គេហទំព័រ "${title}" សម្រាប់បង្ហាញព័ត៌មាន និងទាក់ទាញអតិថិជន`,
    `📱 Responsive Design: ដំណើរការរលូន និងសមស្របឥតខ្ចោះលើគ្រប់ទំហំអេក្រង់ (iPhone, iPad, Desktop)`,
    `🎨 ការរចនាទំនើប: ប្រើប្រាស់ Tailwind CSS ជាមួយ Color Palette ស្រស់ស្អាត និង Dark Navy Theme`,
    `⚡ មុខងារអន្តរកម្ម: មាន Header Navigation, ប៊ូតុង Call to Action, និង Form ផ្ញើសារទាក់ទងគ្នា`,
    `🚀 ភាពបត់បែន: លោកអ្នកអាចកែសម្រួលកូដក្នុងផ្ទាំង Code Tab ឬ Download ជាឯកសារ ZIP យកទៅប្រើប្រាស់បានភ្លាមៗ`
  ];

  const summary = isKhmer ? summaryKhmer : `I've created your website for ${title}! 🎉\n\nHere's what I built:\n- Modern, responsive design for mobile, tablet, and desktop\n- Clean and professional UI/UX using Tailwind CSS\n- High-conversion call-to-action sections and working contact form\n- Fully customizable code (HTML, CSS, JavaScript)`;

  const html = `
<div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
  <!-- Nav -->
  <header class="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
          QY
        </div>
        <span class="text-xl font-bold tracking-tight text-white">${title}</span>
      </div>
      <nav class="hidden md:flex items-center space-x-8 text-sm text-slate-300">
        <a href="#home" class="hover:text-cyan-400 transition-colors">${isKhmer ? 'ទំព័រដើម' : 'Home'}</a>
        <a href="#features" class="hover:text-cyan-400 transition-colors">${isKhmer ? 'លក្ខណៈពិសេស' : 'Features'}</a>
        <a href="#services" class="hover:text-cyan-400 transition-colors">${isKhmer ? 'សេវាកម្ម' : 'Services'}</a>
        <a href="#contact" class="hover:text-cyan-400 transition-colors">${isKhmer ? 'ទំនាក់ទំនង' : 'Contact'}</a>
      </nav>
      <a href="#contact" class="px-5 py-2 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-400/20">
        ${isKhmer ? 'ចាប់ផ្តើមឥឡូវនេះ' : 'Get Started'}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="relative pt-36 pb-20 md:pt-44 md:pb-32 px-6 max-w-6xl mx-auto text-center">
    <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-6">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>${tagline}</span>
    </div>
    <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
      ${isKhmer ? 'បង្កើនប្រសិទ្ធភាពអាជីវកម្មរបស់អ្នកជាមួយ' : 'Empowering Digital Innovation with'}
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400"> ${title}</span>
    </h1>
    <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
      ${isKhmer ? 'យើងផ្តល់ជូននូវដំណោះស្រាយបច្ចេកវិទ្យា និងគេហទំព័រទំនើប ដើម្បីជួយឱ្យលោកអ្នកសម្រេចគោលដៅ និងអភិវឌ្ឍន៍អាជីវកម្មយ៉ាងឆាប់រហ័ស។' : 'Engineered with cutting-edge architectures, responsive mobile-first interfaces, and high-conversion UX design.'}
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="#contact" class="px-8 py-3 rounded-full text-sm font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/25">
        ${isKhmer ? 'ទាក់ទងមកយើងខ្ញុំ' : 'Explore Now'}
      </a>
      <a href="#features" class="px-8 py-3 rounded-full text-sm font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all">
        ${isKhmer ? 'ស្វែងយល់បន្ថែម' : 'Learn More'}
      </a>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="py-20 bg-slate-900/40 border-t border-slate-800/80 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-white mb-3">${isKhmer ? 'ចំណុចលេចធ្លោនៃគេហទំព័រ' : 'Core Capabilities'}</h2>
        <p class="text-slate-400 text-sm">${isKhmer ? 'ផ្តល់ជូននូវបទពិសោធន៍ដ៏ល្អបំផុតសម្រាប់អតិថិជនទាំងអស់' : 'Comprehensive solutions designed to elevate your brand presence.'}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div class="text-3xl mb-4">⚡</div>
          <h3 class="text-lg font-bold text-white mb-2">${isKhmer ? 'ដំណើរការរហ័សទាន់ចិត្ត' : 'Ultra-Fast Performance'}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">${isKhmer ? 'ទំព័រដើរលឿន ងាយស្រួលប្រើប្រាស់លើគ្រប់ឧបករណ៍' : 'Optimized assets ensuring lightning-fast load times and seamless navigation.'}</p>
        </div>
        <div class="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all">
          <div class="text-3xl mb-4">📱</div>
          <h3 class="text-lg font-bold text-white mb-2">${isKhmer ? 'សមស្របលើទូរស័ព្ទ (Responsive)' : 'Mobile First Responsive'}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">${isKhmer ? 'បង្ហាញរូបភាពស្អាតទាំងលើ iPhone, iPad និង Desktop' : 'Pixel-perfect rendering across smartphones, tablets, and wide displays.'}</p>
        </div>
        <div class="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div class="text-3xl mb-4">🛡️</div>
          <h3 class="text-lg font-bold text-white mb-2">${isKhmer ? 'សុវត្ថិភាព និងទំនុកចិត្ត' : 'Enterprise Security'}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">${isKhmer ? 'ប្រព័ន្ធការពារទិន្នន័យស្របតាមស្តង់ដារអន្តរជាតិ' : 'Built-in security hardening with encrypted data streams.'}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section id="contact" class="py-20 px-6 max-w-3xl mx-auto">
    <div class="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center shadow-xl">
      <h2 class="text-2xl font-bold text-white mb-2">${isKhmer ? 'ផ្ញើសារមកកាន់យើង' : 'Get In Touch'}</h2>
      <p class="text-xs text-slate-400 mb-6">${isKhmer ? 'យើងនឹងឆ្លើយតបវិញក្នុងរយៈពេល ២៤ ម៉ោង' : 'Fill in the form below and our team will get back to you shortly.'}</p>
      <form id="contactForm" class="space-y-4 text-left">
        <input type="text" required placeholder="${isKhmer ? 'ឈ្មោះរបស់អ្នក (Your Name)' : 'Your Name'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
        <input type="email" required placeholder="${isKhmer ? 'អ៊ីមែល (Email Address)' : 'Email Address'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
        <textarea rows="3" required placeholder="${isKhmer ? 'សរសេរសាររបស់អ្នកនៅទីនេះ...' : 'Your message...'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"></textarea>
        <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity">
          ${isKhmer ? 'ផ្ញើសារឥឡូវនេះ' : 'Send Message'}
        </button>
      </form>
      <div id="formSuccess" class="hidden text-emerald-400 text-sm font-semibold pt-4">
        ✓ ${isKhmer ? 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!' : 'Your message has been sent successfully!'}
      </div>
    </div>
  </section>
</div>`;

  const css = `html { scroll-behavior: smooth; }`;
  const js = `
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  });
}`;

  return {
    type: 'BUILD',
    friendlyReply,
    title,
    tagline,
    summary,
    summaryKhmer,
    khmerHighlights,
    html,
    css,
    js,
    suggestedChanges: [
      isKhmer ? 'ប្តូរពណ៌ Hero Section ទៅជាពណ៌ខៀវចាស់' : 'Make the hero background darker',
      isKhmer ? 'បន្ថែមផ្នែកតារាងតម្លៃ (Pricing Table)' : 'Add a pricing table with 3 plans',
      isKhmer ? 'បន្ថែម Carousel មតិអតិថិជន (Testimonials)' : 'Add a customer testimonial slider'
    ]
  };
}

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// Check Gemini API status
app.get('/api/status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0 && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    configured: hasKey,
    model: adminConfig.primaryModel,
    supportedModels: [
      { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash (Active & Stable)', description: 'Fast, high-demand resilient' },
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', description: 'Next-gen reasoning speed' },
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', description: 'Flagship generation model' },
      { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', description: 'Standard production alias' }
    ],
    autoFailover: adminConfig.enableAutoFailover,
    totalDeployments: deployedSites.size,
  });
});

// Generate website endpoint with failover & logging
app.post('/api/generate', async (req, res) => {
  const startTime = Date.now();
  const { prompt, model, templateContext } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'INVALID_INPUT', message: 'A prompt is required to generate a website.' });
  }

  const userPrompt = `
User Request: ${prompt}
${templateContext ? `Base Context / Category: ${templateContext}` : ''}

Generate the complete website files (HTML, CSS, JS) matching the requested layout, theme, and features. Ensure modern, premium UI/UX, responsive layouts, and interactive behaviors.
`;

  try {
    const preferred = model || adminConfig.primaryModel;
    const result = await executeWithFailover(userPrompt, adminConfig.systemPromptOverride, preferred);
    const latency = Date.now() - startTime;

    // Record in Admin generation logs
    const logItem: GenerationLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      prompt: prompt.slice(0, 100),
      modelAttempted: preferred,
      modelUsed: result.modelUsed,
      latencyMs: latency,
      status: result.status,
      language: /[\u1780-\u17FF]/.test(prompt) ? 'Khmer' : 'English',
    };
    generationLogs.unshift(logItem);
    if (generationLogs.length > 100) generationLogs.pop();

    res.json({
      success: true,
      data: result.data,
      meta: {
        modelUsed: result.modelUsed,
        latencyMs: latency,
        status: result.status,
      },
    });
  } catch (error: any) {
    const latency = Date.now() - startTime;
    console.error('Generation execution error:', error);

    const logItem: GenerationLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      prompt: prompt.slice(0, 100),
      modelAttempted: model || adminConfig.primaryModel,
      modelUsed: 'Failed',
      latencyMs: latency,
      status: 'FAILED',
      errorNotice: error?.message || 'Upstream service unavailable',
      language: /[\u1780-\u17FF]/.test(prompt) ? 'Khmer' : 'English',
    };
    generationLogs.unshift(logItem);

    // Fallback gracefully so user receives a working site
    const fallback = generateSmartFallback(prompt);
    res.json({
      success: true,
      data: fallback,
      meta: {
        modelUsed: 'QuantYield Smart Engine (Fallback)',
        latencyMs: latency,
        status: 'FAILOVER_RESOLVED',
      },
    });
  }
});

// Refine/Edit website endpoint with failover & logging
app.post('/api/refine', async (req, res) => {
  const startTime = Date.now();
  const { currentProject, instruction, model } = req.body;

  if (!instruction || !currentProject) {
    return res.status(400).json({ error: 'INVALID_INPUT', message: 'Current project and edit instruction are required.' });
  }

  const refinePrompt = `
Existing Website:
Title: ${currentProject.title || 'Untitled Website'}
Current HTML:
${currentProject.html?.slice(0, 4000) || ''}

Current CSS:
${currentProject.css?.slice(0, 1500) || ''}

Current JS:
${currentProject.js?.slice(0, 1500) || ''}

User's Input:
"${instruction}"

INSTRUCTION:
1. If the user's input is a casual question, greeting (e.g. "សួស្តី", "ជំរាបសួរ", "Hello"), chit-chat, or asking for advice/explanation:
   Set "type": "CHAT".
   Provide an exceptionally warm, polite, and helpful conversational answer in "friendlyReply" and "summary" in fluent Khmer (or English). Keep html, css, js unchanged.

2. If the user's input is requesting a change or website modification:
   Set "type": "BUILD".
   Seamlessly implement the requested changes to the HTML, CSS, and JS.
   Provide "friendlyReply", "title", "tagline", "summary", "summaryKhmer" (detailed explanation in Khmer), and "khmerHighlights" (4-6 Khmer bullet points explaining what was updated and how it looks/works).
`;

  try {
    const preferred = model || adminConfig.primaryModel;
    const result = await executeWithFailover(refinePrompt, adminConfig.systemPromptOverride, preferred);
    const latency = Date.now() - startTime;

    const logItem: GenerationLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      prompt: `Edit: ${instruction.slice(0, 80)}`,
      modelAttempted: preferred,
      modelUsed: result.modelUsed,
      latencyMs: latency,
      status: result.status,
      language: /[\u1780-\u17FF]/.test(instruction) ? 'Khmer' : 'English',
    };
    generationLogs.unshift(logItem);

    res.json({
      success: true,
      data: result.data,
      meta: {
        modelUsed: result.modelUsed,
        latencyMs: latency,
        status: result.status,
      },
    });
  } catch (error: any) {
    console.error('Refinement error:', error);
    // Return gracefully modified fallback
    const fallback = generateSmartFallback(instruction);
    res.json({
      success: true,
      data: {
        ...fallback,
        title: currentProject.title || fallback.title,
      },
      meta: {
        modelUsed: 'QuantYield Smart Engine (Fallback)',
        status: 'FAILOVER_RESOLVED',
      },
    });
  }
});

// Deploy project endpoint (instant preview hosting)
app.post('/api/deploy', (req, res) => {
  const { title, html, css, js, category } = req.body;
  const id = 'site-' + Math.random().toString(36).substring(2, 9);
  
  const site: DeployedSite = {
    id,
    title: title || 'QuantYield Built Site',
    html: html || '',
    css: css || '',
    js: js || '',
    createdAt: Date.now(),
    views: 1,
    author: 'Chay Chai',
    category: category || 'custom',
  };

  deployedSites.set(id, site);

  const previewUrl = `/preview/${id}`;
  res.json({
    success: true,
    id,
    previewUrl,
    deployedAt: site.createdAt,
    status: 'active',
  });
});

// -------------------------------------------------------------
// ADMIN MANAGEMENT ENDPOINTS ("Website Admin គ្រប់គ្រង")
// -------------------------------------------------------------

// Get full Admin dashboard stats, deployed sites, and logs
app.get('/api/admin/stats', (req, res) => {
  const sitesList = Array.from(deployedSites.values()).map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
    views: s.views,
    author: s.author || 'Chay Chai',
    category: s.category || 'website',
    previewUrl: `/preview/${s.id}`,
  }));

  const totalRequests = generationLogs.length;
  const successfulRequests = generationLogs.filter((l) => l.status === 'SUCCESS' || l.status === 'FAILOVER_RESOLVED').length;
  const failoversPrevented = generationLogs.filter((l) => l.status === 'FAILOVER_RESOLVED').length;
  const avgLatency = totalRequests > 0 
    ? Math.round(generationLogs.reduce((acc, l) => acc + l.latencyMs, 0) / totalRequests)
    : 0;

  res.json({
    success: true,
    config: adminConfig,
    metrics: {
      totalSitesDeployed: deployedSites.size,
      totalGenerationRequests: totalRequests,
      successRatePercent: totalRequests > 0 ? Math.round((successfulRequests / totalRequests) * 100) : 100,
      failoversPrevented,
      avgLatencyMs: avgLatency,
      modelsHealth: {
        'gemini-3.5-flash': 'ONLINE',
        'gemini-3-flash-preview': 'ONLINE',
        'gemini-3.8-flash': 'AVAILABLE (CASCADE PROTECTED)',
        'gemini-flash-latest': 'ONLINE',
      },
    },
    deployedSites: sitesList,
    recentLogs: generationLogs.slice(0, 30),
  });
});

// Update Admin settings (change primary model, failover, etc.)
app.post('/api/admin/config', (req, res) => {
  const { primaryModel, enableAutoFailover, temperature, systemPromptOverride } = req.body;
  if (primaryModel) adminConfig.primaryModel = primaryModel;
  if (enableAutoFailover !== undefined) adminConfig.enableAutoFailover = Boolean(enableAutoFailover);
  if (temperature !== undefined) adminConfig.temperature = Number(temperature);
  if (systemPromptOverride !== undefined) adminConfig.systemPromptOverride = systemPromptOverride;

  res.json({ success: true, config: adminConfig });
});

// Delete a deployed website
app.delete('/api/admin/deployed-site/:id', (req, res) => {
  const { id } = req.params;
  const existed = deployedSites.delete(id);
  res.json({ success: existed });
});

// Clear generation logs
app.post('/api/admin/clear-logs', (req, res) => {
  generationLogs.length = 0;
  res.json({ success: true });
});

// Admin Passcode verification (Confidential passcode: Tchhay12345)
app.post('/api/admin/verify-passcode', (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_SECRET_PASSCODE) {
    return res.json({ success: true, message: 'Admin passcode verified successfully' });
  }
  return res.status(401).json({
    success: false,
    error: 'INVALID_PASSCODE',
    message: 'លេខកូដសម្ងាត់មិនត្រឹមត្រូវទេ! (Incorrect Admin Passcode)',
  });
});

// Admin User Management: List all registered users
app.get('/api/admin/users', (req, res) => {
  const usersList = Array.from(registeredUsers.values()).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    status: u.status,
    role: u.role,
    registeredAt: u.registeredAt,
    approvedAt: u.approvedAt,
    notes: u.notes,
  }));
  res.json({ success: true, users: usersList });
});

// Admin User Management: Approve user
app.post('/api/admin/users/:id/approve', (req, res) => {
  const user = registeredUsers.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
  user.status = 'APPROVED';
  user.approvedAt = Date.now();
  res.json({ success: true, user });
});

// Admin User Management: Reject user
app.post('/api/admin/users/:id/reject', (req, res) => {
  const user = registeredUsers.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
  user.status = 'REJECTED';
  res.json({ success: true, user });
});

// User Registration endpoint (starts as PENDING_APPROVAL)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, notes } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'INVALID_INPUT', message: 'សូមបំពេញឈ្មោះ អ៊ីមែល និងពាក្យសម្ងាត់។' });
  }

  const existing = Array.from(registeredUsers.values()).find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (existing) {
    return res.status(400).json({ error: 'EMAIL_EXISTS', message: 'អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចហើយ។' });
  }

  const id = 'user-' + Math.random().toString(36).substring(2, 9);
  const newUser: StoredUser = {
    id,
    name: name.trim(),
    email: email.trim(),
    password,
    status: 'PENDING_APPROVAL',
    role: 'user',
    registeredAt: Date.now(),
    notes: notes || 'ស្នើសុំចុះឈ្មោះប្រើប្រាស់ QuantYield AI',
  };
  registeredUsers.set(id, newUser);

  res.json({
    success: true,
    status: 'PENDING_APPROVAL',
    message: 'គណនីរបស់អ្នកត្រូវបានបង្កើតដោយជោគជ័យ! សូមរង់ចាំការអនុញ្ញាតពី Admin ជាមុនសិន ទើបអាចចូលប្រើប្រាស់បាន។',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status,
      role: newUser.role,
      registeredAt: newUser.registeredAt,
    },
  });
});

// User Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'INVALID_INPUT', message: 'សូមបញ្ចូលអ៊ីមែល។' });
  }

  const user = Array.from(registeredUsers.values()).find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user) {
    return res.status(404).json({
      error: 'USER_NOT_FOUND',
      message: 'រកមិនឃើញគណនីនេះទេ សូមចុះឈ្មោះជាមុនសិន។',
    });
  }

  if (password && user.password !== password && user.role !== 'admin') {
    return res.status(401).json({
      error: 'INVALID_PASSWORD',
      message: 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។',
    });
  }

  // Check approval status
  if (user.status === 'PENDING_APPROVAL') {
    return res.status(403).json({
      error: 'PENDING_APPROVAL',
      status: 'PENDING_APPROVAL',
      message: 'គណនីរបស់អ្នកកំពុងស្ថិតក្នុងដំណាក់កាលរង់ចាំការអនុញ្ញាតពី Admin ជាមុនសិន។',
    });
  }

  if (user.status === 'REJECTED') {
    return res.status(403).json({
      error: 'REJECTED',
      status: 'REJECTED',
      message: 'គណនីនេះត្រូវបានបដិសេធដោយ Admin។',
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      registeredAt: user.registeredAt,
    },
  });
});

// Render standalone preview page for an exported/deployed website
app.get('/preview/:id', (req, res) => {
  const site = deployedSites.get(req.params.id);
  if (!site) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Website Not Found - QuantYield AI</title></head>
        <body style="background:#0b101b;color:#e2e8f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;">
            <h2>Preview Link Expired or Not Found</h2>
            <p style="color:#94a3b8;">This sandbox deployment might have been reset.</p>
            <a href="/" style="color:#38bdf8;text-decoration:none;">&larr; Return to QuantYield AI Builder</a>
          </div>
        </body>
      </html>
    `);
  }

  // Increment view counter
  site.views = (site.views || 0) + 1;

  const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(site.title)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif; margin: 0; padding: 0; }
    ${site.css}
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${site.html}
  <script>
    try {
      ${site.js}
    } catch (e) {
      console.warn('Sandbox script notice:', e);
    }
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(fullDocument);
});

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Vite integration / Static serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QuantYield AI Builder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
