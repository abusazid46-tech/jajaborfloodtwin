import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Eye, EyeOff, Shield } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemo = () => navigate('/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center grid-bg" style={{ background: '#060c17' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      </div>

      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/40 mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Jajabor FloodTwin</h1>
          <p className="text-sm text-blue-400 font-medium mt-1">AI-Enabled Digital Twin for Flood Intelligence</p>
          <p className="text-xs text-slate-600 mt-2 italic">See. Simulate. Prepare.</p>
        </div>

        {/* Demo notice */}
        <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-950/40 border border-amber-800/40">
          <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-400">
            <strong>Prototype System</strong> — NESFIC-D-18 MVP. Not an official government system.
          </span>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="glass-card p-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="demo@jajabor.ai"
              className="w-full bg-slate-900/80 border border-blue-900/40 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-blue-900/40 text-slate-200 text-sm rounded-xl px-4 py-3 pr-11 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : 'Enter Dashboard'}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <button
            type="button"
            onClick={handleDemo}
            className="w-full py-3 rounded-xl border border-blue-700/50 text-blue-400 text-sm font-semibold hover:bg-blue-900/20 transition-colors"
          >
            Continue as Demo User
          </button>
        </form>

        <p className="text-[10px] text-slate-700 text-center mt-5">
          Jajabor AI · NESFIC-D-18 Prototype · v0.1-MVP<br />
          Not an operational government system
        </p>
      </div>
    </div>
  );
}
