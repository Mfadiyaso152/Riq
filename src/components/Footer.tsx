import React from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#173F35] text-[#F7F4ED] pt-16 pb-12 border-t border-[#173F35]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#F7F4ED] p-1.5 rounded-xl">
                <Logo size="sm" showText={false} />
              </div>
              <span className="text-2xl font-black text-white">رَقّ</span>
            </div>
            <p className="text-sm text-[#F7F4ED]/85 max-w-sm leading-relaxed mb-6">
              منصة رَقّ تتيح لك إنشاء صفحات مخصصة، منيو مطاعم، سياسات، وخدمات ونشرها برابط دائم ورمز QR بكل سهولة واحترافية.
            </p>
            <p className="text-xs text-[#D9EF83] font-medium">
              «صفحتك، برابط ولمسة.»
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm text-[#F7F4ED]/80">
              <li>
                <Link to="/" className="hover:text-[#D9EF83] transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#D9EF83] transition-colors">مكتبة القوالب</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#D9EF83] transition-colors">تسجيل الدخول</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#D9EF83] transition-colors">إنشاء حساب جديد</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">القوالب المتاحة</h4>
            <ul className="space-y-2.5 text-sm text-[#F7F4ED]/80">
              <li>منيو مطعم ومقاهي</li>
              <li>سياسة الضمان المعتمد</li>
              <li>سياسة الاستبدال والاسترجاع</li>
              <li>صفحة الخدمات والأعمال</li>
              <li>صفحة مخصصة متقدمة</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F4ED]/70 gap-4">
          <p>© {new Date().getFullYear()} منصة رِقّ (Raq). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <a href="https://wathiq.site" target="_blank" rel="noreferrer" className="hover:text-[#D9EF83] transition-colors">صُنع بواسطة Wathiq</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
