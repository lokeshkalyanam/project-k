/**
 * @file postcss.config.js
 * @description Configuration for PostCSS with Tailwind CSS and Autoprefixer plugins.
 */

/**
 * @type {import('postcss').ProcessOptions}
 * PostCSS plugin configuration
 */
module.exports = {
  plugins: {
    /**
     * @name tailwindcss
     * @description Tailwind CSS plugin for processing utility-first styles.
     */
    tailwindcss: {},

    /**
     * @name autoprefixer
     * @description Adds vendor prefixes to CSS for cross-browser compatibility.
     */
    autoprefixer: {},
  },
}
