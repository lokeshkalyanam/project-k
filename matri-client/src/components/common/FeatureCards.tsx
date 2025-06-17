'use client'

import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ShieldCheck, Filter, HeartHandshake } from 'lucide-react'

/**
 * List of core features to display in the FeatureCards section.
 * Each feature includes an icon, title, and description.
 */
const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description: 'We prioritize your privacy and data protection.',
  },
  {
    icon: Filter,
    title: 'Smart Filters',
    description: 'Quickly find matches that suit your preferences.',
  },
  {
    icon: HeartHandshake,
    title: 'Real Connections',
    description: 'Helping people build meaningful relationships.',
  },
]

/**
 * FeatureCards component showcases the platform's key benefits.
 *
 * - Uses Chakra UI for layout and styling.
 * - Responsive layout: single column on mobile, three columns on desktop.
 *
 * Each card includes:
 * - A Lucide icon in a rounded teal container
 * - A bold title
 * - A brief description
 *
 * @returns {JSX.Element} A section with feature cards.
 */
export default function FeatureCards(): JSX.Element {
  return (
    <Box as="section" py={20} px={{ base: 4, md: 8 }} bg="gray.50">
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={10}
        maxW="7xl"
        mx="auto"
      >
        {features.map((feature) => (
          <Box
            key={feature.title}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="md"
            p={6}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.03)' }}
          >
            <VStack spacing={4} align="start">
              <Flex
                w={14}
                h={14}
                align="center"
                justify="center"
                rounded="full"
                bg="teal.100"
              >
                <Icon as={feature.icon} boxSize={6} color="teal.600" />
              </Flex>
              <Text fontWeight="bold" fontSize="xl">
                {feature.title}
              </Text>
              <Text color="gray.600">{feature.description}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
