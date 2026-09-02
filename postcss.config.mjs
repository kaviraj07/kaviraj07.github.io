/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind v4 vendor-prefixes via Lightning CSS; autoprefixer is redundant.
    "@tailwindcss/postcss": {},
  },
};

export default config;
