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

  const navLinks: NavLink[] = [
    { name: dict.nav.about, href: `/${lang}/about` },
    { name: dict.nav.programs, href: `/${lang}/programs` },
    { name: dict.nav.projects, href: `/${lang}/projects` },
    { name: dict.nav.blog, href: `/${lang}/blog` },
    { name: dict.nav.team, href: `/${lang}/team` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ]

  const switchLang = lang === 'en' ? 'ko' : 'en'
  const currentPath = pathname.replace(`/${lang}`, '')

  return (
    <Box
      bg="white"
      px={4}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={() => setIsOpen(!isOpen)}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href={`/${lang}`}>
              <Box fontWeight="bold" fontSize="xl" color="brand.600">
                BNomad
              </Box>
            </Link>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    colorScheme={pathname === link.href ? 'brand' : 'gray'}
                    fontWeight={pathname === link.href ? 'semibold' : 'normal'}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link href={`/${switchLang}${currentPath || ''}`}>
              <Button variant="outline" size="sm" colorScheme="brand">
                {switchLang.toUpperCase()}
              </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    width="full"
                    justifyContent="flex-start"
                    colorScheme={pathname === link.href ? 'brand' : 'gray'}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}
