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
  Divider,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import teamContent from '@/lib/i18n/locales/team.json'

export default function TeamPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = teamContent[lang]

  // Separate partners into Global and Local
  const globalPartners = content.partners.filter(p =>
    ['Mondragon University', '몬드라곤 대학교'].includes(p.name) ||
    p.category === 'Education' || p.category === '교육'
  )

  const localPartners = content.partners.filter(p =>
    !['Mondragon University', '몬드라곤 대학교'].includes(p.name) &&
    p.category !== 'Education' && p.category !== '교육'
  )

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
            {lang === 'en' ? 'Our Team & Partners' : '우리 팀 & 파트너'}
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

        {/* Team Photo Section */}
        <Box mb={32}>
          <VStack spacing={8}>
            <Box
              w="full"
              h={{ base: "400px", md: "600px" }}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
            >
              <Box
                position="absolute"
                inset={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={4}
              >
                <Text fontSize="5xl">📸</Text>
                <Text color="gray.600" fontSize="lg" fontWeight="600">
                  {lang === 'en' ? 'Team Photo' : '팀 사진'}
                </Text>
                <Text color="gray.700" fontSize="sm">
                  {lang === 'en' ? '(Photo placeholder)' : '(사진 자리)'}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Box>

        {/* Values Section */}
        <Box mb={32} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'What We Stand For' : '우리의 신념'}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="white">
              {content.values.title}
            </Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {content.values.items.map((value, index) => (
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
                  <Box
                    w={12}
                    h={12}
                    bg="brand.500"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">
                      {index === 0 && '✨'}
                      {index === 1 && '🤝'}
                      {index === 2 && '📚'}
                      {index === 3 && '🎯'}
                    </Text>
                  </Box>
                  <Heading as="h3" fontSize="xl" color="white">
                    {value.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                    {value.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* History Section */}
        <Box mb={32} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'Our Journey' : '우리의 여정'}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="white">
              {lang === 'en' ? 'History' : '히스토리'}
            </Heading>
          </VStack>

          <VStack spacing={8} align="stretch">
            {/* Timeline items */}
            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="brand.500"
              borderRadius="lg"
            >
              <HStack spacing={6} align="flex-start">
                <Box
                  minW={24}
                  px={4}
                  py={2}
                  bg="brand.500"
                  color="white"
                  borderRadius="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {lang === 'en' ? '2020' : '2020년'}
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" fontSize="xl" color="white">
                    {lang === 'en' ? 'Foundation' : '설립'}
                  </Heading>
                  <Text color="gray.400" lineHeight="1.7">
                    {lang === 'en'
                      ? 'BNomad was founded in Jeju Island with a vision to create a glocal venture studio that bridges global innovation with local communities.'
                      : 'BNomad는 글로벌 혁신과 로컬 커뮤니티를 연결하는 글로컬 벤처 스튜디오를 만들겠다는 비전으로 제주도에서 설립되었습니다.'}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="lg"
            >
              <HStack spacing={6} align="flex-start">
                <Box
                  minW={24}
                  px={4}
                  py={2}
                  bg="dark.700"
                  color="brand.500"
                  borderRadius="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {lang === 'en' ? '2021' : '2021년'}
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" fontSize="xl" color="white">
                    {lang === 'en' ? 'First Programs' : '첫 프로그램'}
                  </Heading>
                  <Text color="gray.400" lineHeight="1.7">
                    {lang === 'en'
                      ? 'Launched Lab Tours and began partnership with LEINN program, welcoming our first international cohort to Jeju.'
                      : 'Lab Tour를 시작하고 LEINN 프로그램과 파트너십을 맺으며 첫 국제 코호트를 제주로 맞이했습니다.'}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="lg"
            >
              <HStack spacing={6} align="flex-start">
                <Box
                  minW={24}
                  px={4}
                  py={2}
                  bg="dark.700"
                  color="brand.500"
                  borderRadius="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {lang === 'en' ? '2022' : '2022년'}
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" fontSize="xl" color="white">
                    {lang === 'en' ? 'Venture Building' : '벤처 빌딩'}
                  </Heading>
                  <Text color="gray.400" lineHeight="1.7">
                    {lang === 'en'
                      ? 'Started building our first ventures including OpenWaste and Politico, applying our glocal approach to real-world challenges.'
                      : 'OpenWaste와 Politico를 포함한 첫 벤처를 구축하기 시작하며 글로컬 접근법을 실제 문제에 적용했습니다.'}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="lg"
            >
              <HStack spacing={6} align="flex-start">
                <Box
                  minW={24}
                  px={4}
                  py={2}
                  bg="dark.700"
                  color="brand.500"
                  borderRadius="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {lang === 'en' ? '2024' : '2024년'}
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" fontSize="xl" color="white">
                    {lang === 'en' ? 'Growing Impact' : '임팩트 확대'}
                  </Heading>
                  <Text color="gray.400" lineHeight="1.7">
                    {lang === 'en'
                      ? 'Expanded our portfolio with new ventures and strengthened partnerships across Korea and globally, deepening our impact in local communities.'
                      : '새로운 벤처로 포트폴리오를 확장하고 한국과 전 세계의 파트너십을 강화하며 로컬 커뮤니티에서의 임팩트를 심화했습니다.'}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </Box>

        {/* Core Team Section */}
        <Box mb={32} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'The Team' : '팀'}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="white">
              {content.teamSection.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="700px" lineHeight="1.8">
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
                    size="2xl"
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

        {/* Partners Section - Global */}
        <Box mb={16} borderTop="1px" borderColor="dark.600" pt={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'Global Partners' : '글로벌 파트너'}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="white">
              {lang === 'en' ? 'International Collaboration' : '국제 협력'}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="700px" lineHeight="1.8">
              {lang === 'en'
                ? 'We partner with leading global institutions that share our vision for meaningful innovation.'
                : '의미 있는 혁신에 대한 비전을 공유하는 선도적인 글로벌 기관과 파트너십을 맺고 있습니다.'}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {globalPartners.map((partner, index) => (
              <Box
                key={index}
                p={8}
                bg="dark.800"
                border="1px"
                borderColor="brand.500"
                borderRadius="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s"
              >
                <VStack align="flex-start" spacing={4}>
                  <Box
                    w={12}
                    h={12}
                    bg="brand.500"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">🌍</Text>
                  </Box>
                  <Heading as="h3" fontSize="xl" color="white">
                    {partner.name}
                  </Heading>
                  <Text fontSize="sm" color="brand.500" fontWeight="600">
                    {partner.category}
                  </Text>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                    {partner.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Partners Section - Local */}
        <Box mb={32}>
          <VStack spacing={6} align="flex-start" mb={12}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'Local Partners' : '로컬 파트너'}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="white">
              {lang === 'en' ? 'Community Connections' : '커뮤니티 연결'}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="700px" lineHeight="1.8">
              {lang === 'en'
                ? 'Our local partners help us stay rooted in Korean communities and authentic local contexts.'
                : '로컬 파트너들은 우리가 한국 커뮤니티와 진정한 로컬 맥락에 뿌리내릴 수 있도록 돕습니다.'}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {localPartners.map((partner, index) => (
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
                  <Box
                    w={12}
                    h={12}
                    bg="dark.700"
                    border="2px"
                    borderColor="brand.500"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">🇰🇷</Text>
                  </Box>
                  <Heading as="h3" fontSize="xl" color="white">
                    {partner.name}
                  </Heading>
                  <Text fontSize="sm" color="brand.500" fontWeight="600">
                    {partner.category}
                  </Text>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.7">
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
            <Text fontSize="lg" color="gray.400" maxW="600px" lineHeight="1.8">
              {content.joinSection.description}
            </Text>
            <HStack spacing={4} flexWrap="wrap" justify="center">
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
