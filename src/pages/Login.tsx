import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, isDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من البريد وكلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'تعذر تسجيل الدخول بواسطة Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Tajawal',sans-serif]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black text-[#173F35]">تسجيل الدخول إلى حسابك</h2>
        <p className="text-xs text-[#747B71] mt-2">أهلاً بك مجدداً، أدخل بياناتك للمتابعة إلى لوحة التحكم</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-[#173F35]/10">
          
          {isDemo && (
            <div className="mb-6 bg-[#D9EF83]/30 border border-[#D9EF83] p-3 rounded-2xl text-xs text-[#173F35] flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-[#173F35]" />
              <span>وضع التجربة الفورية مفعل. يمكنك الضغط مباشرة على دخول أو استخدام حساب تجريبي.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#173F35] mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-[#747B71]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-3 pr-10 pl-4 text-xs text-[#173F35] outline-none focus:border-[#173F35] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#173F35]">كلمة المرور</label>
                <Link to="/forgot-password" className="text-xs text-[#747B71] hover:text-[#173F35]">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-[#747B71]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-3 pr-10 pl-4 text-xs text-[#173F35] outline-none focus:border-[#173F35] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#173F35] hover:bg-[#173F35]/90 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <span>تسجيل الدخول</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#747B71]/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#747B71]">أو المتابعة عبر</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="mt-4 w-full bg-[#F7F4ED] hover:bg-[#F7F4ED]/80 text-[#173F35] border border-[#747B71]/20 py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.18v3.15C3.17 21.32 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.39-1.49-.39-2.27s.14-1.55.39-2.27V6.58H1.18C.43 8.09 0 9.8 0 12s.43 3.91 1.18 5.42l4.1-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.68 1.18 6.58l4.1 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>المتابعة باستخدام Google</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#747B71] mt-8">
            ليس لديك حساب بعد؟{' '}
            <Link to="/register" className="font-bold text-[#173F35] hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};
