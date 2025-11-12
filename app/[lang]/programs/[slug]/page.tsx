'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Divider,
  Icon,
} from '@chakra-ui/react'
import { CheckCircleIcon, CalendarIcon, InfoIcon } from '@chakra-ui/icons'
import programsContent from '@/lib/i18n/locales/programs.json'

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const slug = params?.slug as string
  const content = programsContent[lang]

  // Find the program by slug
  const programKey = Object.keys(content.programs).find(
    (key) => content.programs[key as keyof typeof content.programs].slug === slug
  )

  if (!programKey) {
    router.push(`/${lang}/programs`)
    return null
  }

  const program = content.programs[programKey as keyof typeof content.programs]

  const colorMap: Record<string, string> = {
    'spain-roadtrip': 'blue',
    'lab-tour': 'purple',
    'jeju-house': 'green',
    'popup-collaborations': 'orange',
  }

  const iconMap: Record<string, string> = {
    'spain-roadtrip': '🇪🇸',
    'lab-tour': '🔧',
    'jeju-house': '🏡',
    'popup-collaborations': '⚡',
  }

  const color = colorMap[slug] || 'brand'
  const icon = iconMap[slug] || '🌟'

  return (
    <>
      {/* Hero Section */}
      <Box bg={`${color}.50`} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Text fontSize="8xl">{icon}</Text>
            <Badge colorScheme={color} fontSize="md" px={3} py={1}>
              {program.duration}
            </Badge>
            <Heading size="2xl" color={`${color}.700`}>
              {program.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="semibold" color="gray.700">
              {program.tagline}
            </Text>
            <HStack spacing={4} pt={4}>
              <Link href={`/${lang}/contact?program=${slug}`}>
                <Button colorScheme={color} size="lg">
                  {lang === 'en' ? 'Apply Now' : '지금 신청하기'}
                </Button>
              </Link>
              <Link href={`/${lang}/contact`}>
                <Button variant="outline" colorScheme={color} size="lg">
                  {lang === 'en' ? 'Ask Questions' : '질문하기'}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Overview Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          <VStack align="start" spacing={6}>
            <Heading size="lg" color={`${color}.600`}>
              {lang === 'en' ? 'Overview' : '개요'}
            </Heading>
            <Text fontSize="lg" color="gray.700" lineHeight="tall">
              {program.description}
            </Text>

            <Card bg={useColorModeValue(`${color}.50`, 'gray.700')} width="full">
              <CardBody>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={CalendarIcon} color={`${color}.600`} />
                    <Text fontWeight="semibold">
                      {lang === 'en' ? 'Duration:' : '기간:'}
                    </Text>
                    <Text>{program.duration}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={InfoIcon} color={`${color}.600`} />
                    <Text fontWeight="semibold">
                      {lang === 'en' ? 'Location:' : '장소:'}
                    </Text>
                    <Text>{program.location}</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          <VStack align="start" spacing={6}>
            <Heading size="lg" color={`${color}.600`}>
              {lang === 'en' ? 'Program Highlights' : '프로그램 하이라이트'}
            </Heading>
            <List spacing={3}>
              {program.highlights.map((highlight, index) => (
                <ListItem key={index} display="flex" alignItems="start">
                  <ListIcon as={CheckCircleIcon} color={`${color}.500`} mt={1} />
                  <Text>{highlight}</Text>
                </ListItem>
              ))}
            </List>
          </VStack>
        </SimpleGrid>
      </Container>

      <Divider />

      {/* Who Should Join */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg" textAlign="center" color={`${color}.600`}>
            {lang === 'en' ? 'Who Should Join' : '참여 대상'}
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.700" maxW="4xl" mx="auto">
            {program.whoShouldJoin}
          </Text>
        </VStack>
      </Container>

      {/* What's Included */}
      <Box bg={useColorModeValue('gray.50', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading size="lg" textAlign="center" color={`${color}.600`}>
              {lang === 'en' ? "What's Included" : '포함 사항'}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {program.included.map((item, index) => (
                <Card key={index} bg={useColorModeValue('white', 'gray.700')}>
                  <CardBody>
                    <HStack align="start">
                      <CheckCircleIcon color={`${color}.500`} mt={1} />
                      <Text>{item}</Text>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Testimonial */}
      {program.testimonials && program.testimonials.length > 0 && (
        <Container maxW="container.xl" py={16}>
          <VStack spacing={8}>
            <Heading size="lg" color={`${color}.600`}>
              {lang === 'en' ? 'What Participants Say' : '참가자 후기'}
            </Heading>
            {program.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                maxW="4xl"
                bg={useColorModeValue(`${color}.50`, 'gray.700')}
                shadow="lg"
              >
                <CardBody>
                  <VStack spacing={4} align="start">
                    <Text fontSize="xl" fontStyle="italic" color="gray.700">
                      "{testimonial.quote}"
                    </Text>
                    <HStack>
                      <Text fontWeight="bold">{testimonial.author}</Text>
                      <Text color="gray.600">•</Text>
                      <Text color="gray.600">{testimonial.role}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Container>
      )}

      {/* Bottom CTA */}
      <Box bg={`${color}.600`} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Heading size="xl">
              {lang === 'en' ? 'Ready to Join?' : '참여할 준비가 되셨나요?'}
            </Heading>
            <Text fontSize="lg" maxW="2xl">
              {lang === 'en'
                ? 'Apply now or get in touch to learn more about this program.'
                : '지금 신청하거나 문의하여 이 프로그램에 대해 더 알아보세요.'}
            </Text>
            <HStack spacing={4}>
              <Link href={`/${lang}/contact?program=${slug}`}>
                <Button
                  size="lg"
                  bg="white"
                  color={`${color}.600`}
                  _hover={{ bg: 'gray.100' }}
                >
                  {lang === 'en' ? 'Apply Now' : '지금 신청하기'}
                </Button>
              </Link>
              <Link href={`/${lang}/programs`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  {lang === 'en' ? 'View All Programs' : '모든 프로그램 보기'}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
