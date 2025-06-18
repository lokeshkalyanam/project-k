'use client'

import { useRouter } from 'next/navigation'
import { Button, VStack, Box, Text } from '@chakra-ui/react'

/**
 * List of supported languages with locale codes and display labels.
 * Used to dynamically render language selection buttons.
 */
const languages = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' },
]

/**
 * `LanguageSelector` renders a simple full-page UI to allow users
 * to select their preferred language/locale. On selection, it redirects
 * the user to the corresponding locale path (e.g., `/en`, `/te`, `/hi`).
 *
 * Chakra UI is used for layout and styling, and `useRouter` is used to
 * programmatically route based on the chosen language.
 *
 * @component
 * @returns {JSX.Element} A full-page vertical stack of language buttons.
 */
export default function LanguageSelector(): JSX.Element {
  const router = useRouter()

  return (
    <Box className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Select Your Language
        </Text>
        {languages.map(({ code, label }) => (
          <Button
            key={code}
            onClick={() => router.push(`/${code}`)}
            colorScheme="teal"
          >
            {label}
          </Button>
        ))}
      </VStack>
    </Box>
  )
}
