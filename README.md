File Manager — Image Folder Dashboard

A pixel-accurate React clone of the Hope UI Pro Admin Dashboard (File Manager → Image Folder page), built from scratch as a 3-day sprint assignment. No templates were installed — every component, layout, and style was hand-built.

🔗 Links

GitHub: https://github.com/Maserati520/file-manager-dashboard
Live Demo: https://file-manager-dashboard.vercel.app/

🛠 Tech Stack

ToolWhyReact 18 + ViteFast dev server, modern ReactReact Router v6Real URL routes per folder pageTailwind CSS v3Utility-first, design tokens as CSS varsReact Context APIShared state across componentsreact-iconsFeather icon set throughout the UI

🧠 State Management — Why Context API?

The app uses React's built-in useState, useReducer, and Context API — no Redux, no Zustand.

For a dashboard this size, that was the right call:

The component tree is shallow enough that prop drilling wasn't a problem, and Context solved the few cases where it was (image list, active theme, modal state).
There's no async fetching, no complex update chains, and no need for Redux's DevTools or middleware at this scale.
"Recently Viewed" is derived by sorting the image list on lastOpenedAt — no duplicate arrays, no sync issues, just one source of truth.

Redux Toolkit would have added boilerplate without adding value here. Context kept the code simple and easy to follow.

✨ What's Built

App shell

Collapsible sidebar with grouped nav links and a left-border active highlight using the primary color (#3A57E8)
Sticky top navbar with breadcrumbs, search bar, cart popover, notification popover, and profile dropdown
Fully responsive — hamburger drawer on mobile, full sidebar on desktop

Image Folder page

Recently Viewed — horizontally scrollable row, sorted by lastOpenedAt from state (not a separate hardcoded list)
All Images grid — 4 columns → 2 → 1 across desktop / tablet / mobile
Live search — filters the grid by file name as you type, derived from the same state array
Empty state — shown when search returns nothing or the folder is empty
Lightbox modal — read-only preview with file name, dimensions, size, and creation date

Bonus features (extra credit)

Theme customizer — floating drawer to swap the primary color across 5 palettes; choice persists in localStorage
Dark mode — toggled from the navbar, full dark: Tailwind coverage across all components
Drag & drop upload — "Add Image" opens a dropzone; dropped files are converted to Object URLs and appended to gallery state immediately
Trash & restore — deleted images move to /file-manager/trash; they can be restored or permanently deleted from there

🚀 Running the Project

You need Node.js v18+ installed.

# 1. Install dependencies

npm install

# 2. Start the dev server

npm run dev

# 3. Build for production

npm run build
Then open http://localhost:5173 in your browser.

⚠️ Known Limitations

No backend — all data is local mock data; nothing persists to a server
Uploads are session-only — dragged images use URL.createObjectURL() and are lost on page refresh
Trash resets on refresh — deleted images are held in local state only
Edit / rename not implemented — intentionally out of scope for this round
Add Image button — visually present on all other routes but only functional on the Image Folder page

📁 Project Structure
src/
├── assets/ # Static images and icons
├── components/ # Reusable UI components (ImageCard, Modal, etc.)
├── context/ # React Context store (images, theme, modal state)
├── data/ # Mock image data (JSON-style array)
├── layouts/ # AppLayout with Sidebar + Navbar + Outlet
├── pages/ # Route-level page components
└── utils/ # Helper functions (date formatting, etc.)
