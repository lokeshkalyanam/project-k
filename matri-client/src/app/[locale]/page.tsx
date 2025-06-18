'use client'

import { Box } from '@chakra-ui/react'
import Header from '@/components/common/Header'
import HeroSection from '@/components/common/HeroSection'
import FeatureCards from '@/components/common/FeatureCards'
import CallToAction from '@/components/common/CallToAction'
import Footer from '@/components/common/Footer'

/**
 * HomePage component for the root route (`/`) of the matrimony platform.
 *
 * This is the main landing page that includes:
 * - Header: Top navigation and branding
 * - HeroSection: Introduction banner or hero content
 * - FeatureCards: Key platform features
 * - CallToAction: Prompt for user registration or engagement
 * - Footer: Site-wide footer with links/contact info
 *
 * Chakra UI is used for layout and styling.
 *
 * @returns {JSX.Element} The landing page UI component wrapped in a styled Chakra `Box`.
 */
export default function HomePage(): JSX.Element {
  return (
    <Box
      as="main"
      className="min-h-screen w-full"
      bgGradient="linear(to-br, blue.50, pink.50)"
      px={{ base: 4, md: 8 }}
      pt={6}
    >
      <Header />
      <HeroSection />
      <FeatureCards />
      <CallToAction />
      <Footer />
    </Box>
  )
}
