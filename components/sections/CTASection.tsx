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

interface CTASectionProps {
  lang: 'en' | 'ko'
  dict: any
}

export default function CTASection({ lang, dict }: CTASectionProps) {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} py={20}>
      <Container maxW={'container.xl'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            bg={'linear-gradient(135deg, rgba(33, 150, 243, 0.9) 0%, rgba(33, 150, 243, 0.7) 100%)'}
            rounded={'xl'}
            p={10}
            color={'white'}
            position={'relative'}
            overflow={'hidden'}
          >
            <Box position={'relative'} zIndex={1}>
              <Stack spacing={6}>
                <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                  {dict.cta.join.title}
                </Heading>
                <Text fontSize={'lg'} opacity={0.9}>
                  {dict.cta.join.description}
                </Text>
                <Box>
                  <Link href={`/${lang}/contact`}>
                    <Button
                      size={'lg'}
                      bg={'white'}
                      color={'brand.600'}
                      _hover={{
                        bg: 'gray.100',
                        transform: 'translateY(-2px)',
                      }}
                      transition={'all 0.3s'}
                    >
                      {dict.cta.join.button}
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Box>
            <Box
              position={'absolute'}
              top={'-50px'}
              right={'-50px'}
              width={'200px'}
              height={'200px'}
              borderRadius={'full'}
              bg={'white'}
              opacity={0.1}
            />
          </Box>

          <Box
            bg={'linear-gradient(135deg, rgba(255, 152, 0, 0.9) 0%, rgba(255, 152, 0, 0.7) 100%)'}
            rounded={'xl'}
            p={10}
            color={'white'}
            position={'relative'}
            overflow={'hidden'}
          >
            <Box position={'relative'} zIndex={1}>
              <Stack spacing={6}>
                <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                  {dict.cta.partner.title}
                </Heading>
                <Text fontSize={'lg'} opacity={0.9}>
                  {dict.cta.partner.description}
                </Text>
                <Box>
                  <Link href={`/${lang}/contact`}>
                    <Button
                      size={'lg'}
                      bg={'white'}
                      color={'accent.600'}
                      _hover={{
                        bg: 'gray.100',
                        transform: 'translateY(-2px)',
                      }}
                      transition={'all 0.3s'}
                    >
                      {dict.cta.partner.button}
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Box>
            <Box
              position={'absolute'}
              bottom={'-50px'}
              left={'-50px'}
              width={'200px'}
              height={'200px'}
              borderRadius={'full'}
              bg={'white'}
              opacity={0.1}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
