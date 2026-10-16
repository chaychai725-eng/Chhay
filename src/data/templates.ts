import { TemplateDefinition } from '../types';

export const STARTER_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'business-quantyield',
    category: 'business',
    title: 'QuantYield Global',
    description: 'Modern corporate website for AI, quantitative strategies, and enterprise tech.',
    badge: 'Popular',
    defaultPrompt: 'Create a modern business website for QuantYield Global. It should have a hero section, about us, services, features, testimonials, and contact page. Use a clean, professional design with blue and green colors.',
    defaultPromptKhmer: 'បង្កើតគេហទំព័រអាជីវកម្មទំនើបសម្រាប់ក្រុមហ៊ុន QuantYield Global ដោយមានផ្នែក Hero, អំពីយើង, សេវាកម្ម, លក្ខណៈពិសេស, មតិអតិថិជន និងទំព័រទំនាក់ទំនង។ ប្រើរចនាបទស្អាត វិជ្ជាជីវៈ ជាមួយពណ៌ខៀវ និងបៃតង។',
    project: {
      title: 'QuantYield Global',
      tagline: 'AI-Powered Solutions for a Smarter Tomorrow',
      description: 'Enterprise website with hero globe, services, testimonials, and contact section.',
      category: 'business',
      html: `
<!-- Navigation Bar -->
<header class="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 z-50">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <svg class="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <span class="text-xl font-bold tracking-tight text-white">QuantYield <span class="text-cyan-400">Global</span></span>
    </div>

    <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
      <a href="#home" class="text-cyan-400 transition-colors">Home</a>
      <a href="#about" class="hover:text-white transition-colors">About</a>
      <a href="#services" class="hover:text-white transition-colors">Services</a>
      <a href="#features" class="hover:text-white transition-colors">Features</a>
      <a href="#contact" class="hover:text-white transition-colors">Contact</a>
    </nav>

    <div class="flex items-center space-x-4">
      <a href="#contact" class="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-400/25">
        Get Started
      </a>
      <button id="mobileMenuBtn" class="md:hidden text-slate-300 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Dropdown -->
  <div id="mobileMenu" class="hidden md:hidden px-6 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-3 text-sm">
    <a href="#home" class="block py-1 text-cyan-400">Home</a>
    <a href="#about" class="block py-1 text-slate-300">About</a>
    <a href="#services" class="block py-1 text-slate-300">Services</a>
    <a href="#features" class="block py-1 text-slate-300">Features</a>
    <a href="#contact" class="block py-1 text-slate-300">Contact</a>
  </div>
</header>

<!-- Hero Section -->
<section id="home" class="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)]"></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]"></div>
  
  <div class="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <div class="lg:col-span-7 space-y-6">
      <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-medium tracking-wide">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>AI-Powered Solutions for a Smarter Tomorrow</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
        QuantYield Global<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Build. Grow. Achieve.</span>
      </h1>

      <p class="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
        We help businesses and individuals leverage the power of AI, quantitative strategies, and innovative technology to achieve sustainable growth and higher yields.
      </p>

      <div class="flex flex-wrap gap-4 pt-2">
        <a href="#contact" class="px-7 py-3 rounded-full text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/25">
          Get Started
        </a>
        <a href="#services" class="px-7 py-3 rounded-full text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all flex items-center space-x-2">
          <svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
          <span>Learn More</span>
        </a>
      </div>

      <div class="pt-8 border-t border-slate-800/80">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">Trusted by innovative companies worldwide</p>
        <div class="flex flex-wrap items-center gap-6 sm:gap-8 opacity-75 grayscale hover:grayscale-0 transition-all text-slate-300 font-semibold text-sm">
          <span class="flex items-center space-x-1.5"><i class="fa-brands fa-google text-cyan-400"></i><span>Google</span></span>
          <span class="flex items-center space-x-1.5"><i class="fa-brands fa-microsoft text-blue-400"></i><span>Microsoft</span></span>
          <span class="flex items-center space-x-1.5"><i class="fa-brands fa-meta text-indigo-400"></i><span>Meta</span></span>
          <span class="flex items-center space-x-1.5"><i class="fa-brands fa-amazon text-amber-400"></i><span>Amazon</span></span>
          <span class="flex items-center space-x-1.5"><i class="fa-brands fa-apple text-white"></i><span>Apple</span></span>
        </div>
      </div>
    </div>

    <!-- Visual Globe & Stats Card -->
    <div class="lg:col-span-5 relative flex justify-center">
      <div class="relative w-full max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-tr from-cyan-500/30 via-emerald-500/20 to-transparent">
        <div class="w-full h-full bg-slate-900/90 rounded-[22px] border border-slate-800 p-6 flex flex-col justify-between overflow-hidden relative">
          <!-- Animated Cyber Grid & Glowing Planet -->
          <div class="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div class="relative z-10 flex justify-between items-center">
            <span class="text-xs font-mono text-cyan-400 tracking-wider">QUANTITATIVE ENGINE v4.2</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
          </div>

          <!-- Central Animated Graphic -->
          <div class="relative z-10 my-auto py-8 flex flex-col items-center text-center">
            <div class="relative w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-600/40 via-blue-500/20 to-emerald-500/40 flex items-center justify-center border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 animate-pulse">
              <svg class="w-20 h-20 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="mt-4 text-xs font-mono text-slate-400">Global algorithmic telemetry active</p>
          </div>

          <!-- Bottom Live Stats -->
          <div class="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div class="text-[11px] text-slate-400">Portfolio Yield</div>
              <div class="text-lg font-bold text-emerald-400">+34.8% <span class="text-[10px] text-slate-400">YoY</span></div>
            </div>
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div class="text-[11px] text-slate-400">Latency Threshold</div>
              <div class="text-lg font-bold text-cyan-400">&lt; 12ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section id="services" class="py-20 bg-slate-900/50 border-t border-slate-800/60">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto space-y-3 mb-16">
      <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">What We Offer</span>
      <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Our Services</h2>
      <p class="text-slate-300 text-sm sm:text-base">We provide comprehensive AI and technology solutions to help you achieve your goals and maximize your potential.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Service 1 -->
      <div class="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all group">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">AI Consulting</h3>
        <p class="text-slate-300 text-sm leading-relaxed mb-6">Expert guidance to integrate custom AI models, autonomous agents, and smart automation into your core business pipelines.</p>
        <ul class="text-xs space-y-2 text-slate-300 border-t border-slate-800 pt-4">
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>LLM Integration & Fine-Tuning</span></li>
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>Predictive Analytics</span></li>
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>Agentic Workflow Automation</span></li>
        </ul>
      </div>

      <!-- Service 2 -->
      <div class="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all group">
        <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Quantitative Strategies</h3>
        <p class="text-slate-300 text-sm leading-relaxed mb-6">Data-driven strategies engineered for maximum upside, risk mitigation, and continuous performance optimization.</p>
        <ul class="text-xs space-y-2 text-slate-300 border-t border-slate-800 pt-4">
          <li class="flex items-center space-x-2"><span class="text-emerald-400">&#10003;</span><span>High-Frequency Yield Optimization</span></li>
          <li class="flex items-center space-x-2"><span class="text-emerald-400">&#10003;</span><span>Risk Hedging & Monte Carlo</span></li>
          <li class="flex items-center space-x-2"><span class="text-emerald-400">&#10003;</span><span>Algorithmic Execution</span></li>
        </ul>
      </div>

      <!-- Service 3 -->
      <div class="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all group">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Technology Solutions</h3>
        <p class="text-slate-300 text-sm leading-relaxed mb-6">Custom high-performance cloud architecture, secure API infrastructure, and real-time streaming platforms.</p>
        <ul class="text-xs space-y-2 text-slate-300 border-t border-slate-800 pt-4">
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>Ultra-Low Latency Cloud Run</span></li>
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>Enterprise Security Standards</span></li>
          <li class="flex items-center space-x-2"><span class="text-cyan-400">&#10003;</span><span>Full API Integration</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section id="contact" class="py-20 relative">
  <div class="max-w-4xl mx-auto px-6">
    <div class="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative">
      <div class="text-center max-w-xl mx-auto mb-8 space-y-2">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Start Building With QuantYield</h2>
        <p class="text-slate-300 text-sm">Send us a message and our quantitative architects will prepare a tailored solution within 24 hours.</p>
      </div>

      <form id="contactForm" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Name</label>
            <input type="text" required placeholder="Chay Chai" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
            <input type="email" required placeholder="chaychai@example.com" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Project Scope</label>
          <select class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
            <option>Enterprise AI Consulting</option>
            <option>Quantitative Yield Modeling</option>
            <option>Custom Web & Cloud Solutions</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Message</label>
          <textarea rows="3" required placeholder="Tell us about your objectives and timeline..." class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"></textarea>
        </div>
        <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-cyan-500/20">
          Submit Inquiry
        </button>
      </form>
      <div id="formSuccess" class="hidden text-center py-6 text-emerald-400 font-semibold text-sm">
        &#10003; Thank you! Your message has been received. Our team will contact you shortly.
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py-8 border-t border-slate-800 text-center text-xs text-slate-400">
  <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div>&copy; 2026 QuantYield Global. All rights reserved.</div>
    <div class="flex space-x-6">
      <a href="#" class="hover:text-cyan-400 transition-colors">Privacy</a>
      <a href="#" class="hover:text-cyan-400 transition-colors">Terms of Service</a>
      <a href="#" class="hover:text-cyan-400 transition-colors">Security</a>
    </div>
  </div>
</footer>
`,
      css: `
html { scroll-behavior: smooth; }
::selection { background: #06b6d4; color: #020617; }
/* Glassmorphism custom effects */
.glass-panel {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
`,
      js: `
// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Contact form simulation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  });
}
`
    }
  },
  {
    id: 'portfolio-creative',
    category: 'portfolio',
    title: 'Alex Vance Portfolio',
    description: 'Minimalist, high-impact developer and AI engineer portfolio.',
    badge: 'Trending',
    defaultPrompt: 'Create a sleek, modern portfolio website for a senior AI Engineer & Creative Developer named Alex Vance. Include an introduction with interactive tech stack pills, project showcase with filter tabs, stats, and a contact form.',
    defaultPromptKhmer: 'បង្កើតគេហទំព័រ Portfolio ទំនើបសម្រាប់វិស្វករ AI និង Creative Developer។ រួមបញ្ចូលទាំងផ្នែកណែនាំខ្លួន គម្រោងការងារ និងទម្រង់ទំនាក់ទំនង។',
    project: {
      title: 'Alex Vance Portfolio',
      tagline: 'AI Engineer & Full-Stack Architect',
      description: 'Interactive portfolio with project filters, skills matrix, and direct contact modal.',
      category: 'portfolio',
      html: `
<div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
  <!-- Header -->
  <nav class="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-900">
    <div class="font-bold text-lg tracking-tight">alex<span class="text-purple-400">.vance</span></div>
    <div class="flex items-center space-x-6 text-sm text-slate-400">
      <a href="#projects" class="hover:text-purple-400 transition-colors">Projects</a>
      <a href="#skills" class="hover:text-purple-400 transition-colors">Skills</a>
      <a href="#about" class="hover:text-purple-400 transition-colors">About</a>
      <a href="#contact" class="px-4 py-1.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all">Hire Me</a>
    </div>
  </nav>

  <!-- Hero -->
  <header class="max-w-5xl mx-auto px-6 pt-24 pb-16">
    <div class="inline-block px-3 py-1 rounded-full text-xs font-mono bg-purple-950/60 text-purple-400 border border-purple-800/40 mb-6">
      Available for Q4 contracts & AI advisory
    </div>
    <h1 class="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
      Building next-generation <br/>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">AI interfaces & quantitative software.</span>
    </h1>
    <p class="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
      7+ years designing distributed systems, generative agents, and high-performance reactive web applications.
    </p>
    <div class="flex flex-wrap gap-3">
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">TypeScript</span>
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">Python / PyTorch</span>
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">React 19 / Next.js</span>
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">Gemini SDK</span>
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">PostgreSQL</span>
    </div>
  </header>

  <!-- Projects Section with Filter -->
  <section id="projects" class="max-w-5xl mx-auto px-6 py-12 border-t border-slate-900">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h2 class="text-2xl font-bold text-white">Featured Work</h2>
      <div id="filterContainer" class="flex gap-2">
        <button class="filter-btn active px-3 py-1 rounded-md text-xs font-medium bg-purple-600 text-white" data-filter="all">All</button>
        <button class="filter-btn px-3 py-1 rounded-md text-xs font-medium bg-slate-900 text-slate-400 hover:text-white" data-filter="ai">AI / ML</button>
        <button class="filter-btn px-3 py-1 rounded-md text-xs font-medium bg-slate-900 text-slate-400 hover:text-white" data-filter="web">Web Platform</button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="project-card bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-purple-500/40 transition-all" data-category="ai">
        <div class="text-xs font-mono text-purple-400 mb-2">GENERATIVE SYSTEM</div>
        <h3 class="text-xl font-bold text-white mb-2">Synapse LLM Router</h3>
        <p class="text-sm text-slate-400 mb-4">Intelligent dynamic load router balancing complex reasoning queries across multi-model inference clusters with 40% latency reduction.</p>
        <div class="flex items-center space-x-2 text-xs text-purple-300">
          <span>Python</span> &bull; <span>FastAPI</span> &bull; <span>Redis</span>
        </div>
      </div>

      <div class="project-card bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-purple-500/40 transition-all" data-category="web">
        <div class="text-xs font-mono text-pink-400 mb-2">FINANCIAL SAAS</div>
        <h3 class="text-xl font-bold text-white mb-2">Vortex Order Matrix</h3>
        <p class="text-sm text-slate-400 mb-4">Real-time WebSocket trading terminal visualization processing 50k events/sec with sub-millisecond canvas rendering.</p>
        <div class="flex items-center space-x-2 text-xs text-pink-300">
          <span>React</span> &bull; <span>WebGL</span> &bull; <span>Tailwind</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="max-w-5xl mx-auto px-6 py-16 border-t border-slate-900 text-center">
    <h2 class="text-3xl font-bold text-white mb-3">Let's build something extraordinary.</h2>
    <p class="text-slate-400 text-sm mb-6">Have an idea or looking for technical leadership? Reach out anytime.</p>
    <a href="mailto:alex@example.com" class="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30">
      <span>Get in Touch</span>
      <span>&rarr;</span>
    </a>
  </section>
</div>
`,
      css: `
.project-card { transition: transform 0.2s ease, border-color 0.2s ease; }
.project-card:hover { transform: translateY(-3px); }
`,
      js: `
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-purple-600', 'text-white');
      b.classList.add('bg-slate-900', 'text-slate-400');
    });
    btn.classList.add('bg-purple-600', 'text-white');
    btn.classList.remove('bg-slate-900', 'text-slate-400');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
`
    }
  },
  {
    id: 'ecommerce-store',
    category: 'ecommerce',
    title: 'AuraTech Store',
    description: 'Modern electronics & gadget e-commerce store with functional cart.',
    badge: 'Interactive',
    defaultPrompt: 'Create a modern e-commerce online store called AuraTech. It should feature audio gear, smart wearables, and minimalist accessories with a functional shopping cart drawer, product cards, filter by category, and price calculator.',
    defaultPromptKhmer: 'បង្កើតហាងលក់ទំនិញអេឡិចត្រូនិចទំនើប AuraTech ដោយមានកន្ត្រកទំនិញដំណើរការបាន ការជ្រើសរើសប្រភេទ និងគណនាតម្លៃ។',
    project: {
      title: 'AuraTech Store',
      tagline: 'Minimalist Engineering & Premium Sound',
      description: 'E-commerce platform with live shopping cart drawer and instant product catalog.',
      category: 'ecommerce',
      html: `
<div class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Nav -->
  <header class="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-xl font-bold tracking-wider text-white">AURA<span class="text-amber-400">TECH</span></div>
      
      <div class="flex items-center space-x-6">
        <button id="cartBtn" class="relative p-2 text-slate-300 hover:text-white flex items-center space-x-2 bg-slate-800/80 rounded-xl px-3 py-1.5 border border-slate-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <span class="text-xs font-bold text-amber-400">Cart (<span id="cartCount">0</span>)</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <div class="max-w-6xl mx-auto px-6 py-12">
    <div class="rounded-3xl bg-gradient-to-r from-amber-600/20 via-orange-600/10 to-slate-900 p-8 md:p-12 border border-amber-500/20 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="space-y-4">
        <span class="text-xs uppercase font-bold tracking-widest text-amber-400">New Release</span>
        <h1 class="text-3xl md:text-5xl font-black text-white">Aura One ANC Headphones</h1>
        <p class="text-slate-300 max-w-md text-sm">Engineered with custom beryllium acoustic drivers and adaptive spatial noise cancellation.</p>
        <div class="text-2xl font-bold text-white">$299.00</div>
      </div>
      <button class="add-to-cart px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full transition-all shadow-lg shadow-amber-400/20" data-name="Aura One ANC" data-price="299">
        Add to Bag
      </button>
    </div>
  </div>

  <!-- Catalog -->
  <section class="max-w-6xl mx-auto px-6 py-8">
    <h2 class="text-2xl font-bold text-white mb-6">Popular Gear</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
        <div class="h-44 bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-4xl text-amber-400">🎧</div>
        <div>
          <div class="text-xs text-slate-400">Spatial Audio</div>
          <h3 class="text-lg font-bold text-white">Aura Wireless Pro</h3>
          <p class="text-xs text-slate-400 mt-1 mb-4">40-hour battery, zero-latency lossless audio codec.</p>
        </div>
        <div class="flex justify-between items-center pt-3 border-t border-slate-800">
          <span class="text-lg font-bold text-amber-400">$199.00</span>
          <button class="add-to-cart px-4 py-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-xs font-semibold rounded-lg transition-all" data-name="Aura Wireless Pro" data-price="199">Add</button>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
        <div class="h-44 bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-4xl text-cyan-400">⌚</div>
        <div>
          <div class="text-xs text-slate-400">Biometrics</div>
          <h3 class="text-lg font-bold text-white">Apex Titan Chrono</h3>
          <p class="text-xs text-slate-400 mt-1 mb-4">Grade 5 titanium chassis with continuous VO2 tracking.</p>
        </div>
        <div class="flex justify-between items-center pt-3 border-t border-slate-800">
          <span class="text-lg font-bold text-amber-400">$349.00</span>
          <button class="add-to-cart px-4 py-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-xs font-semibold rounded-lg transition-all" data-name="Apex Titan Chrono" data-price="349">Add</button>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
        <div class="h-44 bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-4xl text-emerald-400">🔋</div>
        <div>
          <div class="text-xs text-slate-400">MagSafe Fast Power</div>
          <h3 class="text-lg font-bold text-white">HyperCharge 100W Dock</h3>
          <p class="text-xs text-slate-400 mt-1 mb-4">Simultaneous GaN ultra-fast charging for 4 devices.</p>
        </div>
        <div class="flex justify-between items-center pt-3 border-t border-slate-800">
          <span class="text-lg font-bold text-amber-400">$89.00</span>
          <button class="add-to-cart px-4 py-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-xs font-semibold rounded-lg transition-all" data-name="HyperCharge 100W" data-price="89">Add</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Cart Modal / Drawer -->
  <div id="cartModal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
    <div class="w-full max-w-md bg-slate-900 h-full p-6 border-l border-slate-800 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">Your Shopping Cart</h3>
          <button id="closeCart" class="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div id="cartItems" class="space-y-3 max-h-96 overflow-y-auto">
          <p class="text-sm text-slate-500">Your cart is empty.</p>
        </div>
      </div>
      <div class="border-t border-slate-800 pt-4 space-y-4">
        <div class="flex justify-between text-base font-bold text-white">
          <span>Total:</span>
          <span id="cartTotal" class="text-amber-400">$0.00</span>
        </div>
        <button id="checkoutBtn" class="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</div>
`,
      css: `
.add-to-cart:active { transform: scale(0.96); }
`,
      js: `
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = parseFloat(btn.getAttribute('data-price') || '0');
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  if (cartCount) cartCount.innerText = cart.length;
  if (!cartItems) return;
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-sm text-slate-500">Your cart is empty.</p>';
    if (cartTotal) cartTotal.innerText = '$0.00';
    return;
  }
  let total = 0;
  cartItems.innerHTML = cart.map((item, idx) => {
    total += item.price;
    return '<div class="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm"><div><span class="font-semibold text-white">' + item.name + '</span></div><div class="text-amber-400 font-mono">$' + item.price + '</div></div>';
  }).join('');
  if (cartTotal) cartTotal.innerText = '$' + total.toFixed(2);
}

if (cartBtn && cartModal) {
  cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
}
if (closeCart && cartModal) {
  closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
}
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Add an item first.');
    } else {
      alert('Order placed successfully! Thank you for shopping with AuraTech.');
      cart = [];
      updateCart();
      cartModal.classList.add('hidden');
    }
  });
}
`
    }
  },
  {
    id: 'blog-publication',
    category: 'blog',
    title: 'The QuantYield Journal',
    description: 'Clean, typography-focused tech and artificial intelligence blog publication.',
    badge: 'Editorial',
    defaultPrompt: 'Create a clean, publication-style blog called "The QuantYield Journal". It should feature articles on AI, quantitative systems, and tech architectures with reading times, author cards, search bar, and newsletter signup.',
    defaultPromptKhmer: 'បង្កើតគេហទំព័រប្លុក The QuantYield Journal សម្រាប់ផ្សព្វផ្សាយព័ត៌មានបច្ចេកវិទ្យា និង AI។',
    project: {
      title: 'The QuantYield Journal',
      tagline: 'Deep Insights into Machine Learning & Quantitative Tech',
      description: 'Editorial blog platform with reading time estimates, categories, and newsletter subscription.',
      category: 'blog',
      html: `
<div class="min-h-screen bg-slate-950 text-slate-200 font-sans">
  <!-- Nav -->
  <header class="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur sticky top-0 z-30">
    <div class="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-xl font-serif font-bold text-white tracking-wide">The QuantYield <span class="italic font-light text-cyan-400">Journal</span></div>
      <div class="flex items-center space-x-4 text-xs font-semibold text-slate-400">
        <a href="#articles" class="hover:text-white">Articles</a>
        <a href="#newsletter" class="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Subscribe</a>
      </div>
    </div>
  </header>

  <!-- Featured Spotlight -->
  <main class="max-w-4xl mx-auto px-6 py-12">
    <div class="mb-12 border-b border-slate-800/80 pb-12">
      <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">FEATURED DISPATCH</span>
      <h1 class="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-4 leading-snug">
        Next-Generation Reasoning: How Multi-Agent Consensus Outperforms Single LLMs in Algorithmic Trading
      </h1>
      <p class="text-slate-400 text-base leading-relaxed mb-6">
        An in-depth empirical exploration of agent ensembles, synthetic debate loops, and low-latency decision policies across real-world market environments.
      </p>
      <div class="flex items-center space-x-4 text-xs text-slate-400">
        <span class="font-semibold text-slate-200">Dr. Sarah Chen</span>
        <span>&bull;</span>
        <span>12 min read</span>
        <span>&bull;</span>
        <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">Quantitative AI</span>
      </div>
    </div>

    <!-- Article List -->
    <div id="articles" class="space-y-8">
      <article class="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
        <div class="text-xs text-emerald-400 font-mono mb-2">INFRASTRUCTURE</div>
        <h2 class="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors cursor-pointer">
          Optimizing Inference Latency with Speculative Decoding and Kernel Fusion
        </h2>
        <p class="text-sm text-slate-400 mb-4 leading-relaxed">
          How modern caching and hardware-aligned Triton kernels achieve 3.4x speedups without degrading precision.
        </p>
        <div class="text-xs text-slate-500">6 min read &bull; Yesterday</div>
      </article>

      <article class="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
        <div class="text-xs text-purple-400 font-mono mb-2">SECURITY & ETHICS</div>
        <h2 class="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors cursor-pointer">
          Autonomous Agents in Financial Gateways: Formal Verification Techniques
        </h2>
        <p class="text-sm text-slate-400 mb-4 leading-relaxed">
          Eliminating nondeterministic hallucinations in high-stakes transaction validation workflows.
        </p>
        <div class="text-xs text-slate-500">9 min read &bull; 3 days ago</div>
      </article>
    </div>

    <!-- Newsletter -->
    <section id="newsletter" class="mt-16 rounded-3xl bg-slate-900 p-8 border border-slate-800 text-center">
      <h3 class="text-2xl font-bold text-white mb-2">Read By 40,000+ AI Engineers</h3>
      <p class="text-sm text-slate-400 max-w-md mx-auto mb-6">Receive our weekly briefing on technical breakthroughs, open source releases, and market models.</p>
      <form id="subscribeForm" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" required placeholder="your.email@domain.com" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400">
        <button type="submit" class="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl transition-all">Join Free</button>
      </form>
      <div id="subSuccess" class="hidden text-emerald-400 text-sm font-semibold mt-4">&#10003; You're subscribed! Welcome to the briefing.</div>
    </section>
  </main>
</div>
`,
      css: `
h1, h2, h3 { letter-spacing: -0.02em; }
`,
      js: `
const subForm = document.getElementById('subscribeForm');
const subSuccess = document.getElementById('subSuccess');
if (subForm && subSuccess) {
  subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    subForm.classList.add('hidden');
    subSuccess.classList.remove('hidden');
  });
}
`
    }
  },
  {
    id: 'landing-saas',
    category: 'landing',
    title: 'NovaFlow SaaS Landing',
    description: 'High-converting SaaS landing page with pricing toggle and interactive feature grid.',
    badge: 'High Conversion',
    defaultPrompt: 'Create a high-converting SaaS landing page for an AI automation platform called NovaFlow. Include monthly/yearly billing toggle, interactive pricing cards, feature comparisons, customer proof, and an FAQ accordion.',
    defaultPromptKhmer: 'បង្កើតទំព័រ Landing Page ទំនើបសម្រាប់ផលិតផល SaaS NovaFlow ជាមួយតារាងតម្លៃ និងសំណួរចម្លើយ (FAQ)។',
    project: {
      title: 'NovaFlow SaaS Landing',
      tagline: 'Automate Enterprise Workflows with AI Precision',
      description: 'Landing page with annual billing discount switcher and interactive FAQ accordion.',
      category: 'landing',
      html: `
<div class="min-h-screen bg-slate-950 text-slate-100 font-sans">
  <!-- Nav -->
  <nav class="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
    <div class="text-xl font-black text-white flex items-center space-x-2">
      <span class="w-3 h-3 rounded-full bg-indigo-500"></span>
      <span>NovaFlow</span>
    </div>
    <div class="flex items-center space-x-4">
      <a href="#pricing" class="text-sm text-slate-300 hover:text-white">Pricing</a>
      <a href="#faq" class="text-sm text-slate-300 hover:text-white">FAQ</a>
      <a href="#pricing" class="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all">Start Free Trial</a>
    </div>
  </nav>

  <!-- Hero -->
  <header class="text-center max-w-3xl mx-auto px-6 pt-20 pb-16">
    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800/50 mb-6">
      <span>Version 3.0 is live</span> &rarr;
    </div>
    <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
      Turn Complex Workflows Into <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">One-Click AI Agents</span>
    </h1>
    <p class="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
      Connect your data sources, specify instructions in natural language, and let NovaFlow orchestrate operations automatically.
    </p>
    <div class="flex justify-center gap-4">
      <a href="#pricing" class="px-8 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-xl">Get Started Free</a>
      <a href="#faq" class="px-8 py-3.5 bg-slate-900 border border-slate-800 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all">Watch Demo</a>
    </div>
  </header>

  <!-- Pricing -->
  <section id="pricing" class="max-w-5xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
      <!-- Billing Switch -->
      <div class="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
        <button id="monthlyBtn" class="px-4 py-1.5 rounded-lg bg-indigo-600 text-white transition-all">Monthly</button>
        <button id="yearlyBtn" class="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center space-x-1">
          <span>Yearly</span>
          <span class="text-[10px] text-emerald-400 font-bold ml-1">SAVE 20%</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Starter -->
      <div class="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-white mb-1">Growth</h3>
          <p class="text-xs text-slate-400 mb-6">For fast-growing startups and product teams.</p>
          <div class="text-4xl font-extrabold text-white mb-6">
            <span id="priceGrowth">$49</span><span class="text-sm font-normal text-slate-400">/month</span>
          </div>
          <ul class="text-sm space-y-3 text-slate-300">
            <li>&#10003; Up to 15 Autonomous Agents</li>
            <li>&#10003; 50,000 Workflow Runs / mo</li>
            <li>&#10003; Standard Integrations (Slack, Sheets)</li>
          </ul>
        </div>
        <button class="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm">Choose Growth</button>
      </div>

      <!-- Pro -->
      <div class="bg-gradient-to-b from-indigo-950/60 to-slate-900 p-8 rounded-3xl border-2 border-indigo-500/50 flex flex-col justify-between relative shadow-2xl">
        <div class="absolute -top-3 right-8 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold tracking-wider uppercase">MOST POPULAR</div>
        <div>
          <h3 class="text-lg font-bold text-white mb-1">Enterprise Scale</h3>
          <p class="text-xs text-indigo-300/80 mb-6">For companies requiring infinite concurrency.</p>
          <div class="text-4xl font-extrabold text-white mb-6">
            <span id="priceScale">$149</span><span class="text-sm font-normal text-slate-400">/month</span>
          </div>
          <ul class="text-sm space-y-3 text-slate-200">
            <li>&#10003; Unlimited AI Autonomous Agents</li>
            <li>&#10003; 500,000 Workflow Runs / mo</li>
            <li>&#10003; Custom LLM Fine-Tuning</li>
            <li>&#10003; 24/7 Dedicated Architect Support</li>
          </ul>
        </div>
        <button class="mt-8 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30">Start 14-Day Free Trial</button>
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  <section id="faq" class="max-w-3xl mx-auto px-6 py-16 border-t border-slate-900">
    <h2 class="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
    <div class="space-y-3">
      <div class="faq-item bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer">
        <div class="flex justify-between items-center font-semibold text-sm text-white">
          <span>Can I bring my own Gemini API Key?</span>
          <span class="faq-icon text-indigo-400 text-lg">+</span>
        </div>
        <div class="faq-answer hidden text-xs text-slate-400 mt-2 leading-relaxed">
          Yes! NovaFlow fully supports custom API keys with zero markup on model inference tokens.
        </div>
      </div>
      <div class="faq-item bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer">
        <div class="flex justify-between items-center font-semibold text-sm text-white">
          <span>How secure is the data flow?</span>
          <span class="faq-icon text-indigo-400 text-lg">+</span>
        </div>
        <div class="faq-answer hidden text-xs text-slate-400 mt-2 leading-relaxed">
          All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never train foundation models on private client prompts.
        </div>
      </div>
    </div>
  </section>
</div>
`,
      css: `
.faq-item { transition: border-color 0.2s ease; }
.faq-item:hover { border-color: rgba(99, 102, 241, 0.4); }
`,
      js: `
// Toggle pricing billing
const monthlyBtn = document.getElementById('monthlyBtn');
const yearlyBtn = document.getElementById('yearlyBtn');
const priceGrowth = document.getElementById('priceGrowth');
const priceScale = document.getElementById('priceScale');

if (monthlyBtn && yearlyBtn && priceGrowth && priceScale) {
  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.className = 'px-4 py-1.5 rounded-lg bg-indigo-600 text-white transition-all';
    yearlyBtn.className = 'px-4 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center space-x-1';
    priceGrowth.innerText = '$49';
    priceScale.innerText = '$149';
  });
  yearlyBtn.addEventListener('click', () => {
    yearlyBtn.className = 'px-4 py-1.5 rounded-lg bg-indigo-600 text-white transition-all flex items-center space-x-1';
    monthlyBtn.className = 'px-4 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all';
    priceGrowth.innerText = '$39';
    priceScale.innerText = '$119';
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (answer && icon) {
      const isHidden = answer.classList.contains('hidden');
      answer.classList.toggle('hidden');
      icon.innerText = isHidden ? '-' : '+';
    }
  });
});
`
    }
  },
  {
    id: 'dashboard-analytics',
    category: 'dashboard',
    title: 'QuantYield Apex Dashboard',
    description: 'Financial intelligence & quantitative portfolio analytics dashboard.',
    badge: 'Real-time',
    defaultPrompt: 'Create a responsive analytics and portfolio dashboard called QuantYield Apex. It should display live metric KPI cards, chart visualizer with period selector (1D, 1W, 1M, 1Y), order execution book, and asset allocation breakdown.',
    defaultPromptKhmer: 'បង្កើតផ្ទាំងគ្រប់គ្រង Dashboard វិភាគទិន្នន័យហិរញ្ញវត្ថុទំនើប QuantYield Apex ជាមួយក្រាហ្វ និងតារាងប្រតិបត្តិការ។',
    project: {
      title: 'QuantYield Apex Dashboard',
      tagline: 'High-Frequency Quantitative Portfolio Console',
      description: 'Analytics dashboard with KPI cards, interactive timeframe toggles, and live transaction table.',
      category: 'dashboard',
      html: `
<div class="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
  <!-- Top Bar -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
      <h1 class="text-2xl font-bold text-white flex items-center space-x-2">
        <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>QuantYield Apex Terminal</span>
      </h1>
      <p class="text-xs text-slate-400">Algorithmic execution & capital telemetry</p>
    </div>
    <div class="flex items-center space-x-3">
      <span class="text-xs px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">Market Status: OPEN</span>
      <button class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md">Deploy Strategy</button>
    </div>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
      <div class="text-xs text-slate-400 font-medium">Total Portfolio Value</div>
      <div class="text-2xl font-extrabold text-white mt-1">$1,248,590.20</div>
      <div class="text-xs text-emerald-400 font-semibold mt-2 flex items-center">&uarr; +14.2% <span class="text-slate-500 ml-1 font-normal">this month</span></div>
    </div>
    <div class="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
      <div class="text-xs text-slate-400 font-medium">Net Sharpe Ratio</div>
      <div class="text-2xl font-extrabold text-cyan-400 mt-1">3.42</div>
      <div class="text-xs text-emerald-400 font-semibold mt-2">&uarr; Institutional Grade</div>
    </div>
    <div class="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
      <div class="text-xs text-slate-400 font-medium">Active Trading Bots</div>
      <div class="text-2xl font-extrabold text-white mt-1">18 / 20</div>
      <div class="text-xs text-cyan-400 font-semibold mt-2">99.98% uptime</div>
    </div>
    <div class="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
      <div class="text-xs text-slate-400 font-medium">24h Realized P&L</div>
      <div class="text-2xl font-extrabold text-emerald-400 mt-1">+$18,940.50</div>
      <div class="text-xs text-slate-400 mt-2">1,420 orders routed</div>
    </div>
  </div>

  <!-- Chart Simulation Area -->
  <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 mb-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 class="text-lg font-bold text-white">Performance Velocity</h2>
        <p class="text-xs text-slate-400">Cumulative strategy yields vs Benchmark</p>
      </div>
      <div id="timeframeToggles" class="flex p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
        <button class="px-3 py-1 rounded bg-slate-800 text-white font-medium" data-tf="1d">1D</button>
        <button class="px-3 py-1 rounded text-slate-400 hover:text-white" data-tf="1w">1W</button>
        <button class="px-3 py-1 rounded text-slate-400 hover:text-white" data-tf="1m">1M</button>
        <button class="px-3 py-1 rounded text-slate-400 hover:text-white" data-tf="1y">1Y</button>
      </div>
    </div>

    <!-- SVG Simulated Chart Visualizer -->
    <div class="w-full h-48 sm:h-64 relative flex items-end pt-4">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <!-- Area -->
        <path id="chartArea" d="M 0 170 Q 150 140 250 90 T 450 60 T 600 30 L 600 200 L 0 200 Z" fill="url(#chartGrad)"/>
        <!-- Line -->
        <path id="chartLine" d="M 0 170 Q 150 140 250 90 T 450 60 T 600 30" fill="none" stroke="#22d3ee" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </div>
  </div>

  <!-- Recent Orders Table -->
  <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 overflow-x-auto">
    <h2 class="text-lg font-bold text-white mb-4">Live Execution Ledger</h2>
    <table class="w-full text-left text-xs">
      <thead>
        <tr class="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
          <th class="pb-3">Timestamp</th>
          <th class="pb-3">Asset Pair</th>
          <th class="pb-3">Type</th>
          <th class="pb-3">Volume</th>
          <th class="pb-3">Executed Price</th>
          <th class="pb-3">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-800/60 text-slate-200">
        <tr>
          <td class="py-3 font-mono text-slate-400">07:38:12</td>
          <td class="py-3 font-semibold text-white">BTC / USDT</td>
          <td class="py-3 text-emerald-400 font-bold">BUY</td>
          <td class="py-3">1.45 BTC</td>
          <td class="py-3 font-mono">$68,420.00</td>
          <td class="py-3"><span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">FILLED</span></td>
        </tr>
        <tr>
          <td class="py-3 font-mono text-slate-400">07:36:44</td>
          <td class="py-3 font-semibold text-white">ETH / USD</td>
          <td class="py-3 text-rose-400 font-bold">SELL</td>
          <td class="py-3">14.00 ETH</td>
          <td class="py-3 font-mono">$3,842.50</td>
          <td class="py-3"><span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">FILLED</span></td>
        </tr>
        <tr>
          <td class="py-3 font-mono text-slate-400">07:35:01</td>
          <td class="py-3 font-semibold text-white">SOL / USDT</td>
          <td class="py-3 text-emerald-400 font-bold">BUY</td>
          <td class="py-3">250 SOL</td>
          <td class="py-3 font-mono">$188.30</td>
          <td class="py-3"><span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">FILLED</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`,
      css: `
tbody tr:hover { background-color: rgba(15, 23, 42, 0.6); }
`,
      js: `
// Timeframe switcher simulated interaction
const tfButtons = document.querySelectorAll('#timeframeToggles button');
const chartLine = document.getElementById('chartLine');
const chartArea = document.getElementById('chartArea');

const curves = {
  '1d': {
    line: 'M 0 170 Q 150 140 250 90 T 450 60 T 600 30',
    area: 'M 0 170 Q 150 140 250 90 T 450 60 T 600 30 L 600 200 L 0 200 Z'
  },
  '1w': {
    line: 'M 0 120 Q 150 80 250 140 T 450 90 T 600 40',
    area: 'M 0 120 Q 150 80 250 140 T 450 90 T 600 40 L 600 200 L 0 200 Z'
  },
  '1m': {
    line: 'M 0 160 Q 150 100 250 60 T 450 40 T 600 20',
    area: 'M 0 160 Q 150 100 250 60 T 450 40 T 600 20 L 600 200 L 0 200 Z'
  },
  '1y': {
    line: 'M 0 180 Q 120 150 240 110 T 480 50 T 600 15',
    area: 'M 0 180 Q 120 150 240 110 T 480 50 T 600 15 L 600 200 L 0 200 Z'
  }
};

tfButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tfButtons.forEach(b => {
      b.className = 'px-3 py-1 rounded text-slate-400 hover:text-white';
    });
    btn.className = 'px-3 py-1 rounded bg-slate-800 text-white font-medium';
    const tf = btn.getAttribute('data-tf') || '1d';
    if (curves[tf] && chartLine && chartArea) {
      chartLine.setAttribute('d', curves[tf].line);
      chartArea.setAttribute('d', curves[tf].area);
    }
  });
});
`
    }
  }
];
