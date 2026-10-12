import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageDocument, PageContent, RestaurantMenuContent, WarrantyPolicyContent, ReturnPolicyContent, ServicesContent, CustomPageContent, MenuCategory, MenuItem } from '../types';
import { TemplateRenderer } from '../templates/TemplateRenderers';
import { QRCodeModal } from '../components/QRCodeModal';
import { 
  Save, 
  Send, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  Check, 
  Loader2, 
  Sliders, 
  FileText, 
  Plus, 
  Trash2, 
  QrCode, 
  ExternalLink,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export const PageEditor: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { getPageById, updatePageDraft, publishPage } = useAuth();

  const [page, setPage] = useState<PageDocument | null>(null);
  const [content, setContent] = useState<PageContent | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [publishing, setPublishing] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    if (!pageId) return;
    getPageById(pageId).then((p) => {
      if (p) {
        setPage(p);
        setContent(p.draftContent);
      }
    });
  }, [pageId]);

  // Auto-save debounce effect
  useEffect(() => {
    if (!page || !content) return;
    setSaveStatus('unsaved');
    const timer = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await updatePageDraft(page.id, content, content.title);
        setSaveStatus('saved');
      } catch (e) {
        setSaveStatus('unsaved');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [content]);

  if (!page || !content) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#173F35] mx-auto" />
          <p className="text-xs text-[#747B71]">جاري تحميل المحرر...</p>
        </div>
      </div>
    );
  }

  const handleManualSave = async () => {
    setSaveStatus('saving');
    await updatePageDraft(page.id, content, content.title);
    setSaveStatus('saved');
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await updatePageDraft(page.id, content, content.title);
      await publishPage(page.id);
      setPage(prev => prev ? { ...prev, status: 'published', publishedContent: content } : null);
      alert('تم نشر الصفحة بنجاح! أصبح الرابط ورمز QR جاهزين للمشاركة.');
      setShowQrModal(true);
    } catch (e: any) {
      alert(e.message || 'تعذر نشر الصفحة');
    } finally {
      setPublishing(false);
    }
  };

  // Helper updaters
  const updateField = (key: string, val: any) => {
    setContent(prev => prev ? { ...prev, [key]: val } : null);
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] -m-4 sm:-m-8 flex flex-col font-['Tajawal',sans-serif] pt-20">
      {/* Top Header */}
      <header className="bg-white border-b border-[#173F35]/10 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-[#F7F4ED] hover:bg-[#D9EF83]/40 rounded-xl text-[#173F35] transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#173F35] truncate max-w-xs">{content.title || page.title}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${page.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {page.status === 'published' ? 'منشورة' : 'مسودة'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#747B71] mt-0.5">
              {saveStatus === 'saved' && <span className="text-emerald-600 flex items-center gap-1"><Check className="w-3 h-3" /> تم حفظ التغييرات</span>}
              {saveStatus === 'saving' && <span className="text-amber-600 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> جاري الحفظ...</span>}
              {saveStatus === 'unsaved' && <span>تغييرات غير محفوظة</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSave}
            className="bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-[#747B71]/20"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">حفظ المسودة</span>
          </button>

          {page.status === 'published' && (
            <button
              onClick={() => setShowQrModal(true)}
              className="bg-[#F7F4ED] hover:bg-[#D9EF83]/40 text-[#173F35] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-[#747B71]/20"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">QR والرابط</span>
            </button>
          )}

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#173F35] hover:bg-[#173F35]/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-[#D9EF83]" />}
            <span>نشر / تحديث الصفحة</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Right Settings Panel (Editor Controls) */}
        <div className="lg:col-span-5 bg-white border-l border-[#173F35]/10 flex flex-col h-[calc(100vh-73px)] overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-[#173F35]/10 bg-[#F7F4ED]/50 p-2 gap-2 sticky top-0 z-10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'content' ? 'bg-[#173F35] text-white shadow-xs' : 'text-[#747B71] hover:bg-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>المحتوى والبيانات</span>
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'design' ? 'bg-[#173F35] text-white shadow-xs' : 'text-[#747B71] hover:bg-white'}`}
            >
              <Sliders className="w-4 h-4" />
              <span>التصميم والتواصل</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === 'content' ? (
              <div className="space-y-6">
                {/* General Header Fields */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">العنوان والوصف الرئيسي</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#173F35] mb-1.5">عنوان الصفحة</label>
                    <input
                      type="text"
                      value={content.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs text-[#173F35] outline-none focus:border-[#173F35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173F35] mb-1.5">الوصف التعريفي (التاغ لاين)</label>
                    <input
                      type="text"
                      value={content.subtitle || ''}
                      onChange={(e) => updateField('subtitle', e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs text-[#173F35] outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>

                {/* Template specific editor */}
                {page.templateType === 'menu' && (
                  <div className="space-y-6 pt-4 border-t border-[#173F35]/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">أقسام وأطباق المنيو</h3>
                      <button
                        onClick={() => {
                          const menu = content as RestaurantMenuContent;
                          const newCat: MenuCategory = {
                            id: 'cat-' + Math.random().toString(36).substring(2, 7),
                            name: 'قسم جديد',
                            items: []
                          };
                          setContent({ ...menu, categories: [...(menu.categories || []), newCat] });
                        }}
                        className="bg-[#D9EF83] text-[#173F35] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> إضافة قسم
                      </button>
                    </div>

                    {(content as RestaurantMenuContent).categories?.map((cat, catIdx) => (
                      <div key={cat.id} className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#173F35]/10 space-y-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const menu = { ...content } as RestaurantMenuContent;
                              menu.categories[catIdx].name = e.target.value;
                              setContent(menu);
                            }}
                            className="flex-1 bg-white border border-[#747B71]/20 rounded-xl p-2.5 text-xs font-bold text-[#173F35]"
                            placeholder="اسم القسم"
                          />
                          <button
                            onClick={() => {
                              const menu = { ...content } as RestaurantMenuContent;
                              menu.categories = menu.categories.filter((_, i) => i !== catIdx);
                              setContent(menu);
                            }}
                            className="text-red-600 bg-white p-2.5 rounded-xl hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Items in category */}
                        <div className="space-y-3">
                          {cat.items?.map((item, itemIdx) => (
                            <div key={item.id} className="bg-white p-3 rounded-xl border border-[#173F35]/10 space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => {
                                    const menu = { ...content } as RestaurantMenuContent;
                                    menu.categories[catIdx].items[itemIdx].name = e.target.value;
                                    setContent(menu);
                                  }}
                                  placeholder="اسم الوجبة"
                                  className="flex-1 bg-[#F7F4ED] p-2 rounded-lg text-xs font-bold"
                                />
                                <input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => {
                                    const menu = { ...content } as RestaurantMenuContent;
                                    menu.categories[catIdx].items[itemIdx].price = Number(e.target.value);
                                    setContent(menu);
                                  }}
                                  placeholder="السعر"
                                  className="w-20 bg-[#F7F4ED] p-2 rounded-lg text-xs font-bold"
                                />
                              </div>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => {
                                  const menu = { ...content } as RestaurantMenuContent;
                                  menu.categories[catIdx].items[itemIdx].description = e.target.value;
                                  setContent(menu);
                                }}
                                placeholder="وصف الوجبة والمكونات..."
                                className="w-full bg-[#F7F4ED] p-2 rounded-lg text-xs"
                              />
                              <input
                                type="text"
                                value={item.image || ''}
                                onChange={(e) => {
                                  const menu = { ...content } as RestaurantMenuContent;
                                  menu.categories[catIdx].items[itemIdx].image = e.target.value;
                                  setContent(menu);
                                }}
                                placeholder="رابط صورة الوجبة (URL)..."
                                className="w-full bg-[#F7F4ED] p-2 rounded-lg text-[11px] font-mono"
                              />
                              <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2 text-xs cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={item.available}
                                    onChange={(e) => {
                                      const menu = { ...content } as RestaurantMenuContent;
                                      menu.categories[catIdx].items[itemIdx].available = e.target.checked;
                                      setContent(menu);
                                    }}
                                  />
                                  <span>متوفر للطلب</span>
                                </label>
                                <button
                                  onClick={() => {
                                    const menu = { ...content } as RestaurantMenuContent;
                                    menu.categories[catIdx].items = menu.categories[catIdx].items.filter((_, i) => i !== itemIdx);
                                    setContent(menu);
                                  }}
                                  className="text-red-600 text-xs hover:underline"
                                >
                                  حذف الوجبة
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={() => {
                              const menu = { ...content } as RestaurantMenuContent;
                              const newItem: MenuItem = {
                                id: 'item-' + Math.random().toString(36).substring(2, 7),
                                name: 'وجبة جديدة',
                                description: 'وصف الوجبة',
                                price: 25,
                                available: true
                              };
                              menu.categories[catIdx].items.push(newItem);
                              setContent(menu);
                            }}
                            className="w-full bg-white border border-dashed border-[#173F35]/30 hover:bg-[#F7F4ED] py-2 rounded-xl text-xs font-bold text-[#173F35] flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> إضافة وجبة لهذا القسم
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {page.templateType === 'warranty' && (
                  <div className="space-y-4 pt-4 border-t border-[#173F35]/10">
                    <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">تفاصيل الضمان</h3>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">المنتج أو الخدمة</label>
                      <input
                        type="text"
                        value={(content as WarrantyPolicyContent).productName || ''}
                        onChange={(e) => updateField('productName', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">مدة الضمان</label>
                      <input
                        type="text"
                        value={(content as WarrantyPolicyContent).warrantyPeriod || ''}
                        onChange={(e) => updateField('warrantyPeriod', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">نطاق التغطية</label>
                      <textarea
                        rows={3}
                        value={(content as WarrantyPolicyContent).coverageScope || ''}
                        onChange={(e) => updateField('coverageScope', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">الاستثناءات</label>
                      <textarea
                        rows={3}
                        value={(content as WarrantyPolicyContent).exclusions || ''}
                        onChange={(e) => updateField('exclusions', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">آلية المطالبة</label>
                      <textarea
                        rows={3}
                        value={(content as WarrantyPolicyContent).claimProcess || ''}
                        onChange={(e) => updateField('claimProcess', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                  </div>
                )}

                {page.templateType === 'return' && (
                  <div className="space-y-4 pt-4 border-t border-[#173F35]/10">
                    <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">تفاصيل الاسترجاع</h3>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">فترة الاسترجاع</label>
                      <input
                        type="text"
                        value={(content as ReturnPolicyContent).returnPeriod || ''}
                        onChange={(e) => updateField('returnPeriod', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">شروط القبول</label>
                      <textarea
                        rows={3}
                        value={(content as ReturnPolicyContent).acceptanceConditions || ''}
                        onChange={(e) => updateField('acceptanceConditions', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">المنتجات المستثناة</label>
                      <textarea
                        rows={3}
                        value={(content as ReturnPolicyContent).excludedItems || ''}
                        onChange={(e) => updateField('excludedItems', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#173F35] mb-1">طريقة الاسترداد</label>
                      <input
                        type="text"
                        value={(content as ReturnPolicyContent).refundMethod || ''}
                        onChange={(e) => updateField('refundMethod', e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                      />
                    </div>
                  </div>
                )}

                {page.templateType === 'services' && (
                  <div className="space-y-6 pt-4 border-t border-[#173F35]/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">قائمة الخدمات</h3>
                      <button
                        onClick={() => {
                          const data = content as ServicesContent;
                          const newSrv = {
                            id: 'srv-' + Math.random().toString(36).substring(2, 7),
                            title: 'خدمة جديدة',
                            description: 'وصف الخدمة المقدمة',
                            price: '100 ر.س'
                          };
                          setContent({ ...data, services: [...(data.services || []), newSrv] });
                        }}
                        className="bg-[#D9EF83] text-[#173F35] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> إضافة خدمة
                      </button>
                    </div>

                    {(content as ServicesContent).services?.map((srv, idx) => (
                      <div key={srv.id} className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#173F35]/10 space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const data = { ...content } as ServicesContent;
                              data.services[idx].title = e.target.value;
                              setContent(data);
                            }}
                            placeholder="اسم الخدمة"
                            className="flex-1 bg-white p-2.5 rounded-xl text-xs font-bold"
                          />
                          <input
                            type="text"
                            value={srv.price || ''}
                            onChange={(e) => {
                              const data = { ...content } as ServicesContent;
                              data.services[idx].price = e.target.value;
                              setContent(data);
                            }}
                            placeholder="السعر"
                            className="w-24 bg-white p-2.5 rounded-xl text-xs font-bold"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={srv.description}
                          onChange={(e) => {
                            const data = { ...content } as ServicesContent;
                            data.services[idx].description = e.target.value;
                            setContent(data);
                          }}
                          placeholder="تفاصيل الخدمة..."
                          className="w-full bg-white p-2.5 rounded-xl text-xs"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const data = { ...content } as ServicesContent;
                              data.services = data.services.filter((_, i) => i !== idx);
                              setContent(data);
                            }}
                            className="text-red-600 text-xs font-medium hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> حذف الخدمة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xs font-black text-[#173F35] uppercase tracking-wider">بيانات التواصل والروابط</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173F35] mb-1.5">رقم الهاتف</label>
                    <input
                      type="text"
                      value={content.phone || ''}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="0501234567"
                      className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173F35] mb-1.5">رقم الواتساب (بالرمز الدولي)</label>
                    <input
                      type="text"
                      value={content.whatsapp || ''}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder="966501234567"
                      className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173F35] mb-1.5">رابط الموقع الإلكتروني</label>
                    <input
                      type="text"
                      value={content.websiteUrl || ''}
                      onChange={(e) => updateField('websiteUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-[#F7F4ED] border border-[#747B71]/20 rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#173F35]/10">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={content.showContact ?? true}
                        onChange={(e) => updateField('showContact', e.target.checked)}
                        className="w-4 h-4 rounded text-[#173F35]"
                      />
                      <span className="text-xs font-bold text-[#173F35]">إظهار أزرار التواصل في أسفل الصفحة</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center / Left Live Preview */}
        <div className="lg:col-span-7 bg-[#F7F4ED] flex flex-col h-[calc(100vh-73px)] overflow-hidden">
          {/* Preview Device Toggle Bar */}
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 border-b border-[#173F35]/10 flex items-center justify-between">
            <span className="text-xs font-bold text-[#747B71]">المعاينة الحية الفورية</span>
            <div className="flex items-center gap-2 bg-[#F7F4ED] p-1 rounded-xl border border-[#747B71]/20">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${previewDevice === 'mobile' ? 'bg-[#173F35] text-white shadow-xs' : 'text-[#747B71]'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>جوال</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${previewDevice === 'desktop' ? 'bg-[#173F35] text-white shadow-xs' : 'text-[#747B71]'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>كمبيوتر</span>
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-start justify-center">
            <div className={`transition-all duration-300 w-full ${previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-3xl'}`}>
              <div className="bg-white rounded-3xl shadow-2xl border-4 border-[#173F35]/10 overflow-hidden min-h-[650px]">
                <TemplateRenderer page={{ ...page, draftContent: content }} isPreview={true} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {showQrModal && (
        <QRCodeModal
          isOpen={true}
          onClose={() => setShowQrModal(false)}
          pageId={page.id}
          pageTitle={content.title || page.title}
        />
      )}
    </div>
  );
};
