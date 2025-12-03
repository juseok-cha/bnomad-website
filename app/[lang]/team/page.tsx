'use client'

import { useParams } from 'next/navigation'
import { isLocale } from '@/lib/i18n/localeUtils'
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
  Badge,
} from '@chakra-ui/react'
import teamContent from '@/lib/i18n/locales/team.json'

export default function TeamPage() {
  const params = useParams()
  const langParam = params?.lang as string
  const lang = isLocale(langParam) ? langParam : 'en'
  const content = teamContent[lang]

  return (
    <Box bg="black" minH="100vh" color="white">
      <Box
        bgImage={`linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${content.hero.coverImage})`}
        bgSize="cover"
        bgPosition="center"
        py={{ base: 24, md: 32 }}
        borderBottom="1px"
        borderColor="dark.600"
      >
        <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
          <VStack align="flex-start" spacing={6} maxW="820px">
            <Badge colorScheme="orange" bg="brand.500" color="black" px={3} py={1} borderRadius="full">
              {lang === 'en' ? 'Team & Partners' : '팀 & 파트너'}
            </Badge>
            <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.1">
              {content.hero.title}
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.200" lineHeight="1.8">
              {content.hero.subtitle}
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }} py={24}>
        {/* Team photo */}
        <Box
          mb={24}
          borderRadius="2xl"
          overflow="hidden"
          border="1px"
          borderColor="dark.600"
          bgImage={`linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${content.hero.teamPhoto})`}
          bgSize="cover"
          bgPosition="center"
          minH={{ base: '260px', md: '420px' }}
        />

        {/* Mantra */}
        <Box mb={24}>
          <HStack spacing={3} mb={4} flexWrap="wrap">
            <Badge colorScheme="orange" bg="dark.800" color="brand.500" px={3} py={1} borderRadius="full">
              {content.mantra.title}
            </Badge>
            <Text color="brand.500" fontWeight="700">
              {content.mantra.tagline}
            </Text>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {content.mantra.items.map((line: string, idx: number) => (
              <Box
                key={idx}
                p={5}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
              >
                <Text color="gray.200" lineHeight="1.6">
                  {line}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Values */}
        <Box mb={24}>
          <Heading as="h2" fontSize="3xl" mb={10}>
            {content.values.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {content.values.items.map((value, index) => (
              <Box
                key={index}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)' }}
                transition="all 0.2s"
              >
                <Heading as="h3" fontSize="lg" color="brand.500" mb={2}>
                  {value.title}
                </Heading>
                <Text color="gray.400" lineHeight="1.6">
                  {value.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* History */}
        <Box mb={24} borderTop="1px" borderColor="dark.600" pt={16}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            {content.history.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {content.history.milestones.map((item, idx) => (
              <Box
                key={idx}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
              >
                <Text color="brand.500" fontWeight="700" mb={2}>
                  {item.year}
                </Text>
                <Heading as="h3" fontSize="xl" mb={2}>
                  {item.title}
                </Heading>
                <Text color="gray.400" lineHeight="1.6">
                  {item.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
          <Text color="gray.500" mt={6}>
            {content.history.note}
          </Text>
        </Box>

        {/* Offices */}
        <Box mb={24} borderTop="1px" borderColor="dark.600" pt={16}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            {content.offices.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {content.offices.locations.map((office: any, idx: number) => (
              <Box
                key={idx}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
              >
                <Heading as="h3" fontSize="xl" mb={2}>
                  {office.name}
                </Heading>
                <Text color="gray.400">{office.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Core Team */}
        <Box mb={24} borderTop="1px" borderColor="dark.600" pt={16}>
          <Heading as="h2" fontSize="3xl" mb={4}>
            {lang === 'en' ? 'Core Team' : '핵심 팀'}
          </Heading>
          <Text color="gray.400" maxW="760px" mb={10}>
            {lang === 'en'
              ? 'A hands-on crew of builders, educators, and community shapers.'
              : '현장에서 함께 뛰는 빌더, 교육자, 커뮤니티 메이커들입니다.'}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {content.coreTeam.map((member, index) => (
              <Box
                key={index}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)' }}
                transition="all 0.2s"
              >
                <Heading as="h3" fontSize="lg" mb={1}>
                  {member.name}
                </Heading>
                <Text color="brand.500" fontWeight="700" mb={3}>
                  {member.role}
                </Text>
                <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                  {member.bio}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Partners */}
        <Box mb={24} borderTop="1px" borderColor="dark.600" pt={16}>
          <Heading as="h2" fontSize="3xl" mb={10}>
            {lang === 'en' ? 'Partners' : '파트너'}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <HStack mb={4} spacing={3}>
                <Badge colorScheme="orange" bg="dark.800" color="brand.500" px={3} py={1} borderRadius="full">
                  Global
                </Badge>
                <Text color="gray.400">
                  {lang === 'en' ? 'Allies who expand our reach.' : '글로벌 시야를 넓혀주는 동료들.'}
                </Text>
              </HStack>
              <VStack align="stretch" spacing={4}>
                {content.partners.global.map((partner, idx) => (
                  <Box key={idx} p={5} bg="dark.800" border="1px" borderColor="dark.600" borderRadius="lg">
                    <Text color="brand.500" fontWeight="700">
                      {partner.name}
                    </Text>
                    <Text color="gray.400" lineHeight="1.6">
                      {partner.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box>
              <HStack mb={4} spacing={3}>
                <Badge colorScheme="orange" bg="dark.800" color="brand.500" px={3} py={1} borderRadius="full">
                  Local
                </Badge>
                <Text color="gray.400">
                  {lang === 'en' ? 'Partners rooted where we build.' : '우리가 짓는 곳에 뿌리내린 파트너들.'}
                </Text>
              </HStack>
              <VStack align="stretch" spacing={4}>
                {content.partners.local.map((partner, idx) => (
                  <Box key={idx} p={5} bg="dark.800" border="1px" borderColor="dark.600" borderRadius="lg">
                    <Text color="brand.500" fontWeight="700">
                      {partner.name}
                    </Text>
                    <Text color="gray.400" lineHeight="1.6">
                      {partner.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>

        {/* CTA */}
        <Box
          py={16}
          px={{ base: 6, md: 12 }}
          bg="linear-gradient(120deg, rgba(249,63,5,0.12), rgba(249,63,5,0.05))"
          border="1px"
          borderColor="dark.600"
          borderRadius="2xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
              {content.cta.title}
            </Heading>
            <Text color="gray.300" maxW="760px" fontSize="lg">
              {content.cta.subtitle}
            </Text>
            <HStack spacing={4} justify="center">
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  bg="brand.500"
                  color="black"
                  px={10}
                  py={6}
                  fontWeight="700"
                  _hover={{ bg: 'brand.600', color: 'white', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  {content.cta.buttonPrimary}
                </Button>
              </Link>
              <Link href={`/${lang}/programs`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="brand.500"
                  color="brand.500"
                  px={10}
                  py={6}
                  fontWeight="700"
                  _hover={{ bg: 'brand.500', color: 'black', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  {content.cta.buttonSecondary}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
