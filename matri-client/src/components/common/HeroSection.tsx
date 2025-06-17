'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HeartPulse, UserPlus, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'

const MotionIcon = motion(HeartPulse)
/**
 * `HeroSection` is the introductory section of the homepage.
 * It includes a bold headline, static icon, call-to-action buttons,
 * and a hero illustration.
 */
export default function HeroSection(): JSX.Element {
  return (
    <Box
      as="section"
      bgImage="url('/images/hero-bg.svg')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 16 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="7xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={10}
        >
          {/* Left Content: Title, Description, CTA Buttons */}
          <Stack spacing={6} maxW={{ md: 'lg' }} zIndex={1}>
            <Flex align="center" gap={3}>
              <MotionIcon
                size={75}
                color="#D53F8C"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, pink.500, purple.500)"
                bgClip="text"
              >
                Find Your Perfect Life Partner
              </Heading>
            </Flex>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Trusted, secure & personalized matrimony service tailored to your
              values and dreams.
            </Text>

            <Stack direction="row" spacing={4}>
              <Button
                colorScheme="pink"
                size="lg"
                leftIcon={<UserPlus size={20} />}
              >
                Join Now
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                leftIcon={<LogIn size={20} />}
              >
                Login
              </Button>
            </Stack>
          </Stack>

          {/* Right Side Image Illustration */}
          <Box w={{ base: '100%', md: '50%' }}>
            <Image
              src="/images/hero-love.svg"
              alt="Matrimony illustration"
              w="100%"
              maxH="420px"
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
