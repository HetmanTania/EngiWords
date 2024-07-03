/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '1rem',
        xm: '1.2rem',
        base: '1.5rem',
        lg: '1.8rem',
        xl: '2rem',
        '1.5xl': '2.4rem',
        '2xl': '2.8rem',
        '3xl': '2.66rem',
        '4xl': '3.19rem',
        '5xl': '4.27rem',
        '6xl': '5.33rem',
        '7xl': '6.4rem',
        '8xl': '8.52rem',
        '9xl': '11.4rem',
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: "var(--sidebar)",
        gray: "var(--gray)",
        white: "var(--white)",
        error: "var(--error)",
        text: {
          DEFAULT: "var(--text)",
          5: "var(--text5)",
          100: "var(--text10)",
          200: "var(--text20)",
          300: "var(--text40)",
          400: "var(--text50)",
          500: "var(--text60)",
          600: "var(--text70)",
          700: "var(--text80)",
          800: "var(--text80)",
          900: "var(--text90)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          5: "var(--primary5)",
          100: "var(--primary10)",
          200: "var(--primary20)",
          300: "var(--primary30)",
          400: "var(--primary40)",
          500: "var(--primary50)",
          600: "var(--primary60)",
          700: "var(--primary70)",
          800: "var(--primary80)",
          900: "var(--primary90)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          5: "var(--secondary5)",
          100: "var(--secondary10)",
          200: "var(--secondary20)",
          300: "var(--secondary30)",
          400: "var(--secondary40)",
          500: "var(--secondary50)",
          600: "var(--secondary60)",
          700: "var(--secondary70)",
          800: "var(--secondary80)",
          900: "var(--secondary90)",
        },
        gradient: 'var(--gradient)',
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: "var(--accent)",
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      keyframes: {
        'scalePoint': {
          '0%': { transform: 'scale(100%)'},
          '50%': { transform: 'scale(50%)'},
          '100%': { transform: 'scale(100%)' }
        }
      },
      animation: {
        scalePoint200ms: 'scalePoint 1s .2s linear infinite',
        scalePoint400ms: 'scalePoint 1s .4s linear infinite',
        scalePoint600ms: 'scalePoint 1s .6s linear infinite',
      }
    },
  },
  plugins: [],
}

