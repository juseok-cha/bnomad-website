'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  Flex,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import {
  ViewIcon,
  EditIcon,
  EmailIcon,
  SettingsIcon,
  UnlockIcon,
  AtSignIcon,
  ChatIcon,
} from '@chakra-ui/icons'

interface AdminSidebarProps {
  lang: string
}

interface NavItem {
  icon: any
  label: string
  href: string
  badge?: number
}

export default function AdminSidebar({ lang }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const activeColor = useColorModeValue('brand.50', 'brand.900')
  const activeBorderColor = useColorModeValue('brand.500', 'brand.300')

  const navItems: NavItem[] = [
    {
      icon: ViewIcon,
      label: 'Dashboard',
      href: `/${lang}/admin/dashboard`,
    },
    {
      icon: EditIcon,
      label: 'Blog Posts',
      href: `/${lang}/admin/posts`,
    },
    {
      icon: ChatIcon,
      label: 'New Post',
      href: `/${lang}/admin/posts/new`,
    },
    {
      icon: EmailIcon,
      label: 'Contacts',
      href: `/${lang}/admin/contacts`,
    },
    {
      icon: AtSignIcon,
      label: 'Media',
      href: `/${lang}/admin/media`,
    },
    {
      icon: SettingsIcon,
      label: 'Settings',
      href: `/${lang}/admin/settings`,
    },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push(`/${lang}/admin/login`)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (href: string) => {
    if (href === `/${lang}/admin/dashboard`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="260px"
      bg={bgColor}
      borderRightWidth="1px"
      borderRightColor={borderColor}
      overflowY="auto"
    >
      <VStack spacing={0} align="stretch" h="full">
        {/* Header */}
        <Box p={6} borderBottomWidth="1px" borderBottomColor={borderColor}>
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            BNomad
          </Text>
          <Text fontSize="sm" color="gray.500">
            Admin Panel
          </Text>
        </Box>

        {/* User Info */}
        {user && (
          <Box p={4} borderBottomWidth="1px" borderBottomColor={borderColor}>
            <HStack spacing={3}>
              <Avatar size="sm" name={user.email || 'Admin'} />
              <Box flex={1} minW={0}>
                <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                  {user.displayName || 'Admin'}
                </Text>
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                  {user.email}
                </Text>
              </Box>
            </HStack>
          </Box>
        )}

        {/* Navigation Items */}
        <VStack spacing={1} align="stretch" p={3} flex={1}>
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Box
                key={item.href}
                as="button"
                onClick={() => router.push(item.href)}
                px={4}
                py={3}
                borderRadius="md"
                bg={active ? activeColor : 'transparent'}
                borderLeftWidth="3px"
                borderLeftColor={active ? activeBorderColor : 'transparent'}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: active ? activeColor : 'gray.50',
                }}
                textAlign="left"
              >
                <HStack spacing={3}>
                  <Icon
                    as={item.icon}
                    boxSize={5}
                    color={active ? 'brand.500' : 'gray.500'}
                  />
                  <Text
                    fontSize="sm"
                    fontWeight={active ? '600' : '500'}
                    color={active ? 'brand.600' : 'gray.700'}
                  >
                    {item.label}
                  </Text>
                  {item.badge && (
                    <Flex
                      ml="auto"
                      bg="red.500"
                      color="white"
                      fontSize="xs"
                      fontWeight="bold"
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      minW="20px"
                      h="20px"
                      align="center"
                      justify="center"
                    >
                      {item.badge}
                    </Flex>
                  )}
                </HStack>
              </Box>
            )
          })}
        </VStack>

        {/* Sign Out Button */}
        <Box p={4} borderTopWidth="1px" borderTopColor={borderColor}>
          <Button
            leftIcon={<Icon as={UnlockIcon} />}
            onClick={handleSignOut}
            width="full"
            variant="ghost"
            colorScheme="red"
            size="sm"
          >
            Sign Out
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
