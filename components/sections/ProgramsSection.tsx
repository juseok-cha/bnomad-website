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
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'
import Link from 'next/link'

interface ProgramsSectionProps {
  lang: 'en' | 'ko'
  dict: any
}

const programsData = [
  {
    key: 'spainRoadtrip',
    slug: 'spain-roadtrip',
    color: 'brand',
  },
  {
    key: 'labTour',
    slug: 'lab-tour',
    color: 'purple',
  },
  {
    key: 'jejuHouse',
    slug: 'jeju-house',
    color: 'green',
  },
  {
    key: 'popupCollabs',
    slug: 'popup-collaborations',
    color: 'orange',
  },
]

export default function ProgramsSection({ lang, dict }: ProgramsSectionProps) {
  return (
    <Box py={20}>
      <Container maxW={'container.xl'}>
        <Stack spacing={12}>
          <Stack spacing={4} align={'center'} textAlign={'center'}>
            <Heading
              fontWeight={700}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            >
              {dict.programs.title}
            </Heading>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {programsData.map((program) => {
              const programData = dict.programs[program.key]
              return (
                <Card
                  key={program.key}
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'lg'}
                  rounded={'xl'}
                  overflow={'hidden'}
                  transition={'all 0.3s'}
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '2xl',
                  }}
                >
                  <Box
                    h={'200px'}
                    bg={`${program.color}.100`}
                    position={'relative'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Box
                      bg={`linear-gradient(135deg, ${program.color}.400 0%, ${program.color}.600 100%)`}
                      opacity={0.3}
                      position={'absolute'}
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                    />
                    <Text
                      fontSize={'4xl'}
                      fontWeight={'bold'}
                      color={`${program.color}.600`}
                      zIndex={1}
                      opacity={0.5}
                    >
                      {programData.title.split(' ')[0]}
                    </Text>
                  </Box>
                  <CardBody>
                    <Stack spacing={3}>
                      <Heading size={'md'} color={`${program.color}.600`}>
                        {programData.title}
                      </Heading>
                      <Text fontSize={'sm'} color={'gray.600'}>
                        {programData.description}
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <Link href={`/${lang}/programs/${program.slug}`}>
                      <Button
                        variant={'outline'}
                        colorScheme={program.color}
                        size={'sm'}
                      >
                        {programData.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </SimpleGrid>
          <Box textAlign={'center'}>
            <Link href={`/${lang}/programs`}>
              <Button
                size={'lg'}
                fontWeight={'normal'}
                px={8}
                colorScheme={'brand'}
                variant={'solid'}
              >
                {dict.programs.viewAll}
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
