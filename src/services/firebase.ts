import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PageDocument, TemplateType, UserProfile, PageContent } from '../types';

// Firebase configuration from environment or fallback placeholders
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123:web:abc"
};

const isDemoMode = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "MY_FIREBASE_API_KEY" || import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key";

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (e) {
  console.warn("Firebase initialization warning (running in Demo mode):", e);
}

export { auth, db, storage, isDemoMode };

// Default sample content for templates
export const getDefaultContentForTemplate = (type: TemplateType): PageContent => {
  switch (type) {
    case 'menu':
      return {
        title: 'منيو المطعم الذهبي',
        subtitle: 'أطباق طازجة ولذيذة تُحضر بكل حب',
        currency: 'ر.س',
        showContact: true,
        phone: '0501234567',
        whatsapp: '966501234567',
        websiteUrl: 'https://example.com',
        categories: [
          {
            id: 'cat-1',
            name: 'الأطباق الرئيسية',
            items: [
              {
                id: 'item-1',
                name: 'مكرونة ألفريدو بالفطر',
                description: 'مكرونة فيتوتشيني مع صوص الكريمة الغني وجبن البارميزان الفاخر',
                price: 28,
                image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6284ba9?w=500&auto=format&fit=crop&q=80',
                available: true
              },
              {
                id: 'item-2',
                name: 'برجر كلاسيك لحم',
                description: 'قطعة لحم أنجوس مشوية مع الجبن السائح وصوص رَقّ الخاص',
                price: 32,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
                available: true
              }
            ]
          },
          {
            id: 'cat-2',
            name: 'المشروبات والحلويات',
            items: [
              {
                id: 'item-3',
                name: 'عصير ليمون بالنعناع المنعش',
                description: 'ليمون طازج مع أوراق النعناع الطازجة والثلج المجروش',
                price: 15,
                image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
                available: true
              }
            ]
          }
        ]
      };
    case 'warranty':
      return {
        title: 'سياسة الضمان المعتمد',
        subtitle: 'نضمن لك جودة المنتجات وراحة البال لفترات طويلة',
        productName: 'أجهزة المنزل الذكية الفاخرة',
        warrantyPeriod: 'سنتان شاملة لجميع العيوب المصنعية',
        coverageScope: 'يشمل الضمان قطع الغيار، الصيانة، والأعطال الكهربائية والميكانيكية.',
        exclusions: 'لا يشمل الضمان الأضرار الناتجة عن سوء الاستخدام، السقوط، أو التعرض للسوائل.',
        claimProcess: 'يمكنك طلب الصيانة عبر التواصل المباشر مع خدمة العملاء مع إحضار فاتورة الشراء.',
        effectiveDate: 'تاريخ التفعيل يبدأ من يوم الشراء الموضح في الفاتورة',
        showContact: true,
        phone: '0509876543',
        whatsapp: '966509876543'
      };
    case 'return':
      return {
        title: 'سياسة الاستبدال والاسترجاع',
        subtitle: 'تسوق بكل ثقة مع ضمان إعادة المنتجات بكل سهولة',
        returnPeriod: 'خلال 7 أيام من تاريخ الاستلام',
        acceptanceConditions: 'أن يكون المنتج بحالته الأصلية غير مسخدم وبغلافه الأصلي مع الفاتورة.',
        excludedItems: 'المنتجات الرقمية، الملابس الداخلية، والمنتجات المخصصة حسب الطلب.',
        refundMethod: 'يتم إرجاع المبلغ على نفس بطاقة الدفع خلال 3-7 أيام عمل.',
        contactEmail: 'support@raq.example.com',
        showContact: true,
        phone: '0501122334',
        whatsapp: '966501122334'
      };
    case 'services':
      return {
        title: 'مؤسسة الخدمات الإبداعية',
        subtitle: 'نقدم حلولاً احترافية ترتقي بعملك نحو القمة',
        showContact: true,
        phone: '0555443322',
        whatsapp: '966555443322',
        services: [
          {
            id: 'srv-1',
            title: 'دعم فني استشاري',
            description: 'استشارات تقنية وفنية متخصصة لحل كافة التحديات البرمجية وتشغيل الأنظمة.',
            price: 'تبدأ من 150 ر.س'
          },
          {
            id: 'srv-2',
            title: 'تطوير المواقع والتطبيقات',
            description: 'تصميم وبمجة واجهات عصرية ومتجاوبة بأحدث المعايير التقنية.',
            price: 'حسب المشروع'
          },
          {
            id: 'srv-3',
            title: 'إدارة وتطوير المشاريع',
            description: 'التخطيط الاستراتيجي ومتابعة تنفيذ المهام لضمان أعلى جودة وسرعة إنجاز.'
          }
        ]
      };
    case 'custom':
      return {
        title: 'صفحتي الشخصية الإبداعية',
        subtitle: 'أهلاً بك في صفحتي الرسمية، تعرف على أهم أعمالي وروابطي',
        showContact: true,
        phone: '0544332211',
        whatsapp: '966544332211',
        blocks: [
          {
            id: 'blk-1',
            type: 'heading',
            title: 'من أنا؟'
          },
          {
            id: 'blk-2',
            type: 'paragraph',
            content: 'مرحباً! أنا مصمم ومطور شغوف ببناء تجارب رقمية متميزة تسهم في تيسير الحياة والأعمال عبر التقنية.'
          },
          {
            id: 'blk-3',
            type: 'button',
            title: 'زيارة موقعي الشخصي',
            url: 'https://example.com'
          },
          {
            id: 'blk-4',
            type: 'faq',
            title: 'الأسئلة الشائعة',
            faqs: [
              {
                question: 'كيف يمكنني التواصل معك؟',
                answer: 'يمكنك التواصل مباشرة عبر الأزرار الموجودة في أسفل الصفحة.'
              },
              {
                question: 'هل تقدم استشارات مجانية؟',
                answer: 'نعم، الاستشارة الأولى تكون مدتها 15 دقيقة مجاناً.'
              }
            ]
          }
        ]
      };
    default:
      return {
        title: 'صفحة جديدة',
        subtitle: 'صفحة منشورة عبر منصة رَقّ',
        showContact: true
      };
  }
};

// Demo localStorage helpers when in demo mode
const DEMO_PAGES_KEY = 'raq_demo_pages_v1';
const DEMO_USER_KEY = 'raq_demo_user_v1';

export const getDemoPages = (): PageDocument[] => {
  const stored = localStorage.getItem(DEMO_PAGES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  // Default initial demo pages
  const defaultPages: PageDocument[] = [
    {
      id: 'demo-menu-1',
      ownerId: 'demo-user-1',
      templateType: 'menu',
      title: 'منيو المطعم الذهبي',
      slug: 'demo-menu-1',
      status: 'published',
      draftContent: getDefaultContentForTemplate('menu'),
      publishedContent: getDefaultContentForTemplate('menu'),
      theme: {
        accentColor: '#173F35',
        secondaryColor: '#D9EF83',
        fontStyle: 'Tajawal'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      schemaVersion: 1
    },
    {
      id: 'demo-warranty-1',
      ownerId: 'demo-user-1',
      templateType: 'warranty',
      title: 'سياسة الضمان المعتمد',
      slug: 'demo-warranty-1',
      status: 'published',
      draftContent: getDefaultContentForTemplate('warranty'),
      publishedContent: getDefaultContentForTemplate('warranty'),
      theme: {
        accentColor: '#173F35',
        secondaryColor: '#D9EF83',
        fontStyle: 'Tajawal'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      schemaVersion: 1
    }
  ];
  localStorage.setItem(DEMO_PAGES_KEY, JSON.stringify(defaultPages));
  return defaultPages;
};

export const saveDemoPages = (pages: PageDocument[]) => {
  localStorage.setItem(DEMO_PAGES_KEY, JSON.stringify(pages));
};
