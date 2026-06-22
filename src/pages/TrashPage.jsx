import React from 'react';
import { FiTrash2, FiRotateCcw, FiTrash, FiAlertCircle } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';
import { formatDate } from '../utils/time';

export default function TrashPage() {
  const { trash, restoreFromTrash, deletePermanently, clearTrash } = useImages();

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-1">Trash Folder</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Recover items that you have deleted in the File Manager.</p>
        </div>
        {trash.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to permanently delete all items in the trash?')) {
                clearTrash();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start"
          >
            <FiTrash2 size={14} />
            <span>Empty Trash</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      {trash.length === 0 ? (
        <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-16 text-center shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto mb-4">
            <FiTrash2 size={30} />
          </div>
          <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">Trash is empty</h3>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 max-w-sm mx-auto">
            Items you delete from the Images tab will appear here, where you can restore them or delete them permanently.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trash.map(image => (
            <div key={image.id} className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-4 shadow-soft hover:shadow-card-hover group transition-all duration-200 flex flex-col justify-between">
              {/* Thumbnail (opaque to signify deletion) */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                <img 
                  src={image.url} 
                  alt={image.name} 
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:scale-102 transition-transform duration-200"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-rose-500 text-[10px] text-white font-bold rounded-md flex items-center gap-1 shadow-sm">
                  <FiAlertCircle size={10} /> Trashed
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate block" title={image.name}>
                  {image.name}
                </h4>
                <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
                  <span>{image.size}</span>
                  <span>{formatDate(image.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 border-t border-borderLight dark:border-borderLight/30 pt-3 mt-3">
                <button
                  onClick={() => restoreFromTrash(image.id)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-primary bg-primary-light hover:bg-primary/10 transition-all"
                  title="Restore File"
                >
                  <FiRotateCcw size={13} />
                  <span>Restore</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Permanently delete "${image.name}"? This action cannot be undone.`)) {
                      deletePermanently(image.id);
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all"
                  title="Delete Permanently"
                >
                  <FiTrash size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
