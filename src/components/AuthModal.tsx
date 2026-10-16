import React, { useState } from 'react';
import {
  X,
  UserPlus,
  LogIn,
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { AppUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AppUser | null;
  onLoginSuccess: (user: AppUser) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'pending'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, notes }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingEmail(email);
        setTab('pending');
      } else {
        setError(data.message || 'ការចុះឈ្មោះមិនបានជោគជ័យទេ។');
      }
    } catch (err: any) {
      setError('មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើបានទេ។');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else if (data.status === 'PENDING_APPROVAL') {
        setPendingEmail(email);
        setTab('pending');
      } else {
        setError(data.message || 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។');
      }
    } catch (err: any) {
      setError('មិនអាចចូលប្រើប្រាស់បានទេ។');
    } finally {
      setLoading(false);
    }
  };

  const checkPendingStatus = async () => {
    if (!pendingEmail) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else if (data.status === 'PENDING_APPROVAL') {
        setError('គណនីរបស់អ្នកនៅតែស្ថិតក្នុងស្ថានភាពរង់ចាំការអនុញ្ញាតពី Admin នៅឡើយ។');
      } else {
        setError(data.message || 'ស្ថានភាពគណនីមិនទាន់ត្រូវបានអនុញ្ញាត។');
      }
    } catch (err) {
      setError('មានបញ្ហាក្នុងការពិនិត្យស្ថានភាព។');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher (Login / Register) when not in pending state */}
        {tab !== 'pending' && (
          <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
            <button
              onClick={() => {
                setTab('register');
                setError('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                tab === 'register'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>ចុះឈ្មោះថ្មី (Register)</span>
            </button>

            <button
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                tab === 'login'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>ចូលប្រើ (Login)</span>
            </button>
          </div>
        )}

        {/* REGISTER TAB */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-xl font-bold text-white">បង្កើតគណនីប្រើប្រាស់ QuantYield</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ដើម្បីសុវត្ថិភាព រាល់គណនីថ្មីតម្រូវឱ្យមានការអនុញ្ញាតពី Admin ជាមុនសិន។
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">ឈ្មោះពេញ (Full Name)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ឧ. សុខា ចាន់ថន"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">អ៊ីមែល (Email)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">ពាក្យសម្ងាត់ (Password)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">គោលបំណងនៃការប្រើប្រាស់ (Purpose)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ឧ. បង្កើតគេហទំព័រអាជីវកម្ម ឬហាងទំនិញ"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'កំពុងបង្កើត...' : 'ចុះឈ្មោះ និងស្នើសុំការអនុញ្ញាត (Register)'}</span>
            </button>
          </form>
        )}

        {/* LOGIN TAB */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-xl font-bold text-white">ចូលប្រើប្រាស់ QuantYield AI</h3>
              <p className="text-xs text-slate-400">បញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់ដែលបានអនុញ្ញាត</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">អ៊ីមែល (Email)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">ពាក្យសម្ងាត់ (Password)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'កំពុងពិនិត្យ...' : 'ចូលប្រើប្រាស់ (Log In)'}</span>
            </button>

            {/* Shortcut for Owner Chay Chai */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('chaychai725@gmail.com');
                  setPassword('admin');
                }}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                ចូលដោយផ្ទាល់ជា Owner (Chay Chai) &rarr;
              </button>
            </div>
          </form>
        )}

        {/* PENDING APPROVAL TAB */}
        {tab === 'pending' && (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-lg shadow-amber-500/20">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PENDING ADMIN APPROVAL
              </span>
              <h3 className="text-xl font-bold text-white">រង់ចាំការអនុញ្ញាតពី Admin</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                គណនីរបស់អ្នក (<span className="text-cyan-300 font-mono">{pendingEmail}</span>) ត្រូវបានចុះឈ្មោះដោយជោគជ័យ! សូមរង់ចាំការអនុញ្ញាតពី Admin ជាមុនសិន ទើបអាចចូលប្រើប្រាស់បង្កើតគេហទំព័របាន។
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 text-xs">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={checkPendingStatus}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/30"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'កំពុងពិនិត្យ...' : 'ពិនិត្យស្ថានភាពម្តងទៀត (Check Approval)'}</span>
              </button>

              <button
                onClick={() => setTab('login')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-all border border-slate-800"
              >
                ប្តូរគណនី ឬចូលប្រើវិញ
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Admin អាចអនុញ្ញាតគណនីរបស់អ្នកបានតាមរយៈផ្ទាំង Admin គ្រប់គ្រង។
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
