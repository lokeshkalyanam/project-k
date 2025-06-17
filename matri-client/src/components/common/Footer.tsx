'use client'

import { Box, Flex, Text, Link } from '@chakra-ui/react'

/**
 * Footer component for the Matri platform.
 *
 * Features:
 * - Clean and responsive Chakra UI layout.
 * - Displays copyright and legal links.
 * - Accessible and mobile-friendly.
 *
 * @returns {JSX.Element} The static footer UI.
 */
export default function Footer(): JSX.Element {
  return (
    <Box
      as="footer"
      py={10}
      mt={10}
      borderTop="1px solid #eee"
      position="relative"
    >
      {/* 📜 Footer text and links */}
      <Flex
        justify="center"
        direction="column"
        align="center"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} Lokesh Matrimony. All rights reserved.
        </Text>

        <Flex mt={2} gap={6} wrap="wrap" justify="center">
          <Link
            href="/privacy"
            fontSize="sm"
            color="gray.500"
            _hover={{ color: 'teal.600', textDecoration: 'underline' }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            fontSize="sm"
            color="gray.500"
            _hover={{ color: 'teal.600', textDecoration: 'underline' }}
          >
            Terms
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
