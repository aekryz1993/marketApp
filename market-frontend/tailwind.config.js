/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "1px 1px 15px 1px rgba(0, 0, 0, 0.1), -1px -1px 15px 1px rgba(0, 0, 0, 0.1)",
        "4xl":
          "1px 1px 15px 1px rgba(0, 0, 0, 0.2), -1px -1px 15px 1px rgba(0, 0, 0, 0.2)",
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
          "clamp(0.625rem, 0.219vw + 0.55rem, 0.75rem)",
          {
            lineHeight: "clamp(0.75rem, 0.219vw + 0.6rem, 1rem)",
          },
        ],
        sm: [
          "clamp(0.75rem, 0.219vw + 0.675rem, 0.875rem)",
          {
            lineHeight: "clamp(1rem, 0.219vw + 0.85rem, 1.25rem)",
          },
        ],
        base: [
          "clamp(0.875rem, 0.219vw + 0.8rem, 1rem)",
          {
            lineHeight: "clamp(1.25rem, 0.219vw + 1.1rem, 1.5rem)",
          },
        ],
        lg: [
          "clamp(1rem, 0.219vw + 0.925rem, 1.125rem)",
          {
            lineHeight: "clamp(1.5rem, 0.219vw + 1.35rem, 1.75rem)",
          },
        ],
        xl: [
          "clamp(1.125rem, 0.219vw + 1.05rem, 1.25rem)",
          {
            lineHeight: "1.75rem",
          },
        ],
        "2xl": [
          "clamp(1.25rem, 0.438vw + 1.1rem, 1.5rem)",
          {
            lineHeight: "clamp(1.75rem, 0.438vw + 1.6rem, 2rem)",
          },
        ],
        "3xl": [
          "clamp(1.5rem, 0.656vw + 1.275rem, 1.875rem)",
          {
            lineHeight: "clamp(2rem, 0.656vw + 1.85rem, 2.25rem)",
          },
        ],
        "4xl": [
          "clamp(1.875rem, 0.656vw + 1.65rem, 2.25rem)",
          {
            lineHeight: "clamp(2.25rem, 0.656vw + 2.1rem, 2.5rem)",
          },
        ],
        "5xl": [
          "clamp(2.25rem, 1.313vw + 1.8rem, 3rem)",
          {
            lineHeight: "clamp(2.5rem, 1.313vw + 4.6rem, 1)",
          },
        ],
        "6xl": [
          "clamp(3rem, 1.313vw + 2.55rem, 3.75rem)",
          {
            lineHeight: "1",
          },
        ],
        "7xl": [
          "clamp(3.75rem, 1.75vw + 3.15rem, 4.75rem)",
          {
            lineHeight: "1",
          },
        ],
        "8xl": [
          "clamp(4.75rem, 2.188vw + 4rem, 6rem)",
          {
            lineHeight: "1",
          },
        ],
        "9xl": [
          "clamp(6rem, 3.5vw + 4.8rem, 8rem)",
          {
            lineHeight: "1",
          },
        ],
      },

      colors: {
        white: "#FFFFFF",
        transparent: "transparent",
        white_transparent: "rgba(255, 255, 255, 0.5)",
        hover: "rgba(0, 0, 0, 0.05)",
        alert: {
          light: {
            danger: "#ff4444",
            warning: "#ffbb33",
            success: "#00C851",
            info: "#33b5e5",
          },
          dark: {
            danger_dark: "#CC0000",
            warning_dark: "#FF8800",
            success_dark: "#007E33",
            info_dark: "#0099CC",
          },
        },
        bg: {
          light: {
            pry: "#F0F2F5",
            sec: "#FFFFFF",
            hover: colors.neutral["200"],
          },
          dark: {
            pry: "#18191A",
            sec: "#242526",
            hover: colors.neutral["700"],
          },
        },
        text: {
          light: {
            pry: "#050505",
            sec: "#65676B",
            disabled: "#BCC0C4",
            header_section: "#4B4C4F",
          },
          dark: {
            pry: "#E4E6EB",
            sec: "#B0B3B8",
            disabled: "rgba(255, 255, 255, 0.3)",
            header_section: "#",
          },
        },
        icon: {
          light: {
            pry: colors.neutral["200"],
            sec: "#65676B",
            disabled: "#BCC0C4",
            hover: colors.neutral["300"],
          },
          dark: {
            pry: colors.neutral["700"],
            sec: "#B0B3B8",
            disabled: "rgba(255, 255, 255, 0.3)",
            hover: colors.neutral["600"],
          },
        },
        input: {
          light: {
            pry: "#FFFFFF",
            sec: "#f1f2f5",
            placeholder: "#65676B",
            disabled: "#BCC0C4",
          },
          dark: {
            pry: "#242526",
            sec: "#3A3B3C",
            placeholder: "#8A8D91",
            disabled: "rgba(255, 255, 255, 0.3)",
          },
        },
        btn: {
          light: {
            pry: "#1B74E4",
            pry_text: "#FFFFFF",
            pry_hover: "#1B64EE",
            pry_press: "#77A7FF",
            sec: "#E4E6EB",
            sec_text: "#050505",
            sec_press: "rgba(0, 0, 0, 0.05)",
            pry_deemphasized: "rgba(100, 180, 255, 0.2)",
            pry_text_deemphasized: "#1877F2",
            pry_press_deemphasized: "rgba(70, 150, 220, 0.2)",
            disabled: "#E4E6EB",
            disabled_text: "#BCC0C4",
          },
          dark: {
            pry: "#2374E1",
            pry_text: "#FFFFFF",
            pry_hover: "#2364EE",
            pry_press: "#77A7FF",
            sec: "rgba(255, 255, 255, .1)",
            sec_text: "#E4E6EB",
            sec_press: "rgba(0, 0, 0, 0.05)",
            pry_deemphasized: "rgba(45, 136, 255, 0.2)",
            pry_text_deemphasized: "#2D88FF",
            pry_press_deemphasized: "rgba(100, 170, 255, 0.2)",
            disabled: "rgba(255, 255, 255, 0.2)",
            disabled_text: "rgba(255, 255, 255, 0.3)",
          },
        },
        border: {
          light: {
            pry: colors.neutral["200"],
          },
          dark: {
            pry: colors.neutral["700"],
          },
        },
      },
    },
  },
  plugins: [],
};
