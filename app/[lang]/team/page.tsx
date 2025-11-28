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
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import teamContent from '@/lib/i18n/locales/team.json'

export default function TeamPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = teamContent[lang]

  return (
    <Box bg="black" minH="100vh" color="white">
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }} py={32}>
        {/* Hero Section */}
        <VStack spacing={6} align="flex-start" mb={20}>
          <Text
            fontSize="sm"
            color="brand.500"
            fontWeight="600"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {lang === 'en' ? 'Our Team' : '우리 팀'}
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
            maxW="900px"
          >
            {content.hero.title}
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.400" maxW="700px" lineHeight="1.8">
            {content.hero.subtitle}
          </Text>
        </VStack>

        {/* Values Section */}
        <Box mb={32}>
          <Heading as="h2" fontSize="3xl" color="white" mb={12}>
            {content.values.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {content.values.items.map((value, index) => (
              <Box
                key={index}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{
                  borderColor: 'brand.500',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s"
              >
                <VStack align="flex-start" spacing={3}>
                  <Heading as="h3" fontSize="lg" color="brand.500">
                    {value.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                    {value.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Team Section */}
        <Box mb={32} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Heading as="h2" fontSize="3xl" color="white">
              {content.teamSection.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="700px">
              {content.teamSection.description}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {content.team.map((member, index) => (
              <Box
                key={index}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{
                  borderColor: 'brand.500',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s"
              >
                <VStack align="center" spacing={4}>
                  <Avatar
                    size="xl"
                    name={member.name}
                    bg="brand.500"
                    color="white"
                  />
                  <VStack spacing={1} textAlign="center">
                    <Heading as="h3" fontSize="lg" color="white">
                      {member.name}
                    </Heading>
                    <Text fontSize="sm" color="brand.500" fontWeight="600">
                      {member.role}
                    </Text>
                  </VStack>
                  <Text fontSize="sm" color="gray.400" textAlign="center" lineHeight="1.6">
                    {member.bio}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Partners Section */}
        <Box mb={32} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Heading as="h2" fontSize="3xl" color="white">
              {content.partnersSection.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="700px">
              {content.partnersSection.description}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {content.partners.map((partner, index) => (
              <Box
                key={index}
                p={8}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{
                  borderColor: 'brand.500',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s"
              >
                <VStack align="flex-start" spacing={4}>
                  <Heading as="h3" fontSize="xl" color="white">
                    {partner.name}
                  </Heading>
                  <Text fontSize="sm" color="brand.500" fontWeight="600">
                    {partner.category}
                  </Text>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                    {partner.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* CTA Section */}
        <Box py={32} textAlign="center" borderTop="1px" borderColor="dark.600">
          <VStack spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="white"
              maxW="700px"
            >
              {content.joinSection.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="600px">
              {content.joinSection.description}
            </Text>
            <HStack spacing={4}>
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  bg="brand.500"
                  color="white"
                  px={12}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  {content.joinSection.buttons.join}
                </Button>
              </Link>
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="brand.500"
                  color="brand.500"
                  px={12}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  _hover={{
                    bg: 'brand.500',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                  leftIcon={<EmailIcon />}
                >
                  {content.joinSection.buttons.partner}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
