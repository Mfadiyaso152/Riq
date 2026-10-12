import React from 'react';
import { 
  PageDocument, 
  RestaurantMenuContent, 
  WarrantyPolicyContent, 
  ReturnPolicyContent, 
  ServicesContent, 
  CustomPageContent 
} from '../types';
import { Phone, MessageCircle, Globe, CheckCircle, ShieldCheck, RefreshCw, Briefcase, ChevronDown, ExternalLink } from 'lucide-react';

interface TemplateRendererProps {
  page: PageDocument;
  isPreview?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ page, isPreview = false }) => {
  const content = page.publishedContent || page.draftContent;
  const templateType = page.templateType;

  // Render contact bar if enabled
  const renderContactBar = (c: any) => {
    if (!c.showContact && !c.phone && !c.whatsapp && !c.websiteUrl) return null;
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-[#173F35]/10">
        {c.phone && (
          <a
            href={`tel:${c.phone}`}
            className="flex items-center gap-2 bg-[#173F35] text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#173F35]/90 transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#D9EF83]" />
            اتصال هاتفي
          </a>
        )}
        {c.whatsapp && (
          <a
            href={`https://wa.me/${c.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#25D366]/90 transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            تواصل واتساب
          </a>
        )}
        {c.websiteUrl && (
          <a
            href={c.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#F7F4ED] text-[#173F35] border border-[#173F35]/20 px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#D9EF83]/30 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#173F35]" />
            زيارة الموقع
          </a>
        )}
      </div>
    );
  };

  switch (templateType) {
    case 'menu': {
      const data = content as RestaurantMenuContent;
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-[#173F35]/10 my-4">
          {/* Cover / Header */}
          <div className="bg-[#173F35] text-white p-6 sm:p-8 text-center relative">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D9EF83] text-[#173F35] rounded-2xl mb-3 shadow-md">
              <span className="text-2xl font-black">🍽️</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-[#F7F4ED]/80 max-w-md mx-auto">{data.subtitle}</p>}
          </div>

          <div className="p-6 sm:p-8 space-y-8 bg-[#F7F4ED]/30">
            {data.categories?.map((cat) => (
              <div key={cat.id} className="space-y-4">
                <h2 className="text-lg font-bold text-[#173F35] border-r-4 border-[#D9EF83] pr-3 flex items-center justify-between">
                  <span>{cat.name}</span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {cat.items?.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-white p-4 rounded-2xl shadow-xs border border-[#173F35]/10 flex gap-4 items-center transition-all ${!item.available ? 'opacity-60' : 'hover:border-[#173F35]/30'}`}
                    >
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs" 
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-sm text-[#173F35]">{item.name}</h3>
                          <span className="bg-[#D9EF83]/60 text-[#173F35] font-extrabold text-xs px-2.5 py-1 rounded-lg shrink-0">
                            {item.price} {data.currency || 'ر.س'}
                          </span>
                        </div>
                        <p className="text-xs text-[#747B71] mt-1 line-clamp-2">{item.description}</p>
                        {!item.available && (
                          <span className="inline-block mt-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-medium">
                            غير متوفر حالياً
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {renderContactBar(data)}
          </div>
        </div>
      );
    }

    case 'warranty': {
      const data = content as WarrantyPolicyContent;
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-[#173F35]/10 my-4">
          <div className="bg-[#173F35] text-white p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D9EF83] text-[#173F35] rounded-2xl mb-3 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-[#F7F4ED]/80 max-w-md mx-auto">{data.subtitle}</p>}
          </div>

          <div className="p-6 sm:p-8 space-y-6 bg-[#F7F4ED]/30 text-[#173F35]">
            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <span className="text-xs text-[#747B71] block mb-1">المنتج أو الخدمة المشمولة</span>
              <span className="font-bold text-base text-[#173F35]">{data.productName}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <span className="text-xs text-[#747B71] block mb-1">مدة الضمان المعتمدة</span>
              <span className="font-bold text-base text-[#173F35]">{data.warrantyPeriod}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                نطاق التغطية
              </h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.coverageScope}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                الاستثناءات
              </h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.exclusions}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2">آلية المطالبة والخدمة</h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.claimProcess}</p>
            </div>

            {data.effectiveDate && (
              <div className="bg-[#D9EF83]/30 p-4 rounded-xl text-xs text-[#173F35] font-medium text-center">
                {data.effectiveDate}
              </div>
            )}

            {renderContactBar(data)}
          </div>
        </div>
      );
    }

    case 'return': {
      const data = content as ReturnPolicyContent;
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-[#173F35]/10 my-4">
          <div className="bg-[#173F35] text-white p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D9EF83] text-[#173F35] rounded-2xl mb-3 shadow-md">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-[#F7F4ED]/80 max-w-md mx-auto">{data.subtitle}</p>}
          </div>

          <div className="p-6 sm:p-8 space-y-6 bg-[#F7F4ED]/30 text-[#173F35]">
            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <span className="text-xs text-[#747B71] block mb-1">فترة الاستبدال والاسترجاع</span>
              <span className="font-bold text-base text-[#173F35]">{data.returnPeriod}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2">شروط قبول الطلب</h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.acceptanceConditions}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2">المنتجات المستثناة</h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.excludedItems}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#173F35]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#173F35] mb-2">آلية استرداد المبلغ</h3>
              <p className="text-sm text-[#747B71] leading-relaxed">{data.refundMethod}</p>
            </div>

            {data.contactEmail && (
              <div className="bg-white p-4 rounded-xl text-xs text-[#747B71] text-center border border-[#173F35]/10">
                للاستفسارات والدعم: <span className="font-bold text-[#173F35]">{data.contactEmail}</span>
              </div>
            )}

            {renderContactBar(data)}
          </div>
        </div>
      );
    }

    case 'services': {
      const data = content as ServicesContent;
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-[#173F35]/10 my-4">
          <div className="bg-[#173F35] text-white p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D9EF83] text-[#173F35] rounded-2xl mb-3 shadow-md">
              <Briefcase className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-[#F7F4ED]/80 max-w-md mx-auto">{data.subtitle}</p>}
          </div>

          <div className="p-6 sm:p-8 space-y-6 bg-[#F7F4ED]/30">
            <div className="grid grid-cols-1 gap-4">
              {data.services?.map((srv) => (
                <div key={srv.id} className="bg-white p-5 rounded-2xl shadow-xs border border-[#173F35]/10 hover:border-[#173F35]/30 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-base text-[#173F35]">{srv.title}</h3>
                    {srv.price && (
                      <span className="bg-[#D9EF83]/60 text-[#173F35] font-extrabold text-xs px-3 py-1 rounded-xl shrink-0">
                        {srv.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#747B71] leading-relaxed">{srv.description}</p>
                </div>
              ))}
            </div>

            {renderContactBar(data)}
          </div>
        </div>
      );
    }

    case 'custom': {
      const data = content as CustomPageContent;
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-[#173F35]/10 my-4">
          <div className="bg-[#173F35] text-white p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D9EF83] text-[#173F35] rounded-2xl mb-3 shadow-md">
              <span className="text-2xl font-black">✨</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-[#F7F4ED]/80 max-w-md mx-auto">{data.subtitle}</p>}
          </div>

          <div className="p-6 sm:p-8 space-y-6 bg-[#F7F4ED]/30">
            {data.blocks?.map((block) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2 key={block.id} className="text-xl font-bold text-[#173F35] pt-2">
                      {block.title}
                    </h2>
                  );
                case 'paragraph':
                  return (
                    <p key={block.id} className="text-sm text-[#747B71] leading-relaxed bg-white p-4 rounded-xl border border-[#173F35]/10">
                      {block.content}
                    </p>
                  );
                case 'button':
                  return (
                    <div key={block.id} className="text-center">
                      <a
                        href={block.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#173F35] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#173F35]/90 transition-colors shadow-sm w-full sm:w-auto"
                      >
                        {block.title || 'رابط'}
                        <ExternalLink className="w-4 h-4 text-[#D9EF83]" />
                      </a>
                    </div>
                  );
                case 'faq':
                  return (
                    <div key={block.id} className="bg-white p-5 rounded-2xl border border-[#173F35]/10 space-y-3">
                      <h3 className="font-bold text-base text-[#173F35]">{block.title || 'الأسئلة الشائعة'}</h3>
                      <div className="space-y-3 pt-2">
                        {block.faqs?.map((faq, idx) => (
                          <div key={idx} className="bg-[#F7F4ED] p-3.5 rounded-xl">
                            <h4 className="font-bold text-xs text-[#173F35] mb-1">{faq.question}</h4>
                            <p className="text-xs text-[#747B71] leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}

            {renderContactBar(data)}
          </div>
        </div>
      );
    }

    default:
      return <div>قالب غير معروف</div>;
  }
};
