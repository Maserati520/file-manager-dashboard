import React, { useState, useRef } from 'react';
import { FiX, FiUploadCloud, FiLink, FiImage, FiAlertCircle } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';

export default function AddImageModal({ isOpen, onClose }) {
  const { addImage } = useImages();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle drag behaviors
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Process selected file
  const processFile = (file) => {
    if (!file) return;
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WEBP).');
      return;
    }

    // Convert file size
    const sizeKB = file.size / 1024;
    const sizeStr = sizeKB > 1024 
      ? `${(sizeKB / 1024).toFixed(1)} MB` 
      : `${sizeKB.toFixed(0)} KB`;

    // Create Object URL
    const objectUrl = URL.createObjectURL(file);

    // Read image dimensions
    const img = new Image();
    img.onload = () => {
      addImage(file.name, objectUrl, sizeStr, `${img.width} x ${img.height}`);
      setError('');
      onClose();
    };
    img.src = objectUrl;
  };

  // Drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // File picker handler
  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // URL form submit handler
  const handleSubmitUrl = (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Please provide a valid image URL.');
      return;
    }
    
    // Quick validation
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      setError('Image URL must start with http:// or https://');
      return;
    }

    const finalName = imageName || `web-asset-${Date.now().toString().slice(-4)}.jpg`;
    addImage(finalName, imageUrl, '1.4 MB', '1920 x 1080');
    
    setImageUrl('');
    setImageName('');
    setError('');
    onClose();
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 w-full max-w-lg border border-borderLight dark:border-slate-800 animate-fade-in text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderLight dark:border-slate-800">
          <div>
            <h3 className="font-bold text-lg">Add New Image</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Save a file to your gallery folder</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex px-6 pt-4 gap-4 text-xs font-bold border-b border-borderLight dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => { setActiveTab('upload'); setError(''); }}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'upload' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <FiUploadCloud size={14} />
            <span>Upload File</span>
          </button>
          <button
            onClick={() => { setActiveTab('url'); setError(''); }}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'url' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <FiLink size={14} />
            <span>Image URL</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-3 rounded-xl flex items-start gap-2 text-rose-500 dark:text-rose-400 text-xs font-semibold">
              <FiAlertCircle className="flex-shrink-0 mt-0.5" size={14} />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'upload' ? (
            /* Drag & Drop File Zone */
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 ${
                dragActive 
                  ? 'border-primary bg-primary-light/5' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-3">
                <FiUploadCloud size={22} className="stroke-[2.5]" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Drag & drop your image here
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-semibold">
                or click to browse folder (PNG, JPG, WEBP)
              </p>
            </div>
          ) : (
            /* URL Input Fields */
            <form onSubmit={handleSubmitUrl} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Image Filename</label>
                <input
                  type="text"
                  placeholder="e.g. workspace-draft.jpg"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:bg-white dark:focus:bg-cardBg transition-all dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Web URL Link</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:bg-white dark:focus:bg-cardBg transition-all dark:text-white"
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-3 border-t border-borderLight dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Save Image
                </button>
              </div>
            </form>
          )}

          {activeTab === 'upload' && (
            <div className="flex justify-end gap-3 pt-3 border-t border-borderLight dark:border-slate-800 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
