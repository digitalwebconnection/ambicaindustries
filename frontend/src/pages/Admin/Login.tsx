import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminService } from '@/services/adminService';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear inputs and error on mount to prevent any auto-filled or residual data
  useEffect(() => {
    setEmail('');
    setPassword('');
    setError(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    // 1. Strict input validation
    if (!cleanEmail) {
      setError('Please enter your admin email address.');
      toast.error('Please enter your admin email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please provide a valid email format (e.g. admin@ambicaindustry.com).');
      toast.error('Please provide a valid email format.');
      return;
    }

    if (!password) {
      setError('Please enter your admin password.');
      toast.error('Please enter your admin password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 2. Perform authenticated login handshake
      await adminService.login(cleanEmail, password);

      // 3. Verify server token authenticity & admin session before navigating
      const verifiedAdmin = await adminService.verifyAuth();
      if (!verifiedAdmin) {
        throw new Error('Authentication verification failed. Access denied.');
      }

      toast.success(`Welcome back, ${verifiedAdmin.name || 'Ambica Industries'}!`);
      navigate('/admin');
    } catch (err) {
      const msg = (err as Error).message || 'Invalid admin credentials. Access denied.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-slate-800 to-slate-950 opacity-90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-dark/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white/98 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Ambica Industry
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
            Administration &amp; Content Portal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form with autofill prevention */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          {/* Hidden honeypot / autofill dummy inputs to block browser credential autofill */}
          <input
            type="text"
            name="fake_username_remember"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <input
            type="password"
            name="fake_password_remember"
            tabIndex={-1}
            autoComplete="new-password"
            className="hidden"
            aria-hidden="true"
          />

          {/* Email Field */}
          <div>
            <label
              htmlFor="admin_login_identity"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Admin Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="admin_login_identity"
                name="admin_login_identity"
                type="email"
                required
                autoComplete="off"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#f8fafc_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="admin_login_secret"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="admin_login_secret"
                name="admin_login_secret"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#f8fafc_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-accent-red/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-accent-red transition-colors"
          >
            &larr; Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
