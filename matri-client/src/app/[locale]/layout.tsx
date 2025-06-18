// src/app/[locale]/layout.tsx

import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { NextIntlClientProvider } from 'next-intl'
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  params: { locale: string }
}

/**
 * Locale-specific layout for the application.
 *
 * This layout handles internationalization using `next-intl` and provides Chakra UI theming.
 * It validates the locale param, loads the appropriate translation messages, and wraps the children
 * with both ChakraProvider and NextIntlClientProvider.
 *
 * @component
 * @param {Object} props - Props object.
 * @param {ReactNode} props.children - Nested components to render under the locale layout.
 * @param {{ locale: string }} props.params - Dynamic route params, including the active locale.
 *
 * @returns {Promise<JSX.Element>} The rendered locale-specific layout.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await Promise.resolve(params)

  // If the locale is not supported, show the 404 page.
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Dynamically import the messages for the current locale.
  const messages = (await import(`@/messages/${locale}/common.json`)).default

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ChakraProvider>{children}</ChakraProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
