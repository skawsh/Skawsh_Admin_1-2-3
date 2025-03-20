
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
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
			},
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
        laundry: {
          blue: '#3b82f6',
          'blue-light': '#60a5fa',
          'blue-dark': '#2563eb',
          pink: '#ec4899',
          purple: '#8b5cf6',
          green: '#10b981',
          yellow: '#f59e0b',
          orange: '#f97316',
          red: '#ef4444',
          teal: '#14b8a6',
          cyan: '#06b6d4',
          indigo: '#6366f1'
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'bright': '0 10px 20px -5px rgba(59, 130, 246, 0.25)',
        'color-glow': '0 0 15px rgba(99, 102, 241, 0.4)',
        'blue-glow': '0 5px 15px -3px rgba(59, 130, 246, 0.4)',
        'green-glow': '0 5px 15px -3px rgba(16, 185, 129, 0.4)',
        'purple-glow': '0 5px 15px -3px rgba(139, 92, 246, 0.4)',
        'pink-glow': '0 5px 15px -3px rgba(236, 72, 153, 0.4)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'color-cycle': {
          '0%, 100%': { borderColor: 'rgba(59, 130, 246, 0.5)' },
          '25%': { borderColor: 'rgba(16, 185, 129, 0.5)' },
          '50%': { borderColor: 'rgba(139, 92, 246, 0.5)' },
          '75%': { borderColor: 'rgba(236, 72, 153, 0.5)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-light': 'pulse-light 1.5s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out',
        'color-cycle': 'color-cycle 8s infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite'
			},
      backgroundImage: {
        'gradient-card-blue': 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        'gradient-card-green': 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        'gradient-card-purple': 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
        'gradient-card-pink': 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
        'gradient-card-yellow': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        'gradient-card-orange': 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
        'gradient-card-red': 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
        'gradient-card-cyan': 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
        'gradient-card-indigo': 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
        'gradient-vibrant': 'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
