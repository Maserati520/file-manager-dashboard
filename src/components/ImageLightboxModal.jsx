import React from 'react';
import { FiX, FiDownload, FiTrash, FiCalendar, FiMaximize, FiInfo } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';
import { formatDate } from '../utils/time';

export default function ImageLightboxModal() {
  const { selectedImage, closeImage, moveToTrash } = useImages();

  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeImage}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 w-full max-w-4xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[80vh] border border-borderLight dark:border-slate-800 animate-fade-in text-slate-800 dark:text-slate-200">
        
        {/* Left Side: Image Preview */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center p-4 md:p-8 relative min-h-[300px] md:min-h-0">
          <img 
            src={selectedImage.url} 
            alt={selectedImage.name} 
            className="max-w-full max-h-[40vh] md:max-h-[60vh] object-contain rounded-lg shadow-lg"
          />
          <a 
            href={selectedImage.url} 
            target="_blank" 
            rel="noreferrer"
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 text-white transition-all shadow-xs"
            title="Open original image in new tab"
          >
            <FiMaximize size={16} />
          </a>
        </div>

        {/* Right Side: Metadata / Details Panel */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-borderLight dark:border-slate-800 flex flex-col justify-between p-6 bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* Header & Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white break-all leading-tight pr-2">
                  {selectedImage.name}
                </h3>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-1 block">Image Properties</span>
              </div>
              <button 
                onClick={closeImage}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Properties List */}
            <div className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3 bg-white dark:bg-cardBg p-3 rounded-xl border border-borderLight dark:border-slate-800 shadow-2xs">
                <FiInfo className="text-slate-400 dark:text-slate-500 flex-shrink-0" size={15} />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Dimensions</span>
                  <span className="text-slate-800 dark:text-white truncate block">{selectedImage.dimensions || '1920 x 1080'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white dark:bg-cardBg p-3 rounded-xl border border-borderLight dark:border-slate-800 shadow-2xs">
                <FiMaximize className="text-slate-400 dark:text-slate-500 flex-shrink-0" size={15} />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">File Size</span>
                  <span className="text-slate-800 dark:text-white truncate block">{selectedImage.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white dark:bg-cardBg p-3 rounded-xl border border-borderLight dark:border-slate-800 shadow-2xs">
                <FiCalendar className="text-slate-400 dark:text-slate-500 flex-shrink-0" size={15} />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Created At</span>
                  <span className="text-slate-800 dark:text-white truncate block">{formatDate(selectedImage.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons at Bottom */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-borderLight dark:border-slate-800">
            <button
              onClick={() => window.open(selectedImage.url, '_blank')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors text-slate-700 dark:text-slate-300"
            >
              <FiDownload size={14} />
              <span>Download</span>
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Move this image to the trash?')) {
                  moveToTrash(selectedImage.id);
                }
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors shadow-2xs"
            >
              <FiTrash size={14} />
              <span>Trash</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
