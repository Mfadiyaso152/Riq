/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Home } from './pages/Home';
import { Templates } from './pages/Templates';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { NewPage } from './pages/NewPage';
import { PageEditor } from './pages/PageEditor';
import { Settings } from './pages/Settings';
import { PublicPage } from './pages/PublicPage';
import { NotFound } from './pages/NotFound';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center font-['Tajawal',sans-serif]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#173F35] mx-auto" />
          <p className="text-xs text-[#747B71]">جاري التحقق من الجلسة...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="pages" element={<DashboardHome />} />
            <Route path="pages/new" element={<NewPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="/dashboard/pages/:pageId/edit"
            element={
              <ProtectedRoute>
                <PageEditor />
              </ProtectedRoute>
            }
          />

          {/* Public Page View */}
          <Route path="/p/:pageId" element={<PublicPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
