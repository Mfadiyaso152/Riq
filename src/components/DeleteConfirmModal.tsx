import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDanger?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'حذف',
  isDanger = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#F7F4ED] relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-[#747B71] hover:text-[#173F35] bg-[#F7F4ED] p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${isDanger ? 'bg-red-100 text-red-600' : 'bg-[#D9EF83]/55 text-[#173F35]'}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-[#173F35] mb-2">{title}</h3>
        <p className="text-sm text-[#747B71] mb-6 leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#F7F4ED] hover:bg-[#F7F4ED]/85 text-[#173F35] font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 text-white font-medium py-2.5 rounded-xl text-sm transition-colors ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-[#173F35] hover:bg-[#173F35]/90'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
