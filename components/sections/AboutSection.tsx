'use client'

import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react'
import Link from 'next/link'

interface AboutSectionProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function AboutSection({ lang, dict }: AboutSectionProps) {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} py={20}>
      <Container maxW={'container.xl'}>
        <Stack spacing={8} align={'center'} textAlign={'center'}>
          <Stack spacing={2}>
            <Text
              textTransform={'uppercase'}
              color={'brand.600'}
              fontWeight={600}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {dict.about.title}
            </Text>
            <Heading
              fontWeight={700}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              lineHeight={'110%'}
            >
              {dict.about.heading}
            </Heading>
          </Stack>
          <Text
            color={'gray.600'}
            fontSize={{ base: 'md', lg: 'lg' }}
            maxW={'3xl'}
          >
            {dict.about.description}
          </Text>
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            rounded={'xl'}
            shadow={'lg'}
            maxW={'3xl'}
          >
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={500}
              fontStyle={'italic'}
              color={'brand.700'}
            >
              {dict.about.mission}
            </Text>
          </Box>
          <Link href={`/${lang}/about`}>
            <Button
              size={'lg'}
              fontWeight={'normal'}
              px={8}
              colorScheme={'brand'}
              variant={'outline'}
            >
              {dict.about.cta}
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}
