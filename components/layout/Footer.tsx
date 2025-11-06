'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react'
import Link from 'next/link'

interface FooterProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={20}
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <Heading as="h3" size="md" color="brand.600" mb={2}>
              BNomad
            </Heading>
            <Text fontSize={'sm'}>{dict.footer.tagline}</Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              {dict.footer.quickLinks}
            </Text>
            <Link href={`/${lang}/about`}>
              <ChakraLink>{dict.nav.about}</ChakraLink>
            </Link>
            <Link href={`/${lang}/programs`}>
              <ChakraLink>{dict.nav.programs}</ChakraLink>
            </Link>
            <Link href={`/${lang}/projects`}>
              <ChakraLink>{dict.nav.projects}</ChakraLink>
            </Link>
            <Link href={`/${lang}/blog`}>
              <ChakraLink>{dict.nav.blog}</ChakraLink>
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              {dict.footer.connect}
            </Text>
            <ChakraLink href="https://instagram.com/bnomad" isExternal>
              Instagram
            </ChakraLink>
            <ChakraLink href="https://linkedin.com/company/bnomad" isExternal>
              LinkedIn
            </ChakraLink>
            <ChakraLink href="mailto:hello@bnomad.io">Email</ChakraLink>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              {dict.nav.jejuHouse}
            </Text>
            <Link href={`/${lang}/jeju-house`}>
              <ChakraLink>{dict.nav.jejuHouse}</ChakraLink>
            </Link>
            <Link href={`/${lang}/team`}>
              <ChakraLink>{dict.nav.team}</ChakraLink>
            </Link>
            <Link href={`/${lang}/contact`}>
              <ChakraLink>{dict.nav.contact}</ChakraLink>
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text fontSize={'sm'}>{dict.footer.copyright}</Text>
        </Container>
      </Box>
    </Box>
  )
}
