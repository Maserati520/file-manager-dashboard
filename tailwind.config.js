/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #3A57E8)',
          light: 'var(--color-primary-light, #ebedfc)',
          hover: 'var(--color-primary-hover, #2a47d8)',
        },
        info: {
          DEFAULT: 'var(--color-info, #08B1BA)',
          light: 'var(--color-info-light, #e6f7f8)',
        },
        pageBg: 'var(--color-page-bg, #F5F6FA)',
        cardBg: 'var(--color-card-bg, #FFFFFF)',
        borderLight: 'var(--color-border-light, #EEEEEE)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['22px', { lineHeight: '30px', fontWeight: '700' }],
        'section-title': ['18px', { lineHeight: '24px', fontWeight: '700' }],
        'body-meta': ['13px', { lineHeight: '18px' }],
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 30px 0 rgba(58, 87, 232, 0.1)',
      }
    },
  },
  plugins: [],
}
