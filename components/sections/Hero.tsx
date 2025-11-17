'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'

interface HeroProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function Hero({ lang, dict }: HeroProps) {
  return (
    <Container maxW={'container.xl'} py={20}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 8 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              color={'brand.600'}
              _after={{
                content: "''",
                width: 'full',
                height: '20%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'accent.400',
                zIndex: -1,
                opacity: 0.3,
              }}
            >
              {dict.hero.tagline}
            </Text>
            <br />
            <Text as={'span'} color={'gray.600'} fontSize={{ base: 'xl', sm: '2xl', lg: '4xl' }}>
              {dict.hero.subtitle}
            </Text>
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'md', lg: 'lg' }} maxW={'2xl'}>
            {dict.hero.description}
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Link href={`/${lang}/programs`}>
              <Button
                size={'lg'}
                fontWeight={'bold'}
                px={6}
                colorScheme={'brand'}
                bg={'brand.500'}
                _hover={{ bg: 'brand.600' }}
              >
                {dict.hero.cta.explore}
              </Button>
            </Link>
            <Link href={`/${lang}/contact`}>
              <Button
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                variant={'outline'}
                colorScheme={'brand'}
              >
                {dict.hero.cta.partner}
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            height={'400px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
            bg={'gray.100'}
          >
            {/* Placeholder for hero image */}
            <Box
              position={'absolute'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              bg={'linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(255, 152, 0, 0.3) 100%)'}
            >
              <Text fontSize={'6xl'} fontWeight={'bold'} color={'white'} opacity={0.5}>
                BNomad
              </Text>
            </Box>
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
