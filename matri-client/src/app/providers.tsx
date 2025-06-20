'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { store } from '@/store'
import { Provider } from 'react-redux'

/**
 * Wraps the application in global providers such as Redux and Chakra UI.
 *
 * - `Provider` from react-redux makes the Redux store available to the app.
 * - `ChakraProvider` applies Chakra UI's theming and styling context globally.
 *
 * @component
 * @param {Object} props - Props for the Providers component.
 * @param {React.ReactNode} props.children - React children elements to be rendered within the providers.
 * @returns {JSX.Element} The application wrapped in Redux and Chakra UI providers.
 *
 */
export function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  )
}
