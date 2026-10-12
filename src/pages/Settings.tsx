import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, CheckCircle, AlertCircle, Sparkles, Send } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, sendVerificationEmail, isDemo } = useAuth();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendVerification = async () => {
    setLoading(true);
    try {
      await sendVerificationEmail();
      setSent(true);
    } catch (e: any) {
      alert(e.message || 'تعذر إرسال رسالة التحقق');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#173F35]/10">
        <span className="bg-[#D9EF83] text-[#173F35] text-xs font-bold px-3.5 py-1.5 rounded-full inline-block mb-3">
          إعدادات الحساب والملف الشخصي
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#173F35] mb-2">إعدادات الحساب</h1>
        <p className="text-xs sm:text-sm text-[#747B71]">إدارة بيانات حسابك وحالة التحقق من البريد الإلكتروني.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#173F35]/10 space-y-6">
        {isDemo && (
          <div className="bg-[#D9EF83]/30 border border-[#D9EF83] p-4 rounded-2xl text-xs text-[#173F35] flex items-center gap-3">
            <Sparkles className="w-5 h-5 shrink-0 text-[#173F35]" />
            <div>
              <span className="font-bold block mb-0.5">وضع التجربة الفورية مفعل</span>
              <span>أنت تستخدم حساباً تجريبياً افتراضياً. عند ربط مشروع Firebase حقيقي، ستظهر هنا بيانات حسابك الفعلية.</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#173F35] mb-1.5">الاسم الكامل</label>
            <div className="relative">
              <User className="absolute right-3.5 top-3.5 w-4 h-4 text-[#747B71]" />
              <input
                type="text"
                readOnly
                value={user?.displayName || ''}
                className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-3 pr-10 pl-4 text-xs text-[#173F35] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#173F35] mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-[#747B71]" />
              <input
                type="email"
                readOnly
                value={user?.email || ''}
                className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-3 pr-10 pl-4 text-xs text-[#173F35] outline-none"
              />
            </div>
          </div>

          <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#173F35]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${user?.emailVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {user?.emailVerified ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#173F35]">حالة التحقق من البريد</h4>
                <p className="text-[11px] text-[#747B71]">
                  {user?.emailVerified ? 'تم التحقق من بريدك الإلكتروني بنجاح.' : 'لم يتم التحقق من بريدك الإلكتروني بعد.'}
                </p>
              </div>
            </div>

            {!user?.emailVerified && !isDemo && (
              <button
                onClick={handleSendVerification}
                disabled={loading || sent}
                className="bg-[#173F35] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#173F35]/90 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sent ? 'تم الإرسال' : 'إرسال رابط التحقق'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
