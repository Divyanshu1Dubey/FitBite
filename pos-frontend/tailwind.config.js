/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "primary-container": "#c3f400",
          "tertiary-container": "#e5e2e1",
          "on-secondary-fixed": "#1a1c1c",
          "on-secondary": "#2f3131",
          "inverse-surface": "#e2e2e2",
          "tertiary-fixed-dim": "#c8c6c5",
          "on-background": "#e2e2e2",
          "primary": "#ffffff",
          "surface-tint": "#abd600",
          "on-tertiary": "#313030",
          "outline": "#8e9379",
          "on-tertiary-container": "#656464",
          "on-primary": "#283500",
          "inverse-primary": "#506600",
          "primary-fixed": "#c3f400",
          "surface": "#131313",
          "surface-dim": "#131313",
          "secondary-container": "#454747",
          "surface-container": "#1f1f1f",
          "on-error-container": "#ffdad6",
          "on-primary-container": "#556d00",
          "surface-bright": "#393939",
          "secondary-fixed-dim": "#c6c6c7",
          "tertiary": "#ffffff",
          "surface-container-low": "#1b1b1b",
          "secondary-fixed": "#e2e2e2",
          "on-tertiary-fixed": "#1c1b1b",
          "on-surface": "#e2e2e2",
          "primary-fixed-dim": "#abd600",
          "outline-variant": "#444933",
          "on-primary-fixed-variant": "#3c4d00",
          "background": "#131313",
          "on-error": "#690005",
          "inverse-on-surface": "#303030",
          "error-container": "#93000a",
          "tertiary-fixed": "#e5e2e1",
          "error": "#ffb4ab",
          "on-tertiary-fixed-variant": "#474746",
          "surface-container-high": "#2a2a2a",
          "secondary": "#c6c6c7",
          "on-primary-fixed": "#161e00",
          "surface-container-highest": "#353535",
          "surface-variant": "#353535",
          "on-secondary-fixed-variant": "#454747",
          "on-surface-variant": "#c4c9ac",
          "on-secondary-container": "#b4b5b5",
          "surface-container-lowest": "#0e0e0e"
      },
      "borderRadius": {
          "DEFAULT": "0.125rem",
          "lg": "0.25rem",
          "xl": "0.5rem",
          "full": "0.75rem"
      },
      "spacing": {
          "base": "8px",
          "gutter": "24px",
          "margin-mobile": "16px",
          "margin-desktop": "64px",
          "container-max-width": "1280px"
      },
      "fontFamily": {
          "label-md": ["JetBrains Mono"],
          "price-tag": ["Anybody"],
          "body-md": ["Hanken Grotesk"],
          "display-xl": ["Anybody"],
          "headline-md": ["Anybody"],
          "body-lg": ["Hanken Grotesk"],
          "headline-lg": ["Anybody"],
          "headline-lg-mobile": ["Anybody"]
      },
      "fontSize": {
          "label-md": ["14px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500" }],
          "price-tag": ["20px", { "lineHeight": "1.0", "fontWeight": "900" }],
          "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
          "display-xl": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "900" }],
          "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "700" }],
          "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
          "headline-lg": ["40px", { "lineHeight": "1.2", "fontWeight": "800" }],
          "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "800" }]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
