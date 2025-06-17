'use client'

import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HelpCircle, LogIn, Info, PhoneCall, MessageCircle } from 'lucide-react'

/**
 * Chakra UI + Framer Motion Flex wrapper for animated layout transitions.
 */
const MotionFlex = motion(Flex)
/**
 * Chakra UI + Framer Motion Button wrapper for animated interactions.
 */
const MotionButton = motion(Button)

/**
 * `Header` is the top navigation bar of the MatriLink application.
 * It includes the brand name, a tagline, help menu, and login button.
 *
 * - Responsive and sticky at the top.
 * - Uses Chakra UI for design and layout.
 * - Animated with Framer Motion for smooth entrance.
 * - Lucide icons used for modern visuals.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header(): JSX.Element {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800') // Dynamic background for light/dark mode
  const textColor = useColorModeValue('gray.600', 'gray.300') // Dynamic text color
  const shadow = useColorModeValue('sm', 'md') // Shadow depth based on theme

  return (
    <Box
      as="header"
      px={{ base: 4, md: 6 }}
      py={4}
      boxShadow={shadow}
      bg={bgColor}
      position="sticky"
      top="0"
      zIndex="50"
      w="100%"
    >
      <MotionFlex
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        gap={{ base: 2, md: 0 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Branding */}
        <VStack
          align="start"
          spacing={0}
          cursor="pointer"
          onClick={() => router.push('/')}
        >
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="extrabold"
            color="teal.600"
          >
            Kal
            <Text as="span" color="pink.400">
              yanam
            </Text>
          </Text>
          <Text fontSize="sm" color={textColor}>
            Modern Connections. Traditional Values.
          </Text>
        </VStack>

        <Spacer />

        {/* Action Buttons */}
        <Flex align="center" gap={2}>
          {/* Help Dropdown */}
          <Menu>
            <MenuButton
              as={MotionButton}
              variant="ghost"
              colorScheme="teal"
              leftIcon={<Icon as={HelpCircle} />}
              whileHover={{ scale: 1.05 }}
            >
              Help
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Info size={16} />}
                onClick={() => router.push('/about')}
              >
                About Us
              </MenuItem>
              <MenuItem
                icon={<PhoneCall size={16} />}
                onClick={() => router.push('/contact')}
              >
                Contact Support
              </MenuItem>
              <MenuItem
                icon={<MessageCircle size={16} />}
                onClick={() => router.push('/faq')}
              >
                FAQ
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Login Button */}
          <MotionButton
            colorScheme="teal"
            leftIcon={<Icon as={LogIn} />}
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05 }}
          >
            Login
          </MotionButton>
        </Flex>
      </MotionFlex>
    </Box>
  )
}
