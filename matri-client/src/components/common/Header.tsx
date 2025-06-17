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

/**
 * `Header` is the top navigation bar of the application.
 *
 * @component
 * @returns {JSX.Element} Header component
 */
export default function Header(): JSX.Element {
  const router = useRouter()
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
              as={Button}
              variant="ghost"
              colorScheme="teal"
              leftIcon={<Icon as={HelpCircle} />}
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
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={LogIn} />}
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
