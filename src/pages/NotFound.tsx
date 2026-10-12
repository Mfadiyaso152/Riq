import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { FileQuestion, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F4ED] flex flex-col items-center justify-center p-4 font-['Tajawal',sans-serif]">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-[#173F35]/15 space-y-4">
        <Link to="/" className="inline-block mb-2">
          <Logo size="lg" />
        </Link>
        <div className="w-16 h-16 bg-[#D9EF83]/60 text-[#173F35] rounded-2xl flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-[#173F35]">الصفحة غير موجودة (404)</h1>
        <p className="text-xs text-[#747B71] leading-relaxed">
          عذراً، الرابط الذي تدخله غير صحيح أو أن الصفحة غير متوفرة.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#173F35] text-white px-6 py-3.5 rounded-xl text-xs font-bold hover:bg-[#173F35]/90 transition-colors shadow-sm"
          >
            <span>العودة إلى الرئيسية</span>
            <ArrowRight className="w-4 h-4 text-[#D9EF83]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
