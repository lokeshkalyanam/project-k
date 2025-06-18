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
import { HelpCircle, LogIn, Info, PhoneCall, MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

/**
 * Renders the top navigation bar for the application.
 *
 * Includes:
 * - Branding with dynamic internationalized text
 * - Navigation buttons (Help dropdown and Login)
 * - Sticky positioning for consistent visibility
 *
 * Internationalization is handled using `next-intl`.
 *
 * @component
 * @returns {JSX.Element} Fully styled and localized Header
 */
export default function Header(): JSX.Element {
  const router = useRouter()
  const t = useTranslations('header')

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const shadow = useColorModeValue('sm', 'md')

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
      <Flex
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        gap={{ base: 2, md: 0 }}
      >
        {/**
         * Branding section with logo text and tagline.
         * Clickable to navigate to homepage (`/`).
         */}
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
            {t('brand.main')}
            <Text as="span" color="pink.400">
              {t('brand.highlight')}
            </Text>
          </Text>
          <Text fontSize="sm" color={textColor}>
            {t('brand.tagline')}
          </Text>
        </VStack>

        <Spacer />

        {/**
         * Action buttons: Help (dropdown) and Login
         */}
        <Flex align="center" gap={2}>
          {/**
           * Help menu dropdown with About, Contact, and FAQ links
           */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              colorScheme="teal"
              leftIcon={<Icon as={HelpCircle} />}
            >
              {t('help')}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Info size={16} />}
                onClick={() => router.push('/about')}
              >
                {t('helpItems.about')}
              </MenuItem>
              <MenuItem
                icon={<PhoneCall size={16} />}
                onClick={() => router.push('/contact')}
              >
                {t('helpItems.contact')}
              </MenuItem>
              <MenuItem
                icon={<MessageCircle size={16} />}
                onClick={() => router.push('/faq')}
              >
                {t('helpItems.faq')}
              </MenuItem>
            </MenuList>
          </Menu>

          {/**
           * Login button to redirect user to `/login`
           */}
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={LogIn} />}
            onClick={() => router.push('/login')}
          >
            {t('login')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
