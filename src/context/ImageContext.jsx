import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialImages } from '../data/mockImages';

const ImageContext = createContext(null);

const themes = {
  '#3A57E8': { hover: '#2944c7', light: 'rgba(58, 87, 232, 0.08)' }, // Blue
  '#10B981': { hover: '#059669', light: 'rgba(16, 185, 129, 0.08)' }, // Green
  '#8B5CF6': { hover: '#7C3AED', light: 'rgba(139, 92, 246, 0.08)' }, // Purple
  '#EF4444': { hover: '#DC2626', light: 'rgba(239, 68, 68, 0.08)' }, // Red
  '#F59E0B': { hover: '#D97706', light: 'rgba(245, 158, 11, 0.08)' }, // Orange
};

export function ImageProvider({ children }) {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('hope_ui_images');
    return saved ? JSON.parse(saved) : initialImages;
  });

  const [trash, setTrash] = useState(() => {
    const saved = localStorage.getItem('hope_ui_trash');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [themeColor, setThemeColorState] = useState(() => {
    return localStorage.getItem('hope_ui_theme_color') || '#3A57E8';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('hope_ui_dark_mode') === 'true';
  });

  // Persist images & trash
  useEffect(() => {
    localStorage.setItem('hope_ui_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('hope_ui_trash', JSON.stringify(trash));
  }, [trash]);

  // Apply theme color customizer CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeColor);
    const themeConfig = themes[themeColor] || themes['#3A57E8'];
    root.style.setProperty('--color-primary-hover', themeConfig.hover);
    root.style.setProperty('--color-primary-light', themeConfig.light);
    localStorage.setItem('hope_ui_theme_color', themeColor);
  }, [themeColor]);

  // Apply dark mode html class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('hope_ui_dark_mode', darkMode);
  }, [darkMode]);

  // Actions
  const openImage = (id) => {
    const nowISO = "2026-06-22T18:47:07+02:00"; // Current system reference time
    
    // Update lastOpenedAt in state so that it bubbles up in "Recently Viewed"
    setImages(prevImages => {
      const updated = prevImages.map(img => {
        if (img.id === id) {
          const updatedImg = { ...img, lastOpenedAt: nowISO };
          // Open lightbox with updated details
          setSelectedImage(updatedImg);
          return updatedImg;
        }
        return img;
      });
      return updated;
    });
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const addImage = (name, url, size = '1.2 MB', dimensions = '1920 x 1080') => {
    const nowISO = new Date("2026-06-22T18:47:07+02:00").toISOString();
    const newImage = {
      id: `img-${Date.now()}`,
      name: name || 'unnamed-file.png',
      url: url || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
      size,
      dimensions,
      createdAt: nowISO,
      lastOpenedAt: nowISO
    };
    setImages(prev => [newImage, ...prev]);
  };

  const moveToTrash = (id) => {
    const targetImage = images.find(img => img.id === id);
    if (!targetImage) return;

    setImages(prev => prev.filter(img => img.id !== id));
    setTrash(prev => [targetImage, ...prev]);
    
    // Close preview if the deleted image was active in the lightbox
    if (selectedImage && selectedImage.id === id) {
      setSelectedImage(null);
    }
  };

  const restoreFromTrash = (id) => {
    const targetImage = trash.find(img => img.id === id);
    if (!targetImage) return;

    setTrash(prev => prev.filter(img => img.id !== id));
    
    // Set last opened to now so it shows up in active images
    const nowISO = "2026-06-22T18:47:07+02:00";
    setImages(prev => [{ ...targetImage, lastOpenedAt: nowISO }, ...prev]);
  };

  const deletePermanently = (id) => {
    setTrash(prev => prev.filter(img => img.id !== id));
  };

  const clearTrash = () => {
    setTrash([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const changeThemeColor = (color) => {
    if (themes[color]) {
      setThemeColorState(color);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        trash,
        searchQuery,
        setSearchQuery,
        selectedImage,
        themeColor,
        darkMode,
        openImage,
        closeImage,
        addImage,
        moveToTrash,
        restoreFromTrash,
        deletePermanently,
        clearTrash,
        toggleDarkMode,
        changeThemeColor,
        themes: Object.keys(themes)
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}
