import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ThemeCustomizer from '../components/ThemeCustomizer';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-pageBg dark:bg-[#151824] transition-colors duration-300">
      {/* Sidebar navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main dashboard content panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onSettingsToggle={() => setCustomizerOpen(!customizerOpen)}
        />
        
        {/* Child Router view renders here */}
        <main className="flex-1 p-6 overflow-y-auto max-w-8xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Settings customization drawer */}
      <ThemeCustomizer 
        isOpen={customizerOpen} 
        onClose={() => setCustomizerOpen(false)} 
      />
    </div>
  );
}
