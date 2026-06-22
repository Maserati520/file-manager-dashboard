import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFolder, FiImage, FiVideo, FiFileText, FiTrash2, FiLogOut, FiHelpCircle, FiX, FiActivity } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';

export default function Sidebar({ isOpen, onClose }) {
  const { themeColor } = useImages();

  const menuGroups = [
    {
      title: 'FILE MANAGER',
      items: [
        { name: 'All Files', path: '/file-manager/all-files', icon: FiFolder },
        { name: 'Images', path: '/file-manager/images', icon: FiImage },
        { name: 'Videos', path: '/file-manager/videos', icon: FiVideo },
        { name: 'Documents', path: '/file-manager/documents', icon: FiFileText },
        { name: 'Trash', path: '/file-manager/trash', icon: FiTrash2 },
      ]
    },
    {
      title: 'OTHER',
      items: [
        { name: 'Help & Docs', path: '/help', icon: FiHelpCircle },
        { name: 'Sign Out', path: '/sign-out', icon: FiLogOut }
      ]
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-cardBg border-r border-borderLight dark:border-borderLight/30 w-64 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-borderLight dark:border-borderLight/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
            <FiActivity size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
            Hope UI <span className="text-primary font-medium text-sm">Pro</span>
          </span>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
          <FiX size={20} />
        </button>
      </div>

      {/* Mini Profile Card */}
      <div className="px-6 py-6 border-b border-borderLight dark:border-borderLight/30">
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Austin Robertson" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20"
          />
          <div className="overflow-hidden">
            <h4 className="font-semibold text-sm text-slate-800 dark:text-white truncate">Austin Robertson</h4>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate block">Marketing Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 px-3 uppercase block">
              {group.title}
            </span>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group
                      ${isActive 
                        ? 'text-primary bg-primary-light border-l-4 border-primary font-semibold pl-2' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }
                    `}
                  >
                    {({ isActive }) => {
                      const Icon = item.icon;
                      return (
                        <>
                          <Icon 
                            size={18} 
                            className={`transition-colors duration-150 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary dark:text-slate-500 dark:group-hover:text-primary'}`} 
                          />
                          <span>{item.name}</span>
                        </>
                      );
                    }}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-borderLight dark:border-borderLight/30 text-center">
        <span className="text-xs text-slate-400 dark:text-slate-600 block">© 2026 Hope UI Clone</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={onClose} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
          />
          {/* Drawer Sheet */}
          <div className="relative flex-1 max-w-xs w-full bg-white dark:bg-cardBg shadow-xl z-10 transition-transform duration-300 ease-out transform translate-x-0 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
