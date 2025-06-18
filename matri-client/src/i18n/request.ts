import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n';

/**
 * Provides the internationalization configuration for each request.
 *
 * Determines the appropriate locale and loads the corresponding translation messages
 * from the `messages` directory. Falls back to the default locale if none is provided.
 *
 * Throws an error if the requested locale is not supported.
 *
 * @param {Object} context - The context object containing the requested locale.
 * @param {string | undefined} context.locale - The locale from the request (e.g., "en", "te").
 * @returns {Promise<{ locale: string, messages: Record<string, string> }>} 
 * An object with the locale and corresponding translation messages.
 */
export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale ?? defaultLocale;

    if (!locales.includes(currentLocale as (typeof locales)[number])) {
        throw new Error(`Unsupported locale: ${currentLocale}`);
    }

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}/common.json`)).default
    };
});
