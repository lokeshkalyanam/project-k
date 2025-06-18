// next.config.ts

import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Creates the Next.js configuration enhanced with `next-intl` support.
 *
 * No options are passed to `createNextIntlPlugin()` because it auto-detects
 * the necessary configuration (e.g., request config location) by convention.
 * 
 * For `next-intl@4`, the default paths it looks for are:
 * - `./i18n.ts`, or
 * - `./src/i18n.ts`
 * 
 * If you're using a custom path, pass it like:
 * ```ts
 * createNextIntlPlugin('./src/i18n/config.ts');
 * ```
 */
const withNextIntl = createNextIntlPlugin(); // ✅ Uses default config detection

/**
 * Final Next.js configuration object wrapped with `next-intl` plugin.
 *
 * This also enables React strict mode for catching potential issues.
 */
export default withNextIntl({
    reactStrictMode: true
});
