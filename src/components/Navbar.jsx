import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FiSearch, FiBell, FiShoppingCart, FiSun, FiMoon, FiMenu, 
  FiSettings, FiChevronDown, FiUser, FiSliders, FiLogOut, FiFolder, FiFile, FiCheck
} from 'react-icons/fi';
import { useImages } from '../context/ImageContext';

export default function Navbar({ onMenuToggle, onSettingsToggle }) {
  const { searchQuery, setSearchQuery, darkMode, toggleDarkMode, themeColor, changeThemeColor, themes } = useImages();
  const location = useLocation();

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Refs for click outside
  const notificationRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, idx) => {
    const routeTo = '/' + pathParts.slice(0, idx + 1).join('/');
    const isLast = idx === pathParts.length - 1;
    // Format label
    const label = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return { label, routeTo, isLast };
  });

  const notifications = [
    { id: 1, title: 'Server backup completed', desc: 'All files are securely synced.', time: '5 mins ago', read: false },
    { id: 2, title: 'New folder shared with you', desc: 'Sarah added you to "Marketing Assets".', time: '1 hour ago', read: false },
    { id: 3, title: 'Storage limit reached 80%', desc: 'Consider upgrading your plan.', time: '1 day ago', read: true }
  ];

  const cartItems = [
    { id: 1, name: 'annual-report-2026.png', size: '2.4 MB' },
    { id: 2, name: 'marketing-strategy-slides.jpg', size: '4.8 MB' }
  ];

  return (
    <nav className="sticky top-0 bg-white/80 dark:bg-cardBg/80 backdrop-blur-md border-b border-borderLight dark:border-borderLight/30 h-16 px-6 flex items-center justify-between z-30 transition-all">
      {/* Left side: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <FiMenu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-sm select-none">
          <Link to="/file-manager/images" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
            <FiFolder size={14} />
            <span>Files</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-400">/</span>
              {crumb.isLast ? (
                <span className="font-semibold text-slate-800 dark:text-white transition-colors">{crumb.label}</span>
              ) : (
                <Link to={crumb.routeTo} className="text-slate-400 hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Middle side: Live Search (Optional, hides on small mobile screens) */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative group">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={17} />
          <input
            type="text"
            placeholder="Search files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:bg-white dark:focus:bg-cardBg transition-all dark:text-white"
          />
        </div>
      </div>

      {/* Right side: Action items */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Switch */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:text-slate-400 dark:hover:text-primary dark:hover:bg-slate-800 transition-all"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? <FiSun size={19} /> : <FiMoon size={19} />}
        </button>

        {/* Dynamic Color Palette Dropdown (Quick Customizer) */}
        <button
          onClick={onSettingsToggle}
          className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:text-slate-400 dark:hover:text-primary dark:hover:bg-slate-800 transition-all"
          title="Theme Customizer"
        >
          <FiSettings size={19} className="animate-spin-[120s]" />
        </button>

        {/* Cart Dropdown (Download Basket) */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setShowCart(!showCart)}
            className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:text-slate-400 dark:hover:text-primary dark:hover:bg-slate-800 relative transition-all"
            title="Download Basket"
          >
            <FiShoppingCart size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-info"></span>
          </button>

          {showCart && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-borderLight dark:border-slate-800 rounded-2xl shadow-xl py-3 px-4 animate-fade-in text-slate-800 dark:text-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-slate-800 mb-3">
                <span className="font-bold text-sm">Download Basket</span>
                <span className="text-xs bg-info/10 text-info px-2 py-0.5 rounded-full font-semibold">{cartItems.length} Files</span>
              </div>
              <ul className="space-y-2 mb-3">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FiFile className="text-slate-400 flex-shrink-0" size={14} />
                      <span className="text-xs font-medium truncate block">{item.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.size}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => alert('Starting batch download for basket files...')}
                className="w-full text-center py-2 text-xs font-semibold text-white rounded-xl bg-primary hover:bg-primary-hover shadow-xs transition-colors"
              >
                Download Selected (.zip)
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:text-slate-400 dark:hover:text-primary dark:hover:bg-slate-800 relative transition-all"
            title="Notifications"
          >
            <FiBell size={19} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center font-bold">2</span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-borderLight dark:border-slate-800 rounded-2xl shadow-xl py-3 px-4 animate-fade-in text-slate-800 dark:text-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-slate-800 mb-3">
                <span className="font-bold text-sm">Notifications</span>
                <button className="text-[10px] text-primary hover:underline font-semibold">Mark all as read</button>
              </div>
              <ul className="space-y-3 mb-2 max-h-72 overflow-y-auto custom-scrollbar">
                {notifications.map(noti => (
                  <li key={noti.id} className="relative p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 flex gap-2">
                    {!noti.read && (
                      <span className="absolute top-3.5 left-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    )}
                    <div className="pl-1.5">
                      <h5 className="text-xs font-semibold">{noti.title}</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{noti.desc}</p>
                      <span className="text-[9px] text-slate-400 block mt-1 font-semibold">{noti.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Austin Robertson"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <FiChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-borderLight dark:border-slate-800 rounded-2xl shadow-xl py-2 px-2 animate-fade-in text-slate-800 dark:text-slate-200">
              <div className="px-3 py-2 border-b border-borderLight dark:border-slate-800 mb-2">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
                <p className="text-sm font-semibold truncate">austin@hopeui.com</p>
              </div>
              <ul className="space-y-1">
                <li>
                  <Link to="/profile" onClick={() => setShowProfile(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                    <FiUser size={14} />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile/settings" onClick={() => setShowProfile(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                    <FiSliders size={14} />
                    <span>Privacy Settings</span>
                  </Link>
                </li>
                <li className="border-t border-borderLight dark:border-slate-800 pt-1 mt-1">
                  <button 
                    onClick={() => { setShowProfile(false); alert('Signing out...'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all text-left"
                  >
                    <FiLogOut size={14} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
