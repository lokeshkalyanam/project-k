'use client'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

/**
 * CallToAction component renders a visually engaging section prompting users
 * to register or log in to the matrimony platform.
 *
 * - Uses Chakra UI for styling and layout.
 * - Includes a prominent heading, description text, and two actionable buttons:
 *   - "Create Profile" navigates to `/register`
 *   - "Already Registered?" navigates to `/login`
 *
 * The layout is responsive and optimized for both mobile and desktop views.
 *
 * @returns {JSX.Element} A styled CTA (Call To Action) section encouraging user engagement.
 */
export default function CallToAction(): JSX.Element {
  const router = useRouter()

  return (
    <Box
      bg="pink.50"
      rounded="2xl"
      p={10}
      textAlign="center"
      mt={20}
      boxShadow="md"
    >
      <Heading fontSize={{ base: '2xl', md: '3xl' }}>
        Ready to find your life partner?
      </Heading>
      <Text mt={4} fontSize="lg" color="gray.600">
        Sign up now and start your journey with verified profiles.
      </Text>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        mt={6}
        justify="center"
      >
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push('/register')}
        >
          Create Profile
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push('/login')}
        >
          Already Registered?
        </Button>
      </Stack>
    </Box>
  )
}
