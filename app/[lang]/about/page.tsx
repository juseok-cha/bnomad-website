'use client'

import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Stack,
  Divider,
} from '@chakra-ui/react'
import aboutContent from '@/lib/i18n/locales/about.json'

export default function AboutPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = aboutContent[lang]

  return (
    <>
      {/* Hero Section */}
      <Box bg="brand.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="brand.700">
              {content.hero.title}
            </Heading>
            <Text fontSize="xl" color="gray.700" maxW="2xl">
              {content.hero.subtitle}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={4} color="brand.600">
              {content.mission.title}
            </Heading>
            <Text fontSize="lg" color="gray.700" maxW="3xl" mx="auto">
              {content.mission.description}
            </Text>
          </Box>

          {/* Story Section */}
          <Box
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={10}
            rounded="xl"
            mt={8}
          >
            <Heading size="lg" mb={4} color="brand.600">
              {content.story.title}
            </Heading>
            <Text fontSize="lg" color="gray.700" lineHeight="tall">
              {content.story.content}
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* Values Section */}
      <Box bg={useColorModeValue('white', 'gray.900')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={10} align="stretch">
            <Heading size="xl" textAlign="center" color="brand.600">
              {content.values.title}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {content.values.items.map((value, index) => (
                <Card
                  key={index}
                  bg={useColorModeValue('white', 'gray.800')}
                  shadow="lg"
                  _hover={{ shadow: '2xl', transform: 'translateY(-4px)' }}
                  transition="all 0.3s"
                >
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <Heading size="md" color="brand.600">
                        {value.title}
                      </Heading>
                      <Text color="gray.600">{value.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={10} align="stretch">
          <Heading size="xl" textAlign="center" color="brand.600">
            {content.timeline.title}
          </Heading>

          <Stack spacing={8}>
            {content.timeline.events.map((event, index) => (
              <Box key={index} position="relative" pl={{ base: 8, md: 0 }}>
                <Box
                  position="absolute"
                  left={{ base: 0, md: '50%' }}
                  top="0"
                  w={{ base: '2px', md: '2px' }}
                  h="full"
                  bg="brand.300"
                  transform={{ base: 'none', md: 'translateX(-1px)' }}
                />

                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={8}
                  alignItems="center"
                >
                  <Box
                    textAlign={{ base: 'left', md: index % 2 === 0 ? 'right' : 'left' }}
                    order={{ base: 1, md: index % 2 === 0 ? 1 : 2 }}
                  >
                    <Box
                      display="inline-block"
                      bg="brand.600"
                      color="white"
                      px={6}
                      py={3}
                      rounded="full"
                      fontWeight="bold"
                      fontSize="xl"
                      mb={4}
                    >
                      {event.year}
                    </Box>
                  </Box>

                  <Card
                    bg={useColorModeValue('white', 'gray.800')}
                    shadow="lg"
                    order={{ base: 2, md: index % 2 === 0 ? 2 : 1 }}
                  >
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Heading size="md" color="brand.600">
                          {event.title}
                        </Heading>
                        <Text color="gray.600">{event.description}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>
            ))}
          </Stack>
        </VStack>
      </Container>

      {/* Approach Section */}
      <Box bg="brand.50" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl" color="brand.700">
              {content.approach.title}
            </Heading>
            <Text fontSize="lg" fontWeight="semibold" color="brand.600">
              {content.approach.subtitle}
            </Text>
            <Text fontSize="lg" color="gray.700" maxW="3xl">
              {content.approach.description}
            </Text>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
