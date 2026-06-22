import React from 'react';
import { FiX, FiCheck, FiSun, FiMoon } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';

export default function ThemeCustomizer({ isOpen, onClose }) {
  const { themeColor, changeThemeColor, themes, darkMode, toggleDarkMode } = useImages();

  if (!isOpen) return null;

  const colorLabels = {
    '#3A57E8': { name: 'Hope Blue', class: 'bg-[#3A57E8]' },
    '#10B981': { name: 'Emerald Green', class: 'bg-[#10B981]' },
    '#8B5CF6': { name: 'Royal Purple', class: 'bg-[#8B5CF6]' },
    '#EF4444': { name: 'Vivid Red', class: 'bg-[#EF4444]' },
    '#F59E0B': { name: 'Bright Orange', class: 'bg-[#F59E0B]' },
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Panel */}
      <div className="relative w-80 max-w-full bg-white dark:bg-slate-900 h-full shadow-2xl z-10 flex flex-col p-6 animate-fade-in border-l border-borderLight dark:border-slate-800 text-slate-800 dark:text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-borderLight dark:border-slate-800 mb-6">
          <div>
            <h3 className="font-bold text-lg">Theme Customizer</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Configure dashboard presets</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Customization Options */}
        <div className="flex-1 overflow-y-auto space-y-8 pr-1 custom-scrollbar">
          {/* Theme Mode Option */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Theme Mode</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { if (darkMode) toggleDarkMode(); }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-xs transition-all ${
                  !darkMode 
                    ? 'border-primary text-primary bg-primary/5 ring-1 ring-primary' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                <FiSun size={15} />
                <span>Light</span>
              </button>
              <button
                onClick={() => { if (!darkMode) toggleDarkMode(); }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-xs transition-all ${
                  darkMode 
                    ? 'border-primary text-primary bg-primary/5 ring-1 ring-primary' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                <FiMoon size={15} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Color Customization Preset Option */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Primary Color Scheme</span>
            <div className="space-y-2">
              {themes.map(color => {
                const isSelected = themeColor === color;
                const config = colorLabels[color] || { name: 'Custom Color', class: 'bg-primary' };

                return (
                  <button
                    key={color}
                    onClick={() => changeThemeColor(color)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      isSelected 
                        ? 'border-primary ring-1 ring-primary bg-primary/5 text-primary' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-lg ${config.class} shadow-xs block`}></span>
                      <span>{config.name}</span>
                    </div>
                    {isSelected && <FiCheck size={16} className="text-primary stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2 text-xs">
            <span className="font-bold block text-slate-700 dark:text-slate-300">Design Specifications</span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Hope UI Pro uses modern layout guidelines and harmonic token scaling. Changes will apply immediately across elements and components.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-borderLight dark:border-slate-800 pt-4 mt-6">
          <button 
            onClick={() => {
              changeThemeColor('#3A57E8');
              if (darkMode) toggleDarkMode();
              onClose();
            }}
            className="w-full text-center py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
