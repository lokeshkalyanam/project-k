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
import { motion } from 'framer-motion'
import { HeartPulse, UserPlus, LogIn } from 'lucide-react'

/**
 * Chakra UI + Framer Motion wrappers for animations.
 */
const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionButton = motion(Button)
const MotionIcon = motion(HeartPulse)

/**
 * `HeroSection` is the introductory section of the homepage.
 * It includes a bold headline, animated icon, call-to-action buttons,
 * and a hero illustration.
 *
 * - Responsive for mobile and desktop views.
 * - Includes animated content using Framer Motion.
 * - Background image with overlay text and vector image.
 *
 * @component
 * @returns {JSX.Element} Rendered Hero Section of the landing page.
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
            {/* Animated Icon + Heading */}
            <Flex align="center" gap={3}>
              <MotionIcon
                size={36}
                color="#D53F8C"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <MotionHeading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, pink.500, purple.500)"
                bgClip="text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Find Your Perfect Life Partner
              </MotionHeading>
            </Flex>

            {/* Subheading Text */}
            <MotionText
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Trusted, secure & personalized matrimony service tailored to your
              values and dreams.
            </MotionText>

            {/* Call-To-Action Buttons */}
            <Stack direction="row" spacing={4}>
              <MotionButton
                colorScheme="pink"
                size="lg"
                leftIcon={<UserPlus size={20} />}
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
              >
                Join Now
              </MotionButton>
              <MotionButton
                variant="outline"
                colorScheme="gray"
                size="lg"
                leftIcon={<LogIn size={20} />}
                whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              >
                Login
              </MotionButton>
            </Stack>
          </Stack>

          {/* Right Side Image Illustration */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            w={{ base: '100%', md: '50%' }}
          >
            <Image
              src="/images/hero-love.svg"
              alt="Matrimony illustration"
              w="100%"
              maxH="420px"
              objectFit="contain"
            />
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  )
}
