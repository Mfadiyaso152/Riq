import React, { useRef, useState } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Download, ExternalLink, QrCode } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
  pageTitle: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, pageId, pageTitle }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const publicUrl = `https://rip.wathiq.site/p/${pageId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadPNG = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `raq-qr-${pageId}.png`;
    link.href = url;
    link.click();
  };

  const downloadSVG = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `raq-qr-${pageId}.svg`;
    link.href = url;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#F7F4ED] relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-[#747B71] hover:text-[#173F35] bg-[#F7F4ED] p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D9EF83]/40 text-[#173F35] rounded-xl mb-3">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#173F35]">رمز الاستجابة السريعة (QR)</h3>
          <p className="text-sm text-[#747B71] mt-1">{pageTitle}</p>
        </div>

        {/* QR Code Container */}
        <div ref={qrRef} className="flex flex-col items-center justify-center bg-[#F7F4ED] p-6 rounded-2xl mb-6">
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#173F35]/10">
            <QRCodeCanvas
              value={publicUrl}
              size={200}
              level="H"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#173F35"
            />
          </div>
          <span className="text-xs text-[#747B71] mt-3">امسح الكود لفتح الصفحة مباشرة</span>
        </div>

        {/* URL Box */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#747B71] mb-1.5">رابط الصفحة الدائم</label>
          <div className="flex items-center gap-2 bg-[#F7F4ED] p-2 rounded-xl border border-[#747B71]/20">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="w-full bg-transparent text-xs text-[#173F35] font-mono outline-none px-2"
            />
            <button
              onClick={handleCopyLink}
              className="bg-[#173F35] text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-[#173F35]/90 transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'تم النسخ' : 'نسخ'}
            </button>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={downloadPNG}
            className="flex items-center justify-center gap-2 bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] font-medium py-2.5 px-4 rounded-xl text-xs border border-[#747B71]/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            تحميل PNG
          </button>
          <button
            onClick={downloadSVG}
            className="flex items-center justify-center gap-2 bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] font-medium py-2.5 px-4 rounded-xl text-xs border border-[#747B71]/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            تحميل SVG
          </button>
        </div>

        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#173F35] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#173F35]/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          معاينة الصفحة المنشورة
        </a>
      </div>
    </div>
  );
};
