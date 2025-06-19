import { ReactNode } from 'react'
import { cookies } from 'next/headers'

/**
 * Root layout component that sets up the HTML structure.
 *
 * - Determines the user's preferred locale from cookies (`locale` key).
 * - Defaults to 'en' if no cookie is found.
 * - Sets the `<html lang="...">` attribute accordingly.
 * - Renders global `<head>` tags and children content.
 *
 * @param {Object} props - Props object.
 * @param {ReactNode} props.children - The page or layout to render inside the body.
 * @returns {Promise<JSX.Element>} The root layout with language-aware HTML structure.
 */
const RootLayout = async ({
  children,
}: {
  children: ReactNode
}): Promise<JSX.Element> => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <title>Matrimony</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
