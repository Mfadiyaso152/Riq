import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TemplateType } from '../types';
import { Utensils, ShieldCheck, RefreshCw, Briefcase, FileText, ArrowRight, Check } from 'lucide-react';

export const NewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTemplate = (searchParams.get('template') as TemplateType) || 'menu';
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(initialTemplate);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { createPage } = useAuth();
  const navigate = useNavigate();

  const templatesList = [
    { type: 'menu' as TemplateType, title: 'منيو مطعم ومقاهي', icon: Utensils, desc: 'أطباق، مشروبات، أسعار وصور.' },
    { type: 'warranty' as TemplateType, title: 'سياسة الضمان المعتمد', icon: ShieldCheck, desc: 'فترة ونطاق الضمان وشروط المطالبة.' },
    { type: 'return' as TemplateType, title: 'سياسة الاستبدال والاسترجاع', icon: RefreshCw, desc: 'شروط الإرجاع والمدة والاسترداد.' },
    { type: 'services' as TemplateType, title: 'صفحة الخدمات والأعمال', icon: Briefcase, desc: 'الخدمات الاستشارية والتقنية والأسعار.' },
    { type: 'custom' as TemplateType, title: 'صفحة مخصصة متقدمة', icon: FileText, desc: 'كتل محتوى مرنة وأسئلة شائعة.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pageId = await createPage(selectedTemplate, title.trim());
      navigate(`/dashboard/pages/${pageId}/edit`);
    } catch (e: any) {
      alert(e.message || 'حدث خطأ أثناء إنشاء الصفحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#173F35]/10">
        <span className="bg-[#D9EF83] text-[#173F35] text-xs font-bold px-3.5 py-1.5 rounded-full inline-block mb-3">
          معالج إنشاء صفحة جديدة
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#173F35] mb-2">اختر قالب الصفحة وسمّها</h1>
        <p className="text-xs sm:text-sm text-[#747B71]">ابدأ باختيار أحد القوالب الاحترافية ثم قم بتخصيص محتواها في الخطوة التالية.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-[#173F35] mb-3">1. اختر القالب المناسب</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesList.map((tpl) => {
              const Icon = tpl.icon;
              const isSelected = selectedTemplate === tpl.type;
              return (
                <div
                  key={tpl.type}
                  onClick={() => setSelectedTemplate(tpl.type)}
                  className={`bg-white rounded-2xl p-5 cursor-pointer border-2 transition-all flex flex-col justify-between ${
                    isSelected ? 'border-[#173F35] shadow-md bg-[#F7F4ED]/40' : 'border-[#173F35]/10 hover:border-[#173F35]/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#173F35] text-[#D9EF83]' : 'bg-[#F7F4ED] text-[#173F35]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 bg-[#173F35] text-[#D9EF83] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#173F35] mb-1">{tpl.title}</h3>
                    <p className="text-xs text-[#747B71] leading-relaxed">{tpl.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#173F35]/10 space-y-4">
          <label className="block text-sm font-bold text-[#173F35]">2. عنوان الصفحة (اختياري)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: منيو مطعم الذواقة، سياسة ضمان أجهزة آبل..."
            className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl py-3 px-4 text-xs sm:text-sm text-[#173F35] outline-none focus:border-[#173F35]"
          />
          <p className="text-xs text-[#747B71]">إذا تركته فارغاً، سيتم استخدام العنوان الافتراضي للقالب.</p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-white hover:bg-gray-50 text-[#173F35] border border-[#747B71]/20 px-6 py-3.5 rounded-xl text-xs font-bold transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#173F35] hover:bg-[#173F35]/90 text-white px-8 py-3.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>{loading ? 'جاري الإنشاء...' : 'الانتقال إلى محرر الصفحة'}</span>
            <ArrowRight className="w-4 h-4 text-[#D9EF83]" />
          </button>
        </div>
      </form>
    </div>
  );
};
