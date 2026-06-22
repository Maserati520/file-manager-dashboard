import React, { useState } from 'react';
import { FiImage, FiPlus, FiGrid, FiSearch, FiSliders, FiClock } from 'react-icons/fi';
import { useImages } from '../context/ImageContext';
import ImageCard from '../components/ImageCard';
import AddImageModal from '../components/AddImageModal';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ImagesPage() {
  const { images, searchQuery, setSearchQuery } = useImages();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Derive "Recently Viewed" images (sorted by lastOpenedAt descending, take top 6)
  // We only include files that have a valid lastOpenedAt
  const recentlyViewed = [...images]
    .filter(img => img.lastOpenedAt)
    .sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt))
    .slice(0, 6);

  // Filter "All Images" based on search query
  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-1">Images</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage and organize your graphical mockup drafts and assets.</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start hover-scale"
        >
          <FiPlus size={16} className="stroke-[2.5]" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Live Search bar for smaller screens where the navbar search is hidden */}
      <div className="relative group md:hidden">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={17} />
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-cardBg border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary transition-all dark:text-white"
        />
      </div>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-section-title flex items-center gap-2">
            <FiClock className="text-slate-400" size={17} />
            <span>Recently Viewed</span>
          </h3>
          {/* Horizontal Scroller container */}
          <div className="flex overflow-x-auto gap-6 w-full custom-scrollbar pb-4 select-none">
            {recentlyViewed.map(image => (
              <div key={`recent-${image.id}`} className="w-64 flex-shrink-0">
                <ImageCard image={image} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Images Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-section-title flex items-center gap-2">
            <FiGrid className="text-slate-400" size={17} />
            <span>All Images</span>
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md uppercase">
            {filteredImages.length} Files
          </span>
        </div>

        {images.length === 0 ? (
          /* Empty state for the entire folder */
          <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-16 text-center shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto mb-4">
              <FiImage size={30} />
            </div>
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">No images in folder</h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 max-w-xs mx-auto">
              This folder is currently empty. Click the "Add Image" button above to upload graphical assets.
            </p>
          </div>
        ) : filteredImages.length === 0 ? (
          /* Empty state for search filtering misses */
          <div className="bg-white dark:bg-cardBg border border-borderLight dark:border-borderLight/30 rounded-2xl p-16 text-center shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto mb-4">
              <FiSearch size={30} />
            </div>
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">No search results</h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 max-w-xs mx-auto">
              We couldn't find any images matching "{searchQuery}". Try editing the filename search query.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          /* Images Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map(image => (
              <ImageCard key={`grid-${image.id}`} image={image} />
            ))}
          </div>
        )}
      </div>

      {/* Add New Image Drawer Modal */}
      <AddImageModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
      />

      {/* Image Lightbox Preview Modal */}
      <ImageLightboxModal />

    </div>
  );
}
