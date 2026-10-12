import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageDocument } from '../types';
import { TemplateRenderer } from '../templates/TemplateRenderers';
import { Logo } from '../components/Logo';
import { Loader2, AlertCircle, Sparkles, QrCode } from 'lucide-react';
import { QRCodeModal } from '../components/QRCodeModal';

export const PublicPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { getPublishedPage } = useAuth();
  const [page, setPage] = useState<PageDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    if (!pageId) return;
    getPublishedPage(pageId).then((p) => {
      setPage(p);
      setLoading(false);
    });
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center font-['Tajawal',sans-serif]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#173F35] mx-auto" />
          <p className="text-xs text-[#747B71]">جاري تحميل الصفحة المنشورة...</p>
        </div>
      </div>
    );
  }

  if (!page || page.status !== 'published') {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col items-center justify-center p-4 font-['Tajawal',sans-serif]">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-[#173F35]/15 space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-[#173F35]">الصفحة غير متوفرة أو غير منشورة</h1>
          <p className="text-xs text-[#747B71] leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير موجودة، ربما تم حذفها أو إلغاء نشرها من قِبل المالك.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-[#173F35] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#173F35]/90 transition-colors"
            >
              العودة إلى منصة رَقّ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] py-8 px-4 sm:px-6 lg:px-8 font-['Tajawal',sans-serif] flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full flex-1">
        {/* Render the published content */}
        <TemplateRenderer page={page} />
      </div>

      {/* Powered by Raq footer */}
      <footer className="mt-12 text-center py-6 border-t border-[#173F35]/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#747B71]">
        <Link to="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-[#173F35] p-1 rounded-lg">
            <Logo size="sm" showText={false} />
          </div>
          <span className="font-bold text-[#173F35]">تم النشاء عبر منصة رَقّ</span>
        </Link>
        <span className="hidden sm:inline">•</span>
        <span>«صفحتك، برابط ولمسة.»</span>
        <button
          onClick={() => setShowQrModal(true)}
          className="bg-[#D9EF83] text-[#173F35] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-[#cbe370] transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          رمز QR لهذه الصفحة
        </button>
      </footer>

      {showQrModal && (
        <QRCodeModal
          isOpen={true}
          onClose={() => setShowQrModal(false)}
          pageId={page.id}
          pageTitle={page.title}
        />
      )}
    </div>
  );
};
