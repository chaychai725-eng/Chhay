import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  Globe,
  Activity,
  Users,
  Trash2,
  ExternalLink,
  Check,
  Copy,
  RefreshCw,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Search,
  Lock,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react';
import { AppUser } from '../types';

interface AdminStatsResponse {
  success: boolean;
  config: {
    primaryModel: string;
    enableAutoFailover: boolean;
    temperature: number;
    systemPromptOverride: string;
  };
  metrics: {
    totalSitesDeployed: number;
    totalGenerationRequests: number;
    successRatePercent: number;
    failoversPrevented: number;
    avgLatencyMs: number;
    modelsHealth: Record<string, string>;
  };
  deployedSites: Array<{
    id: string;
    title: string;
    createdAt: number;
    views: number;
    author: string;
    category: string;
    previewUrl: string;
  }>;
  recentLogs: Array<{
    id: string;
    timestamp: number;
    prompt: string;
    modelAttempted: string;
    modelUsed: string;
    latencyMs: number;
    status: 'SUCCESS' | 'FAILOVER_RESOLVED' | 'FAILED';
    language: string;
  }>;
}

interface AdminPortalProps {
  onBackToStudio: () => void;
  onLockAdmin?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStudio, onLockAdmin }) => {
  const [data, setData] = useState<AdminStatsResponse | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'models' | 'sites' | 'users' | 'logs'>('models');
  const [selectedPrimaryModel, setSelectedPrimaryModel] = useState('gemini-3.5-flash');
  const [autoFailover, setAutoFailover] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users'),
      ]);

      if (statsRes.ok) {
        const json: AdminStatsResponse = await statsRes.json();
        setData(json);
        setSelectedPrimaryModel(json.config.primaryModel || 'gemini-3.5-flash');
        setAutoFailover(json.config.enableAutoFailover ?? true);
        setTemperature(json.config.temperature ?? 0.7);
      }

      if (usersRes.ok) {
        const usersJson = await usersRes.json();
        setUsers(usersJson.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryModel: selectedPrimaryModel,
          enableAutoFailover: autoFailover,
          temperature,
        }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to update admin config:', err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleDeleteSite = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deployed website?')) return;
    try {
      await fetch(`/api/admin/deployed-site/${id}`, { method: 'DELETE' });
      fetchStats();
    } catch (err) {
      console.error('Failed to delete site:', err);
    }
  };

  const handleApproveUser = async (userId: string, userName: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/approve`, { method: 'POST' });
      if (res.ok) {
        setActionNotice(`បានអនុញ្ញាតគណនី "${userName}" ជោគជ័យ! អ្នកប្រើប្រាស់អាច Login បានឥឡូវនេះ។`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to approve user:', err);
    }
  };

  const handleRejectUser = async (userId: string, userName: string) => {
    if (!confirm(`តើអ្នកពិតជាចង់បដិសេធគណនី "${userName}" មែនទេ?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}/reject`, { method: 'POST' });
      if (res.ok) {
        setActionNotice(`បានបដិសេធគណនី "${userName}"`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to reject user:', err);
    }
  };

  const handleCopy = async (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pendingUsers = users.filter((u) => u.status === 'PENDING_APPROVAL');
  const activeUsers = users.filter((u) => u.status === 'APPROVED');

  const filteredSites = (data?.deployedSites || []).filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#070b14] h-full overflow-hidden text-slate-100 font-sans select-none">
      {/* Top Admin Header */}
      <div className="h-16 border-b border-slate-800/80 bg-[#090e1b] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToStudio}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ត្រឡប់ទៅ Studio</span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
                <span>QuantYield Website Admin</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ផ្ទាំងគ្រប់គ្រង
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {onLockAdmin && (
            <button
              onClick={onLockAdmin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-800/40 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ចាក់សោ Admin (Lock)</span>
            </button>
          )}

          <button
            onClick={fetchStats}
            title="Refresh Admin Data"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Status: Active & Failover Protected</span>
          </div>
        </div>
      </div>

      {/* Action Toast Notice */}
      {actionNotice && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-300 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Admin Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Deployed Websites</span>
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2">
              {data?.metrics.totalSitesDeployed ?? 1}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">Live in Cloud Sandbox</div>
          </div>

          <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Pending Approvals</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-300 mt-2">
              {pendingUsers.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Users waiting for approval</div>
          </div>

          <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Spikes Prevented</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-cyan-300 mt-2">
              {data?.metrics.failoversPrevented ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Automatic 503 failovers</div>
          </div>

          <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>AI Success Rate</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">
              {data?.metrics.successRatePercent ?? 100}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">High availability</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
          <button
            onClick={() => setActiveTab('models')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'models'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>គ្រប់គ្រង Model AI & Failover</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>អ្នកប្រើប្រាស់ & អនុញ្ញាត</span>
            {pendingUsers.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                {pendingUsers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'sites'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>គេហទំព័រដែលបាន Deploy ({data?.deployedSites.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'logs'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>កំណត់ត្រា Logs ({data?.recentLogs.length || 0})</span>
          </button>
        </div>

        {/* TAB: USERS & APPROVALS (NEW USER WORKFLOW) */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Pending Approvals Section */}
            <div className="bg-[#0b101d] rounded-2xl border border-amber-500/40 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>បញ្ជីស្នើសុំរង់ចាំការអនុញ្ញាត (Pending Approval Requests)</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    អ្នកប្រើប្រាស់ដែលបានចុះឈ្មោះ ហើយកំពុងរង់ចាំការយល់ព្រមពី Admin មុននឹងអាចប្រើប្រាស់ Website បាន
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  {pendingUsers.length} នាក់កំពុងរង់ចាំ
                </span>
              </div>

              {pendingUsers.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs">
                  ✓ គ្មានសំណើរង់ចាំការអនុញ្ញាតនៅពេលនេះទេ។ គណនីទាំងអស់ត្រូវបានដោះស្រាយរួចរាល់។
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Purpose / Notes</th>
                        <th className="pb-3">Registered At</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {pendingUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/50">
                          <td className="py-3 font-bold text-white">{u.name}</td>
                          <td className="py-3 font-mono text-cyan-300">{u.email}</td>
                          <td className="py-3 text-slate-300 max-w-xs truncate">{u.notes || '-'}</td>
                          <td className="py-3 text-slate-400">
                            {new Date(u.registeredAt).toLocaleString()}
                          </td>
                          <td className="py-3 text-right space-x-2">
                            <button
                              onClick={() => handleApproveUser(u.id, u.name)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 inline-flex items-center space-x-1"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>អនុញ្ញាត (Approve)</span>
                            </button>
                            <button
                              onClick={() => handleRejectUser(u.id, u.name)}
                              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 text-xs font-semibold inline-flex items-center space-x-1"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>បដិសេធ (Reject)</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Approved Users Section */}
            <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-white">អ្នកប្រើប្រាស់ដែលបានអនុញ្ញាតរួច (Approved Users)</h2>
                <p className="text-xs text-slate-400">គណនីដែលមានសិទ្ធិចូលប្រើប្រាស់ AI Website Builder ពេញលេញ</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Approved Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {activeUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/50">
                        <td className="py-3 font-bold text-white flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white">
                            {u.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span>{u.name}</span>
                        </td>
                        <td className="py-3 font-mono text-slate-300">{u.email}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            ACTIVE
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">
                          {u.approvedAt ? new Date(u.approvedAt).toLocaleDateString() : 'System Default'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: MODEL CONTROLS & 503 PROTECTION */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/40 shadow-xl">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    ការការពារបញ្ហា 503 Spikes ដោយស្វ័យប្រវត្តិ (Active 503 Failover Protection)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    នៅពេលម៉ូឌែល Gemini 3.8 Flash ជួបប្រទះការកកស្ទះ (High Demand 503) នៅលើ Cloud របស់ Google ប្រព័ន្ធ QuantYield នឹងប្តូរដោយស្វ័យប្រវត្តទៅកាន់ <strong>Gemini 3.5 Flash</strong> ឬ <strong>Gemini 3 Flash Preview</strong> ភ្លាមៗ ដើម្បីធានាថាការបង្កើតគេហទំព័ររបស់អ្នកដំណើរការជានិច្ច គ្មានការរអាក់រអួលឡើយ។
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white">Primary Generation Model</h2>
                  <p className="text-xs text-slate-400">Choose the default model that initiates generation prompts.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveConfig}
                    disabled={isSavingConfig}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                  >
                    {saveSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Sliders className="w-3.5 h-3.5" />}
                    <span>{saveSuccess ? 'បានរក្សាទុក (Saved!)' : 'រក្សាទុកការកំណត់ (Save Config)'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedPrimaryModel('gemini-3.5-flash')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPrimaryModel === 'gemini-3.5-flash'
                      ? 'bg-indigo-950/50 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">Gemini 3.5 Flash</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      ONLINE (STABLE)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ម៉ូឌែលដែលដំណើរការលឿនបំផុត និងមានស្ថេរភាពខ្ពស់ មិនងាយមានបញ្ហា 503 High Demand Spikes។
                  </p>
                </div>

                <div
                  onClick={() => setSelectedPrimaryModel('gemini-3.8-flash')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPrimaryModel === 'gemini-3.8-flash'
                      ? 'bg-indigo-950/50 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">Gemini 3.8 Flash</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                      CASCADE GUARDED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ម៉ូឌែលជំនាន់ចុងក្រោយ បំពាក់ដោយប្រព័ន្ធ Auto-Cascade Fallback ប្រសិនបើ Google ជួបបញ្ហា Demand Spike។
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Auto Failover Protection</span>
                    <span className="text-cyan-400 font-bold">{autoFailover ? 'ENABLED' : 'DISABLED'}</span>
                  </div>
                  <button
                    onClick={() => setAutoFailover(!autoFailover)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      autoFailover
                        ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {autoFailover ? '✓ ការពារបញ្ហា 503 ដោយស្វ័យប្រវត្តិ (Active)' : '✕ Disabled'}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Creativity Temperature</span>
                    <span className="text-cyan-400 font-mono font-bold">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DEPLOYED SITES */}
        {activeTab === 'sites' && (
          <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-white">គ្រប់គ្រងគេហទំព័រដែលបាន Deploy</h2>
                <p className="text-xs text-slate-400">បញ្ជីគេហទំព័រទាំងអស់ដែលត្រូវបានបង្កើត និងបង្ហោះលើ Live Sandbox</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="ស្វែងរកគេហទំព័រ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3">Site Title & ID</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Author</th>
                    <th className="pb-3">Views</th>
                    <th className="pb-3">Deployed At</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredSites.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        គ្មានគេហទំព័រត្រូវបង្ហាញទេ។
                      </td>
                    </tr>
                  ) : (
                    filteredSites.map((site) => (
                      <tr key={site.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-white">{site.title}</div>
                          <div className="text-[10px] font-mono text-cyan-400">{site.id}</div>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[10px] uppercase">
                            {site.category}
                          </span>
                        </td>
                        <td className="py-3 text-slate-300">{site.author}</td>
                        <td className="py-3 font-mono font-bold text-emerald-400">{site.views}</td>
                        <td className="py-3 text-slate-400">
                          {new Date(site.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleCopy(site.previewUrl, site.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                            title="Copy Live Link"
                          >
                            {copiedId === site.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <a
                            href={site.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 inline-flex rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                            title="Open Preview"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteSite(site.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50"
                            title="Delete Deployment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white">កំណត់ត្រាប្រតិបត្តិការ AI (Generation Logs)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Prompt Request</th>
                    <th className="pb-3">Model Used</th>
                    <th className="pb-3">Latency</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {(!data?.recentLogs || data.recentLogs.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        គ្មានកំណត់ត្រា Logs នៅឡើយទេ។
                      </td>
                    </tr>
                  ) : (
                    data.recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3 font-mono text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-3 max-w-xs truncate text-white">
                          <span className="font-medium">{log.prompt}</span>
                          <span className="ml-2 text-[10px] text-slate-500">({log.language})</span>
                        </td>
                        <td className="py-3 font-mono text-cyan-300">{log.modelUsed}</td>
                        <td className="py-3 font-mono text-slate-400">{log.latencyMs}ms</td>
                        <td className="py-3">
                          {log.status === 'SUCCESS' && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              SUCCESS
                            </span>
                          )}
                          {log.status === 'FAILOVER_RESOLVED' && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                              FAILOVER RESOLVED
                            </span>
                          )}
                          {log.status === 'FAILED' && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                              FAILED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
