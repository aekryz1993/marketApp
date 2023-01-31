/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '1px 1px 15px 1px rgba(0, 0, 0, 0.1), -1px -1px 15px 1px rgba(0, 0, 0, 0.1)',
      },
      rotate: {
        315: "315deg",
      },
      fontSize: {
        /**
         * min width 480px
         * max width 1280px
         * x — current viewport width value (px).
         * y — resulting fluid font size for a current viewport width value x (px).
         * v — viewport width value that affects fluid value change rate (vw).
         * r — relative size equal to browser font size. Default value is 14px.
         * y1 = v / 100 * (x1 + r)
         * y2 = v / 100 * (x2 + r)
         * v = 100 * (y2 - y1) / (x2 - x1)
         * r = (x1 * y2 - x2 * y1) / (x1 - x2)
         */
        xs: [
          'clamp(0.625rem, 0.219vw + 0.55rem, 0.75rem)',
          {
            lineHeight: 'clamp(0.75rem, 0.219vw + 0.6rem, 1rem)'
          }
        ],
        sm: [
          'clamp(0.75rem, 0.219vw + 0.675rem, 0.875rem)',
          {
            lineHeight: 'clamp(1rem, 0.219vw + 0.85rem, 1.25rem)'
          }
        ],
        base: [
          'clamp(0.875rem, 0.219vw + 0.8rem, 1rem)',
          {
            lineHeight: 'clamp(1.25rem, 0.219vw + 1.1rem, 1.5rem)'
          }
        ],
        lg: [
          'clamp(1rem, 0.219vw + 0.925rem, 1.125rem)',
          {
            lineHeight: 'clamp(1.5rem, 0.219vw + 1.35rem, 1.75rem)'
          }
        ],
        xl: [
          'clamp(1.125rem, 0.219vw + 1.05rem, 1.25rem)',
          {
            lineHeight: '1.75rem'
          }
        ],
        '2xl': [
          'clamp(1.25rem, 0.438vw + 1.1rem, 1.5rem)',
          {
            lineHeight: 'clamp(1.75rem, 0.438vw + 1.6rem, 2rem)'
          }
        ],
        '3xl': [
          'clamp(1.5rem, 0.656vw + 1.275rem, 1.875rem)',
          {
            lineHeight: 'clamp(2rem, 0.656vw + 1.85rem, 2.25rem)'
          }
        ],
        '4xl': [
          'clamp(1.875rem, 0.656vw + 1.65rem, 2.25rem)',
          {
            lineHeight: 'clamp(2.25rem, 0.656vw + 2.1rem, 2.5rem)'
          }
        ],
        '5xl': [
          'clamp(2.25rem, 1.313vw + 1.8rem, 3rem)',
          {
            lineHeight: 'clamp(2.5rem, 1.313vw + 4.6rem, 1)'
          }
        ],
        '6xl': ['clamp(3rem, 1.313vw + 2.55rem, 3.75rem)', {
          lineHeight: '1'
        }],
        '7xl': ['clamp(3.75rem, 1.75vw + 3.15rem, 4.75rem)', {
          lineHeight: '1'
        }],
        '8xl': ['clamp(4.75rem, 2.188vw + 4rem, 6rem)', {
          lineHeight: '1'
        }],
        '9xl': ['clamp(6rem, 3.5vw + 4.8rem, 8rem)', {
          lineHeight: '1'
        }]
      },

      colors: {
        white: "#FFFFFF",
        transparent: "transparent",
        white_transparent: "rgba(255, 255, 255, 0.5)",
        alert: {
          danger_lt: "#ff4444",
          warning_lt: "#ffbb33",
          success_lt: "#00C851",
          info_lt: "#33b5e5",
          // dark mode colors
          danger_dark: "#CC0000",
          warning_dark: "#FF8800",
          success_dark: "#007E33",
          info_dark: "#0099CC",
        },
        bg: {
          sel_lt: "#1A74E4",
          pry_lt: "#F1F2F5",
          sec_lt: "#FFFFFF",
          input_lt: "#f1f2f5",
          pry_hvr_lt: "#E4E5E8",
          sec_hvr_lt: "#F2F2F2",
          // dark mode colors
          sel_dark: "#2374E1",
          pry_dark: "#18191a",
          sec_dark: "#242526",
          input_dark: "#3A3B3C",
          pry_hvr_dark: "#2f3031",
          sec_hvr_dark: "#4E4F50",
        },
        text: {
          inactive_lt: "#65676b",
          active_lt: "#1876f2",
          title_lt: "#1c1e21",
          text_lt: "#050505",
          other_lt: "#65676b",
          tag_lt: "#1876f2",
          label_lt: "#1877F2",
          // dark mode colors
          inactive_dark: "#b0b3b8",
          active_dark: "#2374e1",
          title_dark: "#e4e6eb",
          text_dark: "#e4e6eb",
          other_dark: "#b0b3b8",
          tag_dark: "#2e89ff",
          label_dark: "#2D88FF",
        },
        btn: {
          bg_lt: "#E7F3FF",
          hvr_lt: "#1A6ED7",
          disable_lt: "#E4E6EB",
          cancel_lt: "#D9DADF",
          cancel_hvr_lt: "#BEC3C9",
          // dark mode colors
          bg_dark: 'rgba(45, 136, 255, 0.2)',
          hvr_dark: "#3A82E4",
          disable_dark: "#4F5051",
          cancel_dark: "#4B4C4F",
        },
      },
    },
  },
  plugins: [],
};