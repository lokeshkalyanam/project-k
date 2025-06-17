'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'

/**
 * Global Providers component that wraps the application with Chakra UI's `ChakraProvider`.
 *
 * This ensures Chakra's theming, context, and styling are available throughout the app.
 * Custom theme is imported from `@/theme`.
 *
 * @param {Object} props - Props passed to the Providers component.
 * @param {React.ReactNode} props.children - The nested React elements to render within the provider context.
 *
 * @returns {JSX.Element} The application wrapped in ChakraProvider with custom theme.
 */
export function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
