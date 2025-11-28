'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Divider,
} from "@chakra-ui/react"
import Link from "next/link"
import { DownloadIcon } from "@chakra-ui/icons"
import { useParams } from 'next/navigation'

export default function Home() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const locale = lang === 'ko' ? 'ko' : 'en'

  return (
    <Box bg="black" minH="100vh">
      {/* Hero Section with Brochure CTA */}
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
        <VStack
          minH="90vh"
          justify="center"
          align="flex-start"
          spacing={8}
          py={20}
        >
          <Box>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
              mb={4}
            >
              {locale === 'en' ? 'Venture Studio' : '벤처 스튜디오'}
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="800"
              lineHeight="1.1"
              color="white"
              maxW="1000px"
              mb={6}
            >
              {locale === 'en' ? (
                <>
                  Glocal Innovation
                  <br />
                  with Soul &{" "}
                  <Text as="span" color="brand.500">
                    Authenticity
                  </Text>
                </>
              ) : (
                <>
                  영혼과{" "}
                  <Text as="span" color="brand.500">
                    진정성
                  </Text>
                  을 담은
                  <br />
                  글로컬 혁신
                </>
              )}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.400"
              maxW="700px"
              mb={8}
              lineHeight="1.8"
            >
              {locale === 'en'
                ? 'We bridge global innovation and local communities, creating meaningful ventures that honor both tradition and transformation.'
                : '글로벌 혁신과 로컬 커뮤니티를 연결하여 전통과 변화를 모두 존중하는 의미 있는 벤처를 만듭니다.'}
            </Text>
          </Box>

          <HStack spacing={4} flexWrap="wrap">
            <Button
              size="lg"
              bg="brand.500"
              color="white"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="600"
              leftIcon={<DownloadIcon />}
              _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              {locale === 'en' ? 'Download Brochure' : '브로슈어 다운로드'}
            </Button>
            <Link href={`/${locale}/projects`}>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{
                  bg: "brand.500",
                  color: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              >
                {locale === 'en' ? 'View Our Projects' : '프로젝트 보기'}
              </Button>
            </Link>
          </HStack>
        </VStack>

        {/* Introduction of BNomad */}
        <Box py={32} borderTop="1px" borderColor="dark.600">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">
            <VStack align="flex-start" spacing={6}>
              <Text
                fontSize="sm"
                color="brand.500"
                fontWeight="600"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                {locale === 'en' ? 'About BNomad' : 'BNomad 소개'}
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                {locale === 'en'
                  ? 'Building Bridges Between Global Innovation and Local Wisdom'
                  : '글로벌 혁신과 로컬 지혜를 잇는 다리'}
              </Heading>
            </VStack>

            <VStack align="flex-start" spacing={6}>
              <Text
                fontSize="lg"
                color="gray.400"
                lineHeight="1.8"
              >
                {locale === 'en'
                  ? 'BNomad is a venture studio dedicated to creating meaningful innovations that honor both global standards and local authenticity. We believe in the power of "glocal" thinking—combining the best of global perspectives with deep respect for local communities and traditions.'
                  : 'BNomad는 글로벌 기준과 로컬 진정성을 모두 존중하는 의미 있는 혁신을 만드는 벤처 스튜디오입니다. 우리는 글로벌 관점의 장점과 로컬 커뮤니티 및 전통에 대한 깊은 존중을 결합한 "글로컬" 사고의 힘을 믿습니다.'}
              </Text>
              <Text
                fontSize="lg"
                color="gray.400"
                lineHeight="1.8"
              >
                {locale === 'en'
                  ? 'We operate from Jeju Island, Korea—a unique intersection of tradition and innovation. Our work spans venture building, educational programs, and community development, all grounded in authentic relationships and meaningful impact.'
                  : '전통과 혁신이 교차하는 특별한 장소인 제주도에서 활동합니다. 벤처 빌딩, 교육 프로그램, 커뮤니티 개발을 아우르는 우리의 모든 작업은 진정한 관계와 의미 있는 영향력에 기반합니다.'}
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Future Vision as Venture Studio */}
        <Box py={32} borderTop="1px" borderColor="dark.600">
          <VStack spacing={12} maxW="900px" mx="auto" textAlign="center">
            <Box>
              <Text
                fontSize="sm"
                color="brand.500"
                fontWeight="600"
                letterSpacing="wide"
                textTransform="uppercase"
                mb={4}
              >
                {locale === 'en' ? 'Our Vision' : '우리의 비전'}
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
                mb={6}
              >
                {locale === 'en'
                  ? 'Building the Future of Glocal Entrepreneurship'
                  : '글로컬 기업가 정신의 미래를 건설합니다'}
              </Heading>
              <Text
                fontSize="lg"
                color="gray.400"
                lineHeight="1.8"
              >
                {locale === 'en'
                  ? 'As a venture studio, we envision a world where innovation serves communities, not just markets. We are creating a new model of venture building—one that values authenticity over scalability, relationships over transactions, and long-term impact over short-term gains.'
                  : '벤처 스튜디오로서 우리는 혁신이 시장뿐만 아니라 커뮤니티를 위해 봉사하는 세상을 상상합니다. 확장성보다 진정성을, 거래보다 관계를, 단기 이익보다 장기 임팩트를 중요시하는 새로운 벤처 빌딩 모델을 만들고 있습니다.'}
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} w="full" pt={8}>
              <VStack spacing={4}>
                <Box
                  w={16}
                  h={16}
                  bg="dark.800"
                  border="2px"
                  borderColor="brand.500"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="3xl">🌏</Text>
                </Box>
                <Heading as="h3" fontSize="xl" color="white">
                  {locale === 'en' ? 'Glocal Focus' : '글로컬 중심'}
                </Heading>
                <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                  {locale === 'en'
                    ? 'Bridging global innovation with local authenticity and wisdom'
                    : '글로벌 혁신과 로컬 진정성 및 지혜를 연결'}
                </Text>
              </VStack>

              <VStack spacing={4}>
                <Box
                  w={16}
                  h={16}
                  bg="dark.800"
                  border="2px"
                  borderColor="brand.500"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="3xl">🤝</Text>
                </Box>
                <Heading as="h3" fontSize="xl" color="white">
                  {locale === 'en' ? 'Community First' : '커뮤니티 우선'}
                </Heading>
                <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                  {locale === 'en'
                    ? 'Building ventures that strengthen communities and create lasting value'
                    : '커뮤니티를 강화하고 지속 가능한 가치를 창출하는 벤처'}
                </Text>
              </VStack>

              <VStack spacing={4}>
                <Box
                  w={16}
                  h={16}
                  bg="dark.800"
                  border="2px"
                  borderColor="brand.500"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="3xl">💡</Text>
                </Box>
                <Heading as="h3" fontSize="xl" color="white">
                  {locale === 'en' ? 'Authentic Impact' : '진정한 임팩트'}
                </Heading>
                <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                  {locale === 'en'
                    ? 'Measuring success by meaningful change, not just metrics'
                    : '단순 지표가 아닌 의미 있는 변화로 성공 측정'}
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Team Photos */}
        <Box py={32} borderTop="1px" borderColor="dark.600">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Text
                fontSize="sm"
                color="brand.500"
                fontWeight="600"
                letterSpacing="wide"
                textTransform="uppercase"
                mb={4}
              >
                {locale === 'en' ? 'Our Team' : '우리 팀'}
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                {locale === 'en' ? 'The People Behind BNomad' : 'BNomad를 만드는 사람들'}
              </Heading>
            </Box>

            {/* Team Photo Grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Box
                h="400px"
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
              >
                <Box
                  position="absolute"
                  inset={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.600" fontSize="sm">
                    {locale === 'en' ? 'Team Photo 1' : '팀 사진 1'}
                  </Text>
                </Box>
              </Box>
              <Box
                h="400px"
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
              >
                <Box
                  position="absolute"
                  inset={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.600" fontSize="sm">
                    {locale === 'en' ? 'Team Photo 2' : '팀 사진 2'}
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>

            <Link href={`/${locale}/team`}>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{
                  bg: "brand.500",
                  color: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              >
                {locale === 'en' ? 'Meet the Full Team →' : '팀 전체 만나기 →'}
              </Button>
            </Link>
          </VStack>
        </Box>

        {/* Team Mantra */}
        <Box py={32} borderTop="1px" borderColor="dark.600">
          <Box
            maxW="900px"
            mx="auto"
            textAlign="center"
            p={{ base: 8, md: 16 }}
            bg="dark.800"
            border="2px"
            borderColor="brand.500"
            borderRadius="2xl"
          >
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
              mb={8}
            >
              {locale === 'en' ? 'Our Mantra' : '우리의 만트라'}
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              color="white"
              lineHeight="1.5"
              mb={6}
            >
              {locale === 'en' ? (
                <>
                  "We don't just build ventures,
                  <br />
                  we <Text as="span" color="brand.500">cultivate ecosystems</Text> where
                  <br />
                  innovation and authenticity thrive together."
                </>
              ) : (
                <>
                  "우리는 단순히 벤처를 만드는 것이 아니라,
                  <br />
                  혁신과 진정성이 함께 번영하는{" "}
                  <Text as="span" color="brand.500">생태계를 가꿉니다</Text>."
                </>
              )}
            </Heading>
            <Divider my={8} borderColor="dark.600" />
            <Text fontSize="lg" color="gray.400" lineHeight="1.8">
              {locale === 'en'
                ? 'Every venture we build, every program we run, every connection we make is rooted in this belief: that the future of entrepreneurship is glocal, authentic, and deeply human.'
                : '우리가 만드는 모든 벤처, 운영하는 모든 프로그램, 만드는 모든 연결은 이 믿음에 뿌리를 두고 있습니다: 기업가 정신의 미래는 글로컬하고 진정하며 깊이 인간적입니다.'}
            </Text>
          </Box>
        </Box>

        {/* CTA Section */}
        <Box py={32} textAlign="center" borderTop="1px" borderColor="dark.600">
          <VStack spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              maxW="800px"
            >
              {locale === 'en' ? 'Ready to Create Impact Together?' : '함께 임팩트를 만들 준비가 되셨나요?'}
            </Heading>
            <Text
              fontSize="xl"
              color="gray.400"
              maxW="600px"
            >
              {locale === 'en'
                ? "Let's explore how we can collaborate to bring your vision to life."
                : '당신의 비전을 실현하기 위해 우리가 어떻게 협력할 수 있는지 함께 탐색해봅시다.'}
            </Text>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                px={12}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                {locale === 'en' ? 'Start a Conversation' : '대화 시작하기'}
              </Button>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
