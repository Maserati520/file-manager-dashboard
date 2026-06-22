import React from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiImage, FiVideo, FiFileText, FiChevronRight, FiHardDrive, FiClock } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';
import { formatDate } from '../utils/time';

export default function AllFilesPage() {
  const { images } = useImages();

  const folders = [
    { name: 'Images', path: '/file-manager/images', count: `${images.length} Files`, size: '54.6 MB', color: 'bg-indigo-500', text: 'text-indigo-500', icon: FiImage },
    { name: 'Videos', path: '/file-manager/videos', count: '12 Files', size: '320.4 MB', color: 'bg-emerald-500', text: 'text-emerald-500', icon: FiVideo },
    { name: 'Documents', path: '/file-manager/documents', count: '48 Files', size: '15.2 MB', color: 'bg-amber-500', text: 'text-amber-500', icon: FiFileText },
  ];

  const recentFiles = [
    { name: 'q2-marketing-strategy.pdf', size: '4.2 MB', date: '2026-06-21T11:00:00Z', type: 'document', icon: FiFileText, text: 'text-amber-500' },
    { name: 'annual-report-2026.png', size: '2.4 MB', date: '2026-06-22T18:35:00Z', type: 'image', icon: FiImage, text: 'text-indigo-500' },
    { name: 'customer-interview.mp4', size: '85.4 MB', date: '2026-06-18T14:20:00Z', type: 'video', icon: FiVideo, text: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-cardBg p-6 rounded-2xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 border border-borderLight dark:border-borderLight/30">
        <div>
          <h1 className="font-bold text-2xl mb-1">File Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Access, manage, and share your cloud storage folder contents instantly.</p>
        </div>
        
        {/* Storage Bar Indicator */}
        <div className="w-full md:w-64 space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold flex items-center gap-1.5"><FiHardDrive size={13} /> Cloud Storage</span>
            <span className="text-slate-500 dark:text-slate-400 font-semibold">390.2 / 512 MB Used</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '76.2%' }}></div>
          </div>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder, idx) => {
            const Icon = folder.icon;
            return (
              <Link 
                key={idx} 
                to={folder.path}
                className="group bg-white dark:bg-cardBg p-6 rounded-2xl shadow-soft hover:shadow-card-hover border border-borderLight dark:border-borderLight/30 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 flex flex-col justify-between h-40"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${folder.color} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-slate-400 group-hover:text-primary transition-colors">
                    <FiChevronRight size={18} />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base mt-4 group-hover:text-primary transition-colors">{folder.name}</h3>
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    <span>{folder.count}</span>
                    <span>•</span>
                    <span>{folder.size}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Files Table */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <FiClock className="text-slate-400" size={17} />
          <span>Recently Uploaded</span>
        </h2>
        <div className="bg-white dark:bg-cardBg rounded-2xl shadow-soft border border-borderLight dark:border-borderLight/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-borderLight dark:border-borderLight/30 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">File Size</th>
                  <th className="px-6 py-4">Modified Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLight dark:divide-borderLight/30 font-medium">
                {recentFiles.map((file, idx) => {
                  const FileIcon = file.icon;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${file.text}`}>
                            <FileIcon size={16} />
                          </div>
                          <span className="font-semibold truncate max-w-xs">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{file.size}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{formatDate(file.date)}</td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={file.type === 'image' ? '/file-manager/images' : `/file-manager/${file.type}s`}
                          className="text-primary hover:underline font-semibold text-xs"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
