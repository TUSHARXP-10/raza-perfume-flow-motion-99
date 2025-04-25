
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom colors for our themes
        regal: {
          background: '#121212',
          primary: '#8A6C3E',
          accent: '#D4AF37',
          text: '#F6F6F6',
          muted: '#333333'
        },
        mystic: {
          background: '#0D1B2A',
          primary: '#6A7B91',
          accent: '#B8C4DB',
          text: '#E0E1DD',
          muted: '#2C3E50'
        },
        bloom: {
          background: '#200020',
          primary: '#9C446E',
          accent: '#F6C9E0',
          text: '#FFFFFF',
          muted: '#412941'
        },
        amber: {
          background: '#1A0F00',
          primary: '#C87D30',
          accent: '#FFD700',
          text: '#F8F2E9',
          muted: '#3D2B13'
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'arabic': ['Noto Kufi Arabic', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        // Original shadcn keyframes
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Custom animations for our flowing effects
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { 
            backgroundPosition: '-400px 0'
          },
          '100%': { 
            backgroundPosition: '400px 0'
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'flow': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '33%': { transform: 'translateX(20px) translateY(-10px)' },
          '66%': { transform: 'translateX(-15px) translateY(15px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'rotate-3d': {
          '0%, 100%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          },
          '50%': { 
            transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' 
          },
        },
        'wave': {
          '0%, 100%': { 
            clipPath: 'polygon(0% 50%, 16% 45%, 33% 50%, 50% 60%, 66% 65%, 83% 53%, 100% 45%, 100% 100%, 0% 100%)'
          },
          '50%': { 
            clipPath: 'polygon(0% 60%, 16% 65%, 33% 58%, 50% 45%, 66% 40%, 83% 53%, 100% 58%, 100% 100%, 0% 100%)'
          },
        },
        'scent-drift': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px) scale(0.8)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0px) scale(1)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'flow': 'flow 7s ease-in-out infinite',
        'rotate-3d': 'rotate-3d 7s ease-in-out infinite',
        'wave': 'wave 5s ease-in-out infinite',
        'scent-drift': 'scent-drift 1s ease-out forwards'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
