import '@fontsource/poppins'
import '@fontsource/inter'
import './globals.css' // This file can include Tailwind CSS and any custom global styles
import { Providers } from './providers'

/**
 * Application-wide metadata used by Next.js for SEO and document settings.
 * @type {{ title: string, description: string }}
 */
export const metadata = {
  title: 'Matri - Find Your Match',
  description: 'A modern matrimonial platform',
}

/**
 * Root layout component that wraps the entire application with necessary providers and global HTML structure.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Nested child components rendered inside the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
