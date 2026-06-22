import React from 'react';
import { FiFileText, FiShare2, FiDownload, FiTrash, FiEye } from 'react-icons/fi';
import { formatDate } from '../utils/time';

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: 'annual-report-2025.pdf', size: '2.4 MB', pages: 32, date: '2026-01-10T11:00:00Z', type: 'PDF' },
    { id: 2, name: 'q1-financials-sheet.xlsx', size: '840 KB', pages: null, date: '2026-04-12T09:15:00Z', type: 'XLSX' },
    { id: 3, name: 'marketing-copywrite.docx', size: '1.2 MB', pages: 12, date: '2026-06-18T14:45:00Z', type: 'DOCX' },
    { id: 4, name: 'hope-ui-pitch-deck.pdf', size: '15.4 MB', pages: 45, date: '2026-06-20T16:00:00Z', type: 'PDF' },
  ];

  const typeColors = {
    PDF: 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30',
    XLSX: 'bg-emerald-50 text-emerald-500 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
    DOCX: 'bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-1">Documents</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Access spreadsheets, slides, and text document assets.</p>
        </div>
        <button 
          onClick={() => alert('Add Document is disabled this round')}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start"
        >
          Add Document
        </button>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-5 shadow-soft hover:shadow-card-hover group transition-all duration-200 flex items-center gap-4">
            {/* Type Badge Icon */}
            <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border font-bold text-xs flex-shrink-0 ${typeColors[doc.type] || 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800'}`}>
              <FiFileText size={20} className="mb-0.5" />
              <span className="text-[9px] tracking-wide uppercase">{doc.type}</span>
            </div>

            {/* Info details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate block" title={doc.name}>
                {doc.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                <span>{doc.size}</span>
                {doc.pages && (
                  <>
                    <span>•</span>
                    <span>{doc.pages} Pages</span>
                  </>
                )}
                <span>•</span>
                <span>{formatDate(doc.date)}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all" title="Quick View">
                <FiEye size={15} />
              </button>
              <button className="p-2 rounded-lg text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all" title="Download">
                <FiDownload size={15} />
              </button>
              <button className="p-2 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all" title="Move to Trash">
                <FiTrash size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
