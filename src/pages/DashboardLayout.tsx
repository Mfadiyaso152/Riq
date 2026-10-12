import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user, logout, isDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { label: 'صفحاتي', path: '/dashboard/pages', icon: FileText },
    { label: 'القوالب', path: '/dashboard/pages/new', icon: Layers },
    { label: 'الإعدادات', path: '/dashboard/settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] flex font-['Tajawal',sans-serif]">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#173F35] text-white p-6 shrink-0 fixed inset-y-0 right-0 z-30 shadow-xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#FFFFFF] p-1.5 rounded-xl">
              <Logo size="sm" showText={false} />
            </div>
            <span className="text-xl font-black text-white">رَقّ</span>
          </Link>
          {isDemo && (
            <span className="bg-[#D9EF83] text-[#173F35] text-[10px] font-bold px-2 py-0.5 rounded-md">
              تجريبي
            </span>
          )}
        </div>

        {/* User profile snippet */}
        <div className="bg-white/10 p-3.5 rounded-2xl mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D9EF83] text-[#173F35] font-black flex items-center justify-center text-base shrink-0">
            {user?.displayName?.charAt(0) || 'م'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-white truncate">{user?.displayName || 'مستخدم رَقّ'}</h4>
            <p className="text-[10px] text-[#F7F4ED]/70 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  active 
                    ? 'bg-[#D9EF83] text-[#173F35] shadow-sm' 
                    : 'text-[#F7F4ED]/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#173F35]' : 'text-[#D9EF83]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Create Page Button */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <Link
            to="/dashboard/pages/new"
            className="w-full bg-[#D9EF83] hover:bg-[#cbe370] text-[#173F35] py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء صفحة جديدة</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#173F35] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#FFFFFF] p-1 rounded-lg">
            <Logo size="sm" showText={false} />
          </div>
          <span className="text-lg font-black">رَقّ</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/10 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 bg-[#173F35] text-white p-6 flex flex-col justify-between h-full shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="text-xl font-black">قائمة التنقل</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                        active ? 'bg-[#D9EF83] text-[#173F35]' : 'text-[#F7F4ED]/80 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <Link
                to="/dashboard/pages/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#D9EF83] text-[#173F35] py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء صفحة جديدة</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:mr-64 p-4 sm:p-8 pt-20 lg:pt-8 min-h-screen bg-[#F7F4ED]">
        <div className="max-w-6xl mx-auto pt-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
