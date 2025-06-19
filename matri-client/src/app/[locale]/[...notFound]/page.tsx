'use client'

import {
  Box,
  Text,
  Button,
  Heading,
  VStack,
  Image,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const MotionFlex = motion(Flex)

/**
 * Renders a fully localized 404 Not Found page with CTA and navigation options.
 *
 * @returns {JSX.Element}
 */
export default function NotFoundPage(): JSX.Element {
  const router = useRouter()
  const imageSize = useBreakpointValue({ base: '160px', md: '200px' })

  // Use localized messages from `common.notFound`
  const t = useTranslations('notFound')

  return (
    <MotionFlex
      as="main"
      direction="column"
      justify="center"
      align="center"
      h="100dvh"
      w="100vw"
      overflow="hidden"
      px={4}
      bgGradient="linear(to-br, pink.50, blue.50)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <VStack spacing={6} textAlign="center" maxW="lg" w="full" px={4} py={6}>
        <Image
          src="/images/404-error.svg"
          alt="Not found"
          boxSize={imageSize}
          objectFit="contain"
        />

        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '4xl' }}
          color="teal.600"
          whiteSpace="normal"
        >
          {t('title')}
        </Heading>

        <Text fontSize="md" color="gray.600" px={2}>
          {t('description')}
        </Text>

        <Box bg="white" p={6} rounded="2xl" shadow="md" w="full">
          <Text fontSize="lg" fontWeight="bold" mb={2} color="pink.500">
            {t('premiumHeading')}
          </Text>
          <Text fontSize="sm" mb={4} color="gray.700">
            {t('premiumDescription')}
          </Text>
          <Button
            colorScheme="pink"
            size="lg"
            w="full"
            onClick={() => router.push('/en/subscribe')}
          >
            {t('premiumCTA')}
          </Button>
        </Box>

        <Button
          variant="link"
          colorScheme="teal"
          mt={2}
          onClick={() => router.push('/')}
        >
          {t('homeButton')}
        </Button>
      </VStack>
    </MotionFlex>
  )
}
