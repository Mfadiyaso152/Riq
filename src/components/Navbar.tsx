import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogIn, UserPlus, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isDemo } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/templates" className="text-sm font-medium text-[#173F35] hover:text-[#173F35]/70 transition-colors">
            القوالب
          </Link>
          <a href="/#how-it-works" className="text-sm font-medium text-[#747B71] hover:text-[#173F35] transition-colors">
            كيف يعمل؟
          </a>
        </nav>

        {/* Actions / Auth */}
        <div className="flex items-center gap-3">
          {isDemo && (
            <span className="hidden lg:inline-flex items-center gap-1.5 bg-[#D9EF83]/50 text-[#173F35] px-3 py-1 rounded-full text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> وضع التجربة الفورية
            </span>
          )}

          {user ? (
            <Link
              to="/dashboard"
              className="bg-[#173F35] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-[#173F35]/90 transition-colors shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-[#173F35] hover:bg-[#F7F4ED] px-4 py-2.5 rounded-xl transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="bg-[#D9EF83] text-[#173F35] hover:bg-[#cbe370] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
              >
                ابدأ الآن
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
