import React from 'react';
import { FiVideo, FiPlay, FiShare2, FiDownload, FiTrash } from 'react-icons/fi';
import { formatDate } from '../utils/time';

export default function VideosPage() {
  const videos = [
    { id: 1, name: 'promo-teaser-2026.mp4', size: '18.4 MB', duration: '02:15', date: '2026-06-12T10:00:00Z', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop&q=80' },
    { id: 2, name: 'brand-advocacy-interview.mp4', size: '124.2 MB', duration: '12:40', date: '2026-06-15T15:30:00Z', thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80' },
    { id: 3, name: 'product-demo-v4.mov', size: '82.7 MB', duration: '05:55', date: '2026-06-18T09:15:00Z', thumbnail: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&auto=format&fit=crop&q=80' },
    { id: 4, name: 'social-media-ad-clip.mp4', size: '12.5 MB', duration: '00:30', date: '2026-06-20T11:00:00Z', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-1">Videos</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Organize and preview your video folders and clips.</p>
        </div>
        <button 
          onClick={() => alert('Add Video is disabled this round')}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start"
        >
          Add Video
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-4 shadow-soft hover:shadow-card-hover group transition-all duration-200">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
              <img 
                src={video.thumbnail} 
                alt={video.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 shadow-lg transition-transform">
                  <FiPlay size={18} className="fill-primary pl-0.5" />
                </button>
              </div>
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-slate-900/70 text-[10px] text-white font-bold rounded-md">
                {video.duration}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate block" title={video.name}>{video.name}</h4>
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>{video.size}</span>
                <span>{formatDate(video.date)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 border-t border-borderLight dark:border-borderLight/30 pt-3 mt-3">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                <FiShare2 size={14} />
              </button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                <FiDownload size={14} />
              </button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                <FiTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
