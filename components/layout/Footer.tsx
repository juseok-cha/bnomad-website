'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  Heading,
  Divider,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'

interface FooterProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <Box
      bg="black"
      color="gray.400"
      mt={32}
      borderTop="1px"
      borderColor="dark.600"
    >
      <Container maxW="1400px" py={16} px={{ base: 4, md: 8, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
          {/* Brand Section */}
          <Stack align={'flex-start'} spacing={4}>
            <Heading as="h3" size="lg" color="white" fontWeight="bold">
              BNomad
            </Heading>
            <Text fontSize={'sm'} color="gray.500" maxW="300px">
              {dict.footer?.tagline || 'Venture Studio for Glocal Innovation with Soul and Authenticity'}
            </Text>
          </Stack>

          {/* Quick Links */}
          <Stack align={'flex-start'} spacing={4}>
            <Text fontWeight={'600'} fontSize={'md'} mb={2} color="white">
              {dict.footer?.quickLinks || 'Quick Links'}
            </Text>
            <Link href={`/${lang}/projects`}>
              <ChakraLink
                color="gray.400"
                _hover={{ color: 'brand.500' }}
                transition="color 0.2s"
              >
                {dict.nav?.projects || 'Projects'}
              </ChakraLink>
            </Link>
            <Link href={`/${lang}/team`}>
              <ChakraLink
                color="gray.400"
                _hover={{ color: 'brand.500' }}
                transition="color 0.2s"
              >
                {dict.nav?.team || 'Team & Partners'}
              </ChakraLink>
            </Link>
            <Link href={`/${lang}/contact`}>
              <ChakraLink
                color="gray.400"
                _hover={{ color: 'brand.500' }}
                transition="color 0.2s"
              >
                {dict.nav?.contact || 'Contact'}
              </ChakraLink>
            </Link>
          </Stack>

          {/* Connect Section */}
          <Stack align={'flex-start'} spacing={4}>
            <Text fontWeight={'600'} fontSize={'md'} mb={2} color="white">
              {dict.footer?.connect || 'Connect'}
            </Text>
            <ChakraLink
              href="https://instagram.com/bnomad.co"
              isExternal
              color="gray.400"
              _hover={{ color: 'brand.500' }}
              transition="color 0.2s"
            >
              Instagram
            </ChakraLink>
            <ChakraLink
              href="https://www.linkedin.com/company/bnomad-inc/?viewAsMember=true"
              isExternal
              color="gray.400"
              _hover={{ color: 'brand.500' }}
              transition="color 0.2s"
            >
              LinkedIn
            </ChakraLink>
            <ChakraLink
              href="mailto:info@bnomad.co"
              color="gray.400"
              _hover={{ color: 'brand.500' }}
              transition="color 0.2s"
            >
              Email
            </ChakraLink>
          </Stack>
        </SimpleGrid>

        <Divider my={8} borderColor="dark.600" />

        {/* Copyright */}
        <HStack justify="space-between" flexWrap="wrap" spacing={4}>
          <Text fontSize={'sm'} color="gray.600">
            {dict.footer?.copyright || '© 2024 BNomad. All rights reserved.'}
          </Text>
        </HStack>
      </Container>
    </Box>
  )
}
