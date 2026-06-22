import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiEye, FiDownload, FiTrash, FiFile } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';
import { getRelativeTime, formatDate } from '../utils/time';

export default function ImageCard({ image }) {
  const { openImage, moveToTrash } = useImages();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract file extension
  const getExtension = (filename) => {
    if (!filename) return 'IMG';
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'IMG';
  };

  const fileExt = getExtension(image.name);

  return (
    <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-4 shadow-soft hover:shadow-card-hover group hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between select-none">
      {/* Thumbnail Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50 dark:bg-slate-800">
        <img 
          src={image.url} 
          alt={image.name} 
          onClick={() => openImage(image.id)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          loading="lazy"
        />

        {/* Floating extension badge */}
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-info/90 text-white font-bold text-[9px] tracking-wide rounded-md shadow-sm uppercase backdrop-blur-xs">
          {fileExt}
        </span>

        {/* Hover quick preview button overlay */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 pointer-events-none">
          <span className="bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <FiEye size={12} /> Preview
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-1">
          <div className="min-w-0">
            <h4 
              onClick={() => openImage(image.id)}
              className="font-bold text-sm text-slate-800 dark:text-white truncate cursor-pointer hover:text-primary transition-colors block"
              title={image.name}
            >
              {image.name}
            </h4>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold block mt-0.5">
              {image.size}
            </span>
          </div>

          {/* Context menu trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <FiMoreVertical size={16} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-borderLight dark:border-slate-800 rounded-xl shadow-lg py-1 z-20 animate-fade-in text-xs font-semibold text-slate-700 dark:text-slate-300">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    openImage(image.id);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <FiEye size={13} className="text-slate-400" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    window.open(image.url, '_blank');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <FiDownload size={13} className="text-slate-400" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    moveToTrash(image.id);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-rose-500 transition-colors border-t border-borderLight dark:border-slate-800"
                >
                  <FiTrash size={13} />
                  <span>Move to Trash</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Date and opened indicators */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-semibold border-t border-borderLight dark:border-borderLight/20 pt-2">
          <span>Created: {formatDate(image.createdAt)}</span>
          <span className="text-primary dark:text-primary/80 bg-primary-light px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide">
            {getRelativeTime(image.lastOpenedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
