import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  isDemoMode, 
  getDemoPages, 
  saveDemoPages, 
  getDefaultContentForTemplate 
} from '../services/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, PageDocument, TemplateType, PageContent } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: any | null;
  loading: boolean;
  isDemo: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  pages: PageDocument[];
  createPage: (templateType: TemplateType, title: string) => Promise<string>;
  updatePageDraft: (pageId: string, draftContent: PageContent, title?: string) => Promise<void>;
  publishPage: (pageId: string) => Promise<void>;
  unpublishPage: (pageId: string) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
  duplicatePage: (pageId: string) => Promise<string>;
  getPageById: (pageId: string) => Promise<PageDocument | null>;
  getPublishedPage: (pageId: string) => Promise<PageDocument | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<PageDocument[]>([]);

  // Initialize demo user if in demo mode or if no user
  useEffect(() => {
    if (isDemoMode) {
      const demoUserProfile: UserProfile = {
        uid: 'demo-user-1',
        email: 'demo@raq.example.com',
        displayName: 'مستخدم تجريبي',
        emailVerified: true,
        createdAt: new Date().toISOString()
      };
      setUser(demoUserProfile);
      setFirebaseUser({ uid: 'demo-user-1', email: demoUserProfile.email, emailVerified: true });
      setPages(getDemoPages());
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserProfile);
          } else {
            const newUser: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || 'مستخدم رَقّ',
              photoURL: fbUser.photoURL || '',
              emailVerified: fbUser.emailVerified,
              createdAt: serverTimestamp()
            };
            await setDoc(userDocRef, newUser);
            setUser(newUser);
          }
          // Fetch user pages
          await fetchUserPages(fbUser.uid);
        } catch (err) {
          console.error("Error fetching user profile/pages:", err);
        }
      } else {
        setUser(null);
        setPages([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserPages = async (uid: string) => {
    if (isDemoMode) {
      setPages(getDemoPages());
      return;
    }
    try {
      // In Firestore, fetch users/{uid}/pages
      const { collection: col, getDocs: gDocs } = await import('firebase/firestore');
      const pagesRef = col(db, 'users', uid, 'pages');
      const snapshot = await gDocs(pagesRef);
      const userPages: PageDocument[] = [];
      snapshot.forEach((d) => {
        userPages.push({ id: d.id, ...d.data() } as PageDocument);
      });
      setPages(userPages);
    } catch (e) {
      console.error("Error fetching pages:", e);
    }
  };

  const login = async (email: string, pass: string) => {
    if (isDemoMode) {
      setUser({
        uid: 'demo-user-1',
        email,
        displayName: 'مستخدم تجريبي',
        emailVerified: true,
        createdAt: new Date().toISOString()
      });
      return;
    }
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    setFirebaseUser(cred.user);
  };

  const register = async (name: string, email: string, pass: string) => {
    if (isDemoMode) {
      setUser({
        uid: 'demo-user-1',
        email,
        displayName: name,
        emailVerified: false,
        createdAt: new Date().toISOString()
      });
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const newUser: UserProfile = {
      uid: cred.user.uid,
      email,
      displayName: name,
      emailVerified: false,
      createdAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', cred.user.uid), newUser);
    await sendEmailVerification(cred.user);
    setUser(newUser);
  };

  const loginWithGoogle = async () => {
    if (isDemoMode) {
      setUser({
        uid: 'demo-user-1',
        email: 'google-user@raq.example.com',
        displayName: 'مستخدم Google التجريبي',
        emailVerified: true,
        createdAt: new Date().toISOString()
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const fbUser = cred.user;
    const userDocRef = doc(db, 'users', fbUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      const newUser: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || 'مستخدم Google',
        photoURL: fbUser.photoURL || '',
        emailVerified: true,
        createdAt: serverTimestamp()
      };
      await setDoc(userDocRef, newUser);
      setUser(newUser);
    } else {
      setUser(userDoc.data() as UserProfile);
    }
    await fetchUserPages(fbUser.uid);
  };

  const logout = async () => {
    if (isDemoMode) {
      setUser(null);
      return;
    }
    await fbSignOut(auth);
    setUser(null);
    setPages([]);
  };

  const resetPassword = async (email: string) => {
    if (isDemoMode) return;
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (isDemoMode || !auth.currentUser) return;
    await sendEmailVerification(auth.currentUser);
  };

  const createPage = async (templateType: TemplateType, title: string): Promise<string> => {
    const pageId = 'page-' + Math.random().toString(36).substring(2, 9);
    const defaultContent = getDefaultContentForTemplate(templateType);
    if (title) defaultContent.title = title;

    const newPage: PageDocument = {
      id: pageId,
      ownerId: user?.uid || 'demo-user-1',
      templateType,
      title: title || defaultContent.title,
      slug: pageId,
      status: 'draft',
      draftContent: defaultContent,
      theme: {
        accentColor: '#173F35',
        secondaryColor: '#D9EF83',
        fontStyle: 'Tajawal'
      },
      createdAt: isDemoMode ? new Date().toISOString() : serverTimestamp(),
      updatedAt: isDemoMode ? new Date().toISOString() : serverTimestamp(),
      schemaVersion: 1
    };

    if (isDemoMode) {
      const updatedPages = [newPage, ...pages];
      setPages(updatedPages);
      saveDemoPages(updatedPages);
      return pageId;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) throw new Error("المستخدم غير مسجل الدخول");

    // Save in users/{uid}/pages/{pageId}
    await setDoc(doc(db, 'users', uid, 'pages', pageId), newPage);
    setPages(prev => [newPage, ...prev]);
    return pageId;
  };

  const updatePageDraft = async (pageId: string, draftContent: PageContent, title?: string) => {
    const updatedTitle = title || draftContent.title || 'صفحة بدون عنوان';
    if (isDemoMode) {
      const updated = pages.map(p => {
        if (p.id === pageId) {
          return {
            ...p,
            title: updatedTitle,
            draftContent,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      });
      setPages(updated);
      saveDemoPages(updated);
      return;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;

    const docRef = doc(db, 'users', uid, 'pages', pageId);
    await updateDoc(docRef, {
      title: updatedTitle,
      draftContent,
      updatedAt: serverTimestamp()
    });

    setPages(prev => prev.map(p => p.id === pageId ? { ...p, title: updatedTitle, draftContent } : p));
  };

  const publishPage = async (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (!page) return;

    const publishedContent = page.draftContent;
    const now = isDemoMode ? new Date().toISOString() : serverTimestamp();

    if (isDemoMode) {
      const updated = pages.map(p => {
        if (p.id === pageId) {
          return {
            ...p,
            status: 'published' as const,
            publishedContent,
            publishedAt: now,
            updatedAt: now
          };
        }
        return p;
      });
      setPages(updated);
      saveDemoPages(updated);
      // Also save in published demo storage
      localStorage.setItem(`raq_pub_${pageId}`, JSON.stringify({
        ...page,
        status: 'published',
        publishedContent,
        publishedAt: now
      }));
      return;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;

    // Save to users/{uid}/pages/{pageId} and publishedPages/{pageId}
    const pageRef = doc(db, 'users', uid, 'pages', pageId);
    const pubRef = doc(db, 'publishedPages', pageId);

    const updateData = {
      status: 'published',
      publishedContent,
      publishedAt: now,
      updatedAt: now
    };

    await updateDoc(pageRef, updateData);
    await setDoc(pubRef, {
      ...page,
      status: 'published',
      publishedContent,
      publishedAt: now
    });

    setPages(prev => prev.map(p => p.id === pageId ? { ...p, status: 'published', publishedContent } : p));
  };

  const unpublishPage = async (pageId: string) => {
    const now = isDemoMode ? new Date().toISOString() : serverTimestamp();
    if (isDemoMode) {
      const updated = pages.map(p => {
        if (p.id === pageId) {
          return {
            ...p,
            status: 'draft' as const,
            updatedAt: now
          };
        }
        return p;
      });
      setPages(updated);
      saveDemoPages(updated);
      localStorage.removeItem(`raq_pub_${pageId}`);
      return;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;

    const pageRef = doc(db, 'users', uid, 'pages', pageId);
    const pubRef = doc(db, 'publishedPages', pageId);

    await updateDoc(pageRef, { status: 'draft', updatedAt: now });
    try {
      await deleteDoc(pubRef);
    } catch (e) {
      // Ignore if not found
    }

    setPages(prev => prev.map(p => p.id === pageId ? { ...p, status: 'draft' } : p));
  };

  const deletePage = async (pageId: string) => {
    if (isDemoMode) {
      const updated = pages.filter(p => p.id !== pageId);
      setPages(updated);
      saveDemoPages(updated);
      localStorage.removeItem(`raq_pub_${pageId}`);
      return;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;

    await deleteDoc(doc(db, 'users', uid, 'pages', pageId));
    try {
      await deleteDoc(doc(db, 'publishedPages', pageId));
    } catch (e) {}

    setPages(prev => prev.filter(p => p.id !== pageId));
  };

  const duplicatePage = async (pageId: string): Promise<string> => {
    const page = pages.find(p => p.id === pageId);
    if (!page) throw new Error("الصفحة غير موجودة");

    const newId = 'page-' + Math.random().toString(36).substring(2, 9);
    const duplicated: PageDocument = {
      ...page,
      id: newId,
      title: `${page.title} (نسخة)`,
      slug: newId,
      status: 'draft',
      createdAt: isDemoMode ? new Date().toISOString() : serverTimestamp(),
      updatedAt: isDemoMode ? new Date().toISOString() : serverTimestamp(),
      publishedContent: undefined,
      publishedAt: undefined
    };

    if (isDemoMode) {
      const updated = [duplicated, ...pages];
      setPages(updated);
      saveDemoPages(updated);
      return newId;
    }

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) throw new Error("المستخدم غير مسجل");

    await setDoc(doc(db, 'users', uid, 'pages', newId), duplicated);
    setPages(prev => [duplicated, ...prev]);
    return newId;
  };

  const getPageById = async (pageId: string): Promise<PageDocument | null> => {
    const local = pages.find(p => p.id === pageId);
    if (local) return local;

    if (isDemoMode) return null;

    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return null;

    const snap = await getDoc(doc(db, 'users', uid, 'pages', pageId));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as PageDocument;
    }
    return null;
  };

  const getPublishedPage = async (pageId: string): Promise<PageDocument | null> => {
    if (isDemoMode) {
      const storedPub = localStorage.getItem(`raq_pub_${pageId}`);
      if (storedPub) {
        try {
          return JSON.parse(storedPub);
        } catch (e) {}
      }
      // Also check if it's in demo pages and published
      const p = pages.find(item => item.id === pageId && item.status === 'published');
      if (p) return p;
      return null;
    }

    try {
      const snap = await getDoc(doc(db, 'publishedPages', pageId));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as PageDocument;
      }
    } catch (e) {
      console.error("Error fetching published page:", e);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isDemo: isDemoMode,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        sendVerificationEmail,
        pages,
        createPage,
        updatePageDraft,
        publishPage,
        unpublishPage,
        deletePage,
        duplicatePage,
        getPageById,
        getPublishedPage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
