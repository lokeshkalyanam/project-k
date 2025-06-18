// src/i18n/config.ts

/**
 * Supported locales for the application.
 *
 * These language codes should match the folder names in `/locales`.
 * They will be used to load the corresponding translations.
 *
 * @type {readonly string[]}
 */
export const locales = ['en', 'te', 'hi'] as const;

/**
 * Default locale to be used when no locale is specified in the URL.
 *
 * This should also exist in the `locales` array.
 *
 * @type {string}
 */
export const defaultLocale = 'en';
