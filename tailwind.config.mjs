/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8E3FE8',
          dark: '#6B2BBA',
        },
        ink: '#0A0A0A',
        muted: '#6B7280',
        line: '#E5E7EB',
      },
      fontFamily: {
        marker: ['"Permanent Marker"', '"Caveat Brush"', '"Reenie Beanie"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(4.5rem, 12vw, 11rem)',
        'section-label': 'clamp(3rem, 6vw, 5rem)',
        'divider-giant': 'clamp(8rem, 22vw, 24rem)',
        eyebrow: '0.875rem',
      },
      boxShadow: {
        phone: '0 30px 60px -20px rgba(0,0,0,0.25), 0 18px 30px -18px rgba(0,0,0,0.15)',
        card: '0 20px 40px -15px rgba(0,0,0,0.18)',
        lightbox: '0 50px 100px -20px rgba(0,0,0,0.5)',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
