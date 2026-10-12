import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { 
  Sparkles, 
  ArrowRight, 
  QrCode, 
  CheckCircle, 
  Utensils, 
  ShieldCheck, 
  Briefcase, 
  FileText, 
  Share2, 
  Smartphone, 
  Edit3, 
  Layers 
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#173F35] flex flex-col font-['Tajawal',sans-serif]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right text content */}
            <div className="lg:col-span-6 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 bg-[#D9EF83]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#173F35] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#173F35]" />
                <span>صفحات بسيطة، إمكانيات كثيرة</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#173F35] leading-[1.15]">
                أنشئ صفحتك <br />
                <span className="text-[#173F35]/90">وشاركها مع العالم</span>
              </h1>

              <p className="text-lg text-[#747B71] leading-relaxed max-w-lg">
                منيو، ضمان، خدمات وأكثر… اختر قالبك وخصصه خلال دقائق برابط دائم ورمز QR احترافي.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="bg-[#D9EF83] text-[#173F35] hover:bg-[#cbe370] px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>أنشئ صفحتك</span>
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/templates"
                  className="bg-white hover:bg-[#173F35]/5 text-[#173F35] border border-[#173F35]/15 px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-xs"
                >
                  استعرض القوالب
                </Link>
              </div>

              {/* Color palettes preview from reference */}
              <div className="pt-6 border-t border-[#173F35]/10 flex items-center gap-4">
                <span className="text-xs text-[#747B71] font-medium">لوحة الألوان الأساسية:</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#173F35] shadow-xs" title="#173F35"></div>
                  <div className="w-6 h-6 rounded-full bg-[#D9EF83] shadow-xs" title="#D9EF83"></div>
                  <div className="w-6 h-6 rounded-full bg-[#F7F4ED] border border-[#747B71]/30 shadow-xs" title="#F7F4ED"></div>
                  <div className="w-6 h-6 rounded-full bg-[#747B71] shadow-xs" title="#747B71"></div>
                </div>
              </div>
            </div>

            {/* Left Visual Preview (Matching Reference) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none flex items-center justify-center gap-4">
                
                {/* Menu Preview Card */}
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-[#173F35]/10 w-56 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-3 text-[#173F35]">
                    <div className="w-8 h-8 rounded-xl bg-[#D9EF83]/60 flex items-center justify-center font-bold">🍽️</div>
                    <div>
                      <h4 className="font-bold text-xs">منيو المطعم</h4>
                      <span className="text-[10px] text-[#747B71]">أطباق شهية</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-[#F7F4ED] p-2.5 rounded-xl flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1621996346565-e3d5d6284ba9?w=100&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[11px] font-bold truncate">مكرونة ألفريدو</h5>
                        <span className="text-[10px] text-[#173F35] font-extrabold">28 ريال</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warranty Preview Card */}
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-[#173F35]/10 w-56 transform rotate-3 hover:rotate-0 transition-transform duration-300 -mt-8">
                  <div className="flex items-center gap-2 mb-3 text-[#173F35]">
                    <div className="w-8 h-8 rounded-xl bg-[#D9EF83]/60 flex items-center justify-center font-bold">🛡️</div>
                    <div>
                      <h4 className="font-bold text-xs">سياسة الضمان</h4>
                      <span className="text-[10px] text-[#747B71]">ضمان معتمد</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-[11px] text-[#747B71]">
                    <div className="bg-[#F7F4ED] p-2 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>ضمان معتمد شامل</span>
                    </div>
                    <div className="bg-[#F7F4ED] p-2 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>دعم فني سريع</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating QR card */}
              <div className="absolute -bottom-6 right-8 bg-[#173F35] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce duration-1000">
                <QrCode className="w-8 h-8 text-[#D9EF83]" />
                <div>
                  <h5 className="font-bold text-xs">رابط واحد، تحديث دائم</h5>
                  <span className="text-[10px] text-[#D9EF83]">QR قابل للتحميل</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Templates Showcase Section ("صفحة لكل فكرة") */}
      <section className="py-20 bg-white border-t border-b border-[#173F35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#173F35] mb-4">صفحة لكل فكرة</h2>
            <p className="text-sm text-[#747B71]">اختر من مجموعة قوالب احترافية مصممة خصيصًا لتلبية احتياجاتك بكل سهولة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Template Card 1: Menu */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 border border-[#173F35]/10 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#173F35] mb-4 shadow-xs group-hover:bg-[#D9EF83] transition-colors">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35] mb-2">منيو مطعم ومقاهي</h3>
                <p className="text-xs text-[#747B71] leading-relaxed mb-6">اعرض أطباقك بطريقة شهية وسهلة التصفح مع الأسعار والصور والوصف.</p>
                <div className="bg-white p-4 rounded-2xl border border-[#173F35]/10 shadow-xs mb-6">
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&auto=format&fit=crop&q=80" alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold">برجر كلاسيك</h4>
                      <span className="text-[11px] text-[#173F35] font-extrabold">32 ريال</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full bg-[#173F35] text-white hover:bg-[#173F35]/90 py-3 rounded-xl text-xs font-bold text-center transition-colors"
              >
                إنشاء منيو الآن
              </Link>
            </div>

            {/* Template Card 2: Warranty */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 border border-[#173F35]/10 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#173F35] mb-4 shadow-xs group-hover:bg-[#D9EF83] transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35] mb-2">سياسة الضمان</h3>
                <p className="text-xs text-[#747B71] leading-relaxed mb-6">قدم معلومات الضمان بوضوح ورسمية لتعزيز ثقة عملائك في منتجاتك.</p>
                <div className="bg-white p-4 rounded-2xl border border-[#173F35]/10 shadow-xs mb-6 text-center">
                  <ShieldCheck className="w-8 h-8 text-[#173F35] mx-auto mb-2" />
                  <span className="text-xs font-bold text-[#173F35]">وثيقة ضمان معتمدة</span>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full bg-[#173F35] text-white hover:bg-[#173F35]/90 py-3 rounded-xl text-xs font-bold text-center transition-colors"
              >
                إنشاء صفحة ضمان
              </Link>
            </div>

            {/* Template Card 3: Services */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 border border-[#173F35]/10 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#173F35] mb-4 shadow-xs group-hover:bg-[#D9EF83] transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35] mb-2">صفحة خدمات</h3>
                <p className="text-xs text-[#747B71] leading-relaxed mb-6">اعرض خدماتك بشكل احترافي واكسب ثقة عملائك مع أزرار تواصل مباشرة.</p>
                <div className="bg-white p-4 rounded-2xl border border-[#173F35]/10 shadow-xs mb-6 grid grid-cols-2 gap-2 text-center text-xs font-bold">
                  <div className="bg-[#F7F4ED] p-2 rounded-xl">دعم فني</div>
                  <div className="bg-[#F7F4ED] p-2 rounded-xl">استشارات</div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full bg-[#173F35] text-white hover:bg-[#173F35]/90 py-3 rounded-xl text-xs font-bold text-center transition-colors"
              >
                إنشاء صفحة خدمات
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* How it works Section ("كيف يعمل؟") */}
      <section id="how-it-works" className="py-20 bg-[#F7F4ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#173F35] mb-4">كيف تعمل منصة رَقّ؟</h2>
            <p className="text-sm text-[#747B71]">ثلاث خطوات بسيطة تفصلك عن إطلاق صفحتك الاحترافية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-[#173F35]/10 text-center relative">
              <div className="w-12 h-12 bg-[#D9EF83] text-[#173F35] font-black rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-[#173F35] mb-2">اختر قالبك</h3>
              <p className="text-xs text-[#747B71] leading-relaxed">اختر من مجموعة قوالب جاهزة تناسب فكرتك بدقة.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-[#173F35]/10 text-center relative">
              <div className="w-12 h-12 bg-[#D9EF83] text-[#173F35] font-black rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-[#173F35] mb-2">أضف تفاصيلك</h3>
              <p className="text-xs text-[#747B71] leading-relaxed">خصص المحتوى والألوان بما يعكس هويتك.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-[#173F35]/10 text-center relative">
              <div className="w-12 h-12 bg-[#D9EF83] text-[#173F35] font-black rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-[#173F35] mb-2">شارك صفحتك</h3>
              <p className="text-xs text-[#747B71] leading-relaxed">احصل على رابط دائم ورمز QR وشاركه مع الجميع.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
