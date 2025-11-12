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
  Button,
  useColorModeValue,
  HStack,
  Icon,
  Badge,
  Avatar,
  Divider,
} from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import teamContent from '@/lib/i18n/locales/team.json'

export default function TeamPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = teamContent[lang]

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

      {/* Values Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={10}>
          <Heading size="lg" color="brand.600">
            {content.values.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} width="full">
            {content.values.items.map((value, index) => (
              <Card
                key={index}
                bg={useColorModeValue('white', 'gray.800')}
                shadow="md"
                textAlign="center"
              >
                <CardBody>
                  <VStack spacing={3}>
                    <Heading size="md" color="brand.600">
                      {value.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {value.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      <Divider />

      {/* Team Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={10}>
          <VStack spacing={3} textAlign="center">
            <Heading size="xl" color="brand.600">
              {content.teamSection.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="3xl">
              {content.teamSection.description}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} width="full">
            {content.team.map((member, index) => (
              <Card
                key={index}
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
                  bg="gradient-to-br from-brand.400 to-brand.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Avatar
                    size="2xl"
                    name={member.name}
                    src={member.image}
                    border="4px solid white"
                  />
                </Box>
                <CardBody>
                  <VStack spacing={3} align="start">
                    <VStack spacing={1} align="start" width="full">
                      <Heading size="md" color="brand.700">
                        {member.name}
                      </Heading>
                      <Badge colorScheme="brand" fontSize="sm">
                        {member.role}
                      </Badge>
                    </VStack>

                    <Text fontSize="sm" color="gray.600" minH="60px">
                      {member.bio}
                    </Text>

                    <Divider />

                    <HStack spacing={3} width="full" justify="center">
                      {member.linkedin !== '#' && (
                        <Button
                          as="a"
                          href={member.linkedin}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          colorScheme="brand"
                          leftIcon={<ExternalLinkIcon />}
                        >
                          LinkedIn
                        </Button>
                      )}
                      <Button
                        as="a"
                        href={`mailto:${member.email}`}
                        size="sm"
                        variant="ghost"
                        colorScheme="brand"
                        leftIcon={<EmailIcon />}
                      >
                        {lang === 'en' ? 'Email' : '이메일'}
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Partners Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={10}>
            <VStack spacing={3} textAlign="center">
              <Heading size="xl" color="brand.600">
                {content.partnersSection.title}
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="3xl">
                {content.partnersSection.description}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="full">
              {content.partners.map((partner, index) => (
                <Card
                  key={index}
                  bg={useColorModeValue('white', 'gray.800')}
                  shadow="md"
                  rounded="xl"
                  overflow="hidden"
                >
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <HStack justify="space-between" width="full">
                        <VStack align="start" spacing={1}>
                          <Heading size="md" color="brand.700">
                            {partner.name}
                          </Heading>
                          <Badge colorScheme="purple">{partner.category}</Badge>
                        </VStack>
                        {partner.website !== '#' && (
                          <Button
                            as="a"
                            href={partner.website}
                            target="_blank"
                            size="sm"
                            variant="outline"
                            colorScheme="brand"
                            rightIcon={<ExternalLinkIcon />}
                          >
                            {lang === 'en' ? 'Visit' : '방문'}
                          </Button>
                        )}
                      </HStack>

                      <Text fontSize="sm" color="gray.600">
                        {partner.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Join CTA Section */}
      <Box bg="brand.600" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Heading size="xl">{content.joinSection.title}</Heading>
            <Text fontSize="lg" maxW="2xl">
              {content.joinSection.description}
            </Text>
            <HStack spacing={4}>
              <Link href={`/${lang}/contact?subject=partnership`}>
                <Button
                  size="lg"
                  bg="white"
                  color="brand.600"
                  _hover={{ bg: 'gray.100' }}
                >
                  {content.joinSection.buttons.partner}
                </Button>
              </Link>
              <Link href={`/${lang}/contact?subject=join-team`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  {content.joinSection.buttons.join}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
