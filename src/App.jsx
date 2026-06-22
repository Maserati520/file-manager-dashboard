import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import AppLayout from './layouts/AppLayout';
import ImagesPage from './pages/ImagesPage';
import VideosPage from './pages/VideosPage';
import DocumentsPage from './pages/DocumentsPage';
import AllFilesPage from './pages/AllFilesPage';
import TrashPage from './pages/TrashPage';

export default function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Redirect root URL to Images folder page as requested by client specification */}
            <Route index element={<Navigate to="/file-manager/images" replace />} />
            
            {/* Real routes under File Manager */}
            <Route path="file-manager/all-files" element={<AllFilesPage />} />
            <Route path="file-manager/images" element={<ImagesPage />} />
            <Route path="file-manager/videos" element={<VideosPage />} />
            <Route path="file-manager/documents" element={<DocumentsPage />} />
            <Route path="file-manager/trash" element={<TrashPage />} />
            
            {/* Other Sidebar Group Placeholders */}
            <Route path="help" element={
              <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-3xl p-8 text-slate-800 dark:text-slate-200 shadow-soft animate-fade-in">
                <h2 className="font-bold text-xl mb-2">Help & Documentation</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                  Welcome to Hope UI File Manager. Documentation for running the server, using the state manager, and setting up theme customizations is available in the <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-semibold">README.md</code> file in your project folder directory root.
                </p>
              </div>
            } />
            <Route path="sign-out" element={
              <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-3xl p-8 text-slate-800 dark:text-slate-200 shadow-soft animate-fade-in">
                <h2 className="font-bold text-xl mb-2 text-rose-500">Signing Out...</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  You are being redirected back to your active gallery view. Sign out is out of scope for this demo sprint.
                </p>
                {/* Redirect back to images after delay */}
                <Navigate to="/file-manager/images" replace />
              </div>
            } />

            {/* Profile Dropdown Placeholders */}
            <Route path="profile" element={
              <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-3xl p-8 text-slate-800 dark:text-slate-200 shadow-soft animate-fade-in">
                <h2 className="font-bold text-xl mb-2">My Profile Settings</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Viewing user profile configurations. In-app edits and profile picture modifications are deactivated in this version.
                </p>
              </div>
            } />
            <Route path="profile/settings" element={
              <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-3xl p-8 text-slate-800 dark:text-slate-200 shadow-soft animate-fade-in">
                <h2 className="font-bold text-xl mb-2">Privacy & Security</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Adjust standard system-wide permissions and sharing criteria settings. This page is under construction.
                </p>
              </div>
            } />

            {/* Wildcard Fallback */}
            <Route path="*" element={<Navigate to="/file-manager/images" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}
