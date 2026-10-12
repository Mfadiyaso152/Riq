import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Utensils, ShieldCheck, RefreshCw, Briefcase, FileText, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Templates: React.FC = () => {
  const { user } = useAuth();

  const templatesList = [
    {
      type: 'menu',
      title: 'منيو مطعم ومقاهي',
      desc: 'قالب مثالي للمطاعم والكافيهات، يتيح عرض الأطباق والمشروبات والأقسام مع الأسعار والصور وحالة التوفر.',
      icon: Utensils,
      badge: 'الأكثر شعبية',
      features: ['أقسام متعددة', 'صور الأطباق', 'الأسعار والعملات', 'أزرار تواصل واتساب']
    },
    {
      type: 'warranty',
      title: 'سياسة الضمان المعتمد',
      desc: 'قالب رسمي لعرض شروط وفترة ونطاق الضمان للمنتجات والأجهزة لتعزيز ثقة العملاء.',
      icon: ShieldCheck,
      badge: 'رسمي',
      features: ['مدة الضمان', 'نطاق التغطية', 'الاستثناءات', 'آلية المطالبة']
    },
    {
      type: 'return',
      title: 'سياسة الاستبدال والاسترجاع',
      desc: 'قالب احترافي لتوضيح شروط وأحكام الاستبدال والاسترجاع ومدة الإرجاع.',
      icon: RefreshCw,
      badge: 'متجر إلكتروني',
      features: ['شروط القبول', 'المنتجات المستثناة', 'طريقة الاسترداد', 'التواصل']
    },
    {
      type: 'services',
      title: 'صفحة الخدمات والأعمال',
      desc: 'قالب مخصص للمستقلين والشركات لعرض الخدمات الاستشارية والتقنية والأسعار.',
      icon: Briefcase,
      badge: 'مهني',
      features: ['قائمة الخدمات', 'الأسعار الاختيارية', 'الوصف التفصيلي', 'أزرار اتصال']
    },
    {
      type: 'custom',
      title: 'صفحة مخصصة متقدمة',
      desc: 'صفحة مرنة تتيح لك إضافة كتل محتوى متنوعة (عناوين، فقرات، روابط، أسئلة شائعة).',
      icon: FileText,
      badge: 'مرن جداً',
      features: ['كتل محتوى مرنة', 'أسئلة شائعة (FAQ)', 'روابط وأزرار', 'تنسيق حر']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#173F35] flex flex-col font-['Tajawal',sans-serif]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-[#D9EF83] text-[#173F35] text-xs font-bold px-3.5 py-1.5 rounded-full inline-block mb-3">
            مكتبة القوالب الجاهزة
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#173F35] mb-4">
            اختر القالب الأنسب لفكرتك
          </h1>
          <p className="text-sm text-[#747B71] leading-relaxed">
            جميع القوالب مصممة بعناية فائقة لتتوافق مع الهوية البصرية لمنصة رَقّ، وتدعم التخصيص الكامل والنشر الفوري.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templatesList.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <div 
                key={tpl.type} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#173F35]/10 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#F7F4ED] rounded-2xl flex items-center justify-center text-[#173F35] group-hover:bg-[#D9EF83] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-[#173F35]/5 text-[#173F35] px-3 py-1 rounded-full">
                      {tpl.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#173F35] mb-2">{tpl.title}</h3>
                  <p className="text-xs text-[#747B71] leading-relaxed mb-6">{tpl.desc}</p>

                  <div className="space-y-2 mb-8">
                    {tpl.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#173F35]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={user ? `/dashboard/pages/new?template=${tpl.type}` : '/register'}
                  className="w-full bg-[#173F35] hover:bg-[#173F35]/90 text-white py-3 px-4 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-2 group-hover:bg-[#173F35]"
                >
                  <span>استخدام هذا القالب</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};
