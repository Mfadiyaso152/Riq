import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword, isDemo } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isDemo) {
        setSent(true);
      } else {
        await resetPassword(email);
        setSent(true);
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ. يرجى التأكد من البريد الإلكتروني.');
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
        <h2 className="text-2xl sm:text-3xl font-black text-[#173F35]">استعادة كلمة المرور</h2>
        <p className="text-xs text-[#747B71] mt-2">أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-[#173F35]/10">

          {sent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#173F35] mb-2">تم إرسال التعليمات بنجاح</h3>
              <p className="text-xs text-[#747B71] mb-6">يرجى التحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور.</p>
              <Link
                to="/login"
                className="inline-block bg-[#173F35] text-white py-3 px-6 rounded-xl font-bold text-xs hover:bg-[#173F35]/90 transition-colors"
              >
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <>
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#173F35] hover:bg-[#173F35]/90 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                >
                  <span>إرسال تعليمات الاستعادة</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center mt-6">
                <Link to="/login" className="text-xs font-bold text-[#173F35] hover:underline">
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
