// src/app/[locale]/layout.tsx

import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { NextIntlClientProvider } from 'next-intl'
import { Providers } from '../providers'

type Props = {
  children: ReactNode
  params: { locale: string }
}

/**
 * Locale-specific layout for the application.
 *
 * This layout is responsible for:
 * - Validating the dynamic locale parameter from the URL.
 * - Dynamically loading multiple localized translation message files (e.g., common, home, profile).
 * - Wrapping the application in global providers including Chakra UI and NextIntl.
 *
 * It ensures that only supported locales are rendered and falls back to a 404 page
 * if the provided locale is not valid.
 *
 * @function LocaleLayout
 * @param {Props} props - Component props.
 * @param {ReactNode} props.children - Nested page or layout components under the locale route.
 * @param {{ locale: string }} props.params - Route parameters containing the current locale.
 *
 * @returns {Promise<JSX.Element>} The fully wrapped application layout with translations and theming.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await Promise.resolve(params)

  // If the locale is not supported, show the 404 page.
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Dynamically import and merge multiple translation namespaces
  // const namespaces = ['common', 'home', 'profile']
  const namespaces = ['common']

  const messages = Object.assign(
    {},
    ...(await Promise.all(
      namespaces.map(async (ns) => {
        const mod = await import(`@/messages/${locale}/${ns}.json`)
        return mod.default
      })
    ))
  )

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  )
}
