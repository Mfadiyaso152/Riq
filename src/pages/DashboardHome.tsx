import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageDocument, TemplateType } from '../types';
import { QRCodeModal } from '../components/QRCodeModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  Edit3, 
  ExternalLink, 
  Copy, 
  Check, 
  Trash2, 
  GlobeOff, 
  CopyPlus, 
  Sparkles,
  Layers,
  CheckCircle,
  Clock
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const { pages, deletePage, unpublishPage, duplicatePage } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modals state
  const [qrModalPage, setQrModalPage] = useState<PageDocument | null>(null);
  const [deleteModalPage, setDeleteModalPage] = useState<PageDocument | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = pages.filter(p => p.status === 'published').length;
  const draftCount = pages.filter(p => p.status === 'draft').length;

  const handleCopyLink = (pageId: string) => {
    const url = `${window.location.origin}/p/${pageId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(pageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTemplateBadge = (type: TemplateType) => {
    switch (type) {
      case 'menu': return { label: 'منيو مطعم', color: 'bg-amber-100 text-amber-800' };
      case 'warranty': return { label: 'سياسة ضمان', color: 'bg-emerald-100 text-emerald-800' };
      case 'return': return { label: 'استبدال واسترجاع', color: 'bg-blue-100 text-blue-800' };
      case 'services': return { label: 'صفحة خدمات', color: 'bg-purple-100 text-purple-800' };
      case 'custom': return { label: 'صفحة مخصصة', color: 'bg-rose-100 text-rose-800' };
      default: return { label: 'صفحة', color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#173F35]/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-[#D9EF83]/60 text-[#173F35] text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
            لوحة التحكم الرئيسية
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#173F35] mb-2">أهلاً بك في منصة رَقّ</h1>
          <p className="text-xs sm:text-sm text-[#747B71]">«صفحتك، برابط ولمسة.» قم بإدارة صفحاتك المنشورة والمسودات بكل سهولة.</p>
        </div>

        <Link
          to="/dashboard/pages/new"
          className="bg-[#173F35] hover:bg-[#173F35]/90 text-white px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D9EF83]" />
          <span>إنشاء صفحة جديدة</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#173F35]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F7F4ED] text-[#173F35] flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747B71]">إجمالي الصفحات</span>
            <h3 className="text-2xl font-black text-[#173F35]">{pages.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#173F35]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747B71]">الصفحات المنشورة</span>
            <h3 className="text-2xl font-black text-[#173F35]">{publishedCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#173F35]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747B71]">المسودات</span>
            <h3 className="text-2xl font-black text-[#173F35]">{draftCount}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#173F35]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-[#747B71]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في الصفحات..."
            className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-2.5 pr-10 pl-4 text-xs text-[#173F35] outline-none focus:border-[#173F35]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#747B71] shrink-0">الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-2 px-3 text-xs text-[#173F35] outline-none font-medium"
          >
            <option value="all">الكل ({pages.length})</option>
            <option value="published">المنشورة ({publishedCount})</option>
            <option value="draft">المسودات ({draftCount})</option>
          </select>
        </div>
      </div>

      {/* Pages List */}
      {filteredPages.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#173F35]/10 shadow-xs">
          <div className="w-16 h-16 bg-[#F7F4ED] text-[#747B71] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#173F35] mb-2">لا توجد صفحات مطابقة</h3>
          <p className="text-xs text-[#747B71] mb-6">ابدأ بإنشاء صفحتك الأولى عبر اختيار قالب جاهز وخصصه خلال دقائق.</p>
          <Link
            to="/dashboard/pages/new"
            className="inline-flex items-center gap-2 bg-[#173F35] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#173F35]/90 transition-colors"
          >
            <Plus className="w-4 h-4 text-[#D9EF83]" />
            <span>إنشاء صفحة جديدة</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPages.map((page) => {
            const badge = getTemplateBadge(page.templateType);
            const isPublished = page.status === 'published';
            const publicUrl = `${window.location.origin}/p/${page.id}`;

            return (
              <div 
                key={page.id} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#173F35]/10 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {isPublished ? 'منشورة' : 'مسودة'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#173F35] mb-1">{page.title}</h3>
                  <p className="text-xs text-[#747B71] font-mono mb-6">المعرف: {page.id}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#173F35]/10">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/dashboard/pages/${page.id}/edit`}
                      className="flex-1 bg-[#173F35] hover:bg-[#173F35]/90 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#D9EF83]" />
                      <span>تعديل</span>
                    </Link>

                    {isPublished && (
                      <>
                        <button
                          onClick={() => setQrModalPage(page)}
                          className="bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] p-2.5 rounded-xl transition-colors"
                          title="رمز QR والرابط"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCopyLink(page.id)}
                          className="bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] p-2.5 rounded-xl transition-colors relative"
                          title="نسخ الرابط"
                        >
                          {copiedId === page.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </>
                    )}

                    <button
                      onClick={async () => {
                        try {
                          await duplicatePage(page.id);
                        } catch (e) {
                          alert('تعذر نسخ الصفحة');
                        }
                      }}
                      className="bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] p-2.5 rounded-xl transition-colors"
                      title="نسخ إلى مسودة جديدة"
                    >
                      <CopyPlus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteModalPage(page)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-colors"
                      title="حذف الصفحة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isPublished && (
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#173F35] hover:underline font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>عرض الصفحة العامة</span>
                      </a>
                      <button
                        onClick={async () => {
                          if (confirm('هل تريد إيقاف نشر هذه الصفحة؟')) {
                            await unpublishPage(page.id);
                          }
                        }}
                        className="text-amber-700 hover:underline"
                      >
                        إلغاء النشر
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {qrModalPage && (
        <QRCodeModal
          isOpen={true}
          onClose={() => setQrModalPage(null)}
          pageId={qrModalPage.id}
          pageTitle={qrModalPage.title}
        />
      )}

      {deleteModalPage && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeleteModalPage(null)}
          onConfirm={async () => {
            await deletePage(deleteModalPage.id);
            setDeleteModalPage(null);
          }}
          title="حذف الصفحة نهائياً"
          message={`هل أنت متأكد من رغبتك في حذف صفحة "${deleteModalPage.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
          confirmText="حذف نهائي"
        />
      )}
    </div>
  );
};
