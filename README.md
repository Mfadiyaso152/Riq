# منصة رَقّ (Raq) - «صفحتك، برابط ولمسة.»

منصة متكاملة باللغة العربية لإنشاء وتخصيص ونشر الصفحات (منيو مطاعم، سياسات ضمان واستبدال، صفحات خدمات، وصفحات مخصصة) برابط دائم ورمز QR قابل للتحميل والتشاركة.

---

## 🚀 دليل التشغيل والإعداد

### 1. المتطلبات الأساسية
* Node.js (الإصدار 18 أو أحدث)
* حساب Firebase مفعل (Firestore, Authentication, Storage)

### 2. خطوات إعداد Firebase
1. أنشئ مشروعاً جديداً في [لوحة تحكم Firebase](https://console.firebase.google.com/).
2. فعّل **Authentication** وقم بتفعيل مزودَي تسجيل الدخول:
   - **البريد الإلكتروني وكلمة المرور (Email/Password)**
   - **Google** (مع إدخال بيانات الدعم ونطاق المشروع المعتمد).
3. أنشئ قاعدة بيانات **Cloud Firestore** في وضع الإنتاج أو الوضع التجريبي.
4. فعّل **Firebase Storage** لرفع الصور.
5. انسخ بيانات إعداد الويب من إعدادات مشروعك في Firebase.

### 3. إعداد متغيرات البيئة
أنشئ ملف `.env` في جذر المشروع بناءً على `.env.example`:
```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```
*(ملاحظة: إذا تركت متغيرات البيئة فارغة، سيعمل التطبيق تلقائياً في "وضع التجربة الفورية" المحلي لتتمكن من تجربة كافة الميزات فوراً دون الحاجة لإعداد مسبق).*

### 4. التثبيت والتشغيل المحلي
```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير المحلي
npm run dev
```

### 5. البناء والنشر
```bash
# بناء المشروع للإنتاج
npm run build

# النشر عبر Firebase CLI
firebase deploy
```
تأكد من تفعيل قواعد الحماية المرفقة في `firestore.rules` و`storage.rules` وضبط إعادة توجيه مسارات SPA في `firebase.json`.
