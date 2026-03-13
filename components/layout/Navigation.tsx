'use client'

import React from 'react'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Container,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  name: string
  href: string
}

interface NavigationProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function Navigation({ lang, dict }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Only 4 pages: Home (implicit), Projects, Team, Contact
  const navLinks: NavLink[] = [
    { name: dict.nav.projects || 'Projects', href: `/${lang}/projects` },
    { name: dict.nav.team || 'Team & Partners', href: `/${lang}/team` },
    { name: dict.nav.contact || 'Contact', href: `/${lang}/contact` },
  ]

  const switchLang = lang === 'en' ? 'ko' : 'en'
  const currentPath = pathname.replace(`/${lang}`, '')

  return (
    <Box
      bg="rgba(0, 0, 0, 0.8)"
      px={{ base: 4, md: 8, lg: 12 }}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="dark.600"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
    >
      <Container maxW="1400px">
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={() => setIsOpen(!isOpen)}
            bg="transparent"
            color="white"
            _hover={{ bg: 'dark.700', color: 'brand.500' }}
          />

          {/* Logo */}
          <Link href={`/${lang}`}>
            <Text
              fontWeight="bold"
              fontSize={{ base: 'xl', md: '2xl' }}
              color="white"
              letterSpacing="tight"
              _hover={{ color: 'brand.500' }}
              transition="color 0.2s"
            >
              BNomad
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <HStack as={'nav'} spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color={pathname === link.href ? 'brand.500' : 'gray.300'}
                  _hover={{ color: 'brand.500' }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {link.name}
                </Text>
              </Link>
            ))}
          </HStack>

          {/* Language Switcher */}
          <Flex alignItems={'center'}>
            <Link href={`/${switchLang}${currentPath || ''}`}>
              <Button
                variant="outline"
                size="sm"
                borderColor="brand.500"
                color="brand.500"
                _hover={{ bg: 'brand.500', color: 'black' }}
                transition="all 0.2s"
              >
                {switchLang.toUpperCase()}
              </Button>
            </Link>
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        {isOpen && (
          <Box pb={6} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <Text
                    fontSize="lg"
                    fontWeight="medium"
                    color={pathname === link.href ? 'brand.500' : 'gray.300'}
                    _hover={{ color: 'brand.500' }}
                    py={2}
                  >
                    {link.name}
                  </Text>
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}
