'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  useColorModeValue,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { CalendarIcon, Icon as ChakraIcon } from '@chakra-ui/icons'
import programsContent from '@/lib/i18n/locales/programs.json'

export default function ProgramsPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = programsContent[lang]

  const programsList = [
    {
      ...content.programs.spainRoadtrip,
      color: 'blue',
      icon: '🇪🇸',
    },
    {
      ...content.programs.labTour,
      color: 'purple',
      icon: '🔧',
    },
    {
      ...content.programs.jejuHouse,
      color: 'green',
      icon: '🏡',
    },
    {
      ...content.programs.popupCollabs,
      color: 'orange',
      icon: '⚡',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Box bg="brand.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="brand.700">
              {content.hero.title}
            </Heading>
            <Text fontSize="xl" color="gray.700" maxW="3xl">
              {content.hero.subtitle}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Overview */}
      <Container maxW="container.xl" py={10}>
        <Text fontSize="lg" textAlign="center" color="gray.600" maxW="4xl" mx="auto">
          {content.overview.description}
        </Text>
      </Container>

      {/* Programs Grid */}
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {programsList.map((program) => (
            <Card
              key={program.slug}
              bg={useColorModeValue('white', 'gray.800')}
              shadow="lg"
              rounded="xl"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-8px)',
                shadow: '2xl',
              }}
            >
              <Box
                h="200px"
                bg={`${program.color}.100`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="6xl"
              >
                {program.icon}
              </Box>

              <CardHeader>
                <VStack align="start" spacing={2}>
                  <Badge colorScheme={program.color} fontSize="sm">
                    {program.duration}
                  </Badge>
                  <Heading size="lg" color={`${program.color}.600`}>
                    {program.title}
                  </Heading>
                  <Text fontWeight="semibold" color="gray.600">
                    {program.tagline}
                  </Text>
                </VStack>
              </CardHeader>

              <CardBody pt={0}>
                <VStack align="start" spacing={4}>
                  <Text color="gray.600" noOfLines={4}>
                    {program.overview}
                  </Text>

                  <HStack spacing={2}>
                    <Icon as={CalendarIcon} color={`${program.color}.500`} />
                    <Text fontSize="sm" color="gray.600">
                      {program.location}
                    </Text>
                  </HStack>

                  <Link href={`/${lang}/programs/${program.slug}`}>
                    <Button
                      colorScheme={program.color}
                      width="full"
                      size="lg"
                      mt={2}
                    >
                      {lang === 'en' ? 'Learn More' : '자세히 보기'}
                    </Button>
                  </Link>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box bg="brand.600" py={16} mt={10}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Heading size="xl">{content.cta.title}</Heading>
            <Text fontSize="lg" maxW="2xl">
              {content.cta.description}
            </Text>
            <HStack spacing={4}>
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  bg="white"
                  color="brand.600"
                  _hover={{ bg: 'gray.100' }}
                >
                  {content.cta.primaryButton}
                </Button>
              </Link>
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  {content.cta.secondaryButton}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
