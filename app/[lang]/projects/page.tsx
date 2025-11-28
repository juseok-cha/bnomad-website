'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Button,
  HStack,
  Divider,
} from '@chakra-ui/react'
import { ExternalLinkIcon, EmailIcon, DownloadIcon } from '@chakra-ui/icons'
import projectsContent from '@/lib/i18n/locales/projects.json'

export default function ProjectsPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = projectsContent[lang]

  const projectsList = [
    {
      key: 'teampreneur',
      ...content.projects.teampreneur,
      icon: '🌏',
    },
    {
      key: 'learningJourney',
      ...content.projects.learningJourney,
      icon: '✈️',
    },
    {
      key: 'openLab',
      ...content.projects.openLab,
      icon: '🧪',
    },
    {
      key: 'impactConsulting',
      ...content.projects.impactConsulting,
      icon: '🌱',
    },
    {
      key: 'asiaEuBridge',
      ...content.projects.asiaEuBridge,
      icon: '🌐',
    },
  ]

  return (
    <Box bg="black" minH="100vh" color="white">
      {/* Hero Section */}
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }} py={32}>
        <VStack spacing={6} align="flex-start" mb={20}>
          <Text
            fontSize="sm"
            color="brand.500"
            fontWeight="600"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {lang === 'en' ? 'Our Work' : '우리의 작업'}
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

        {/* Projects List View */}
        <VStack spacing={12} align="stretch">
          {projectsList.map((project, index) => (
            <Box key={project.key}>
              <Box
                p={{ base: 6, md: 10 }}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{
                  borderColor: 'brand.500',
                }}
                transition="all 0.3s"
              >
                {/* Project Header */}
                <HStack spacing={6} mb={6} flexWrap="wrap">
                  <Text fontSize="5xl">{project.icon}</Text>
                  <VStack align="flex-start" spacing={2} flex={1}>
                    <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} color="white">
                      {project.title}
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} color="brand.500" fontWeight="600">
                      {project.tagline}
                    </Text>
                    <HStack spacing={3} flexWrap="wrap">
                      <Badge
                        bg="brand.500"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="md"
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {project.category}
                      </Badge>
                      <Badge
                        bg="dark.700"
                        color="gray.400"
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                      >
                        {project.status}
                      </Badge>
                    </HStack>
                  </VStack>
                </HStack>

                <Divider borderColor="dark.600" my={6} />

                {/* Project Details Grid */}
                <VStack align="stretch" spacing={8}>
                  {/* Description */}
                  <Box>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" lineHeight="1.8">
                      {project.description}
                    </Text>
                  </Box>

                  {/* Challenge & Solution - Side by Side */}
                  <HStack align="flex-start" spacing={8} flexDirection={{ base: "column", md: "row" }}>
                    <Box flex={1}>
                      <Heading as="h4" fontSize="md" color="white" mb={3}>
                        {lang === 'en' ? '🎯 Challenge' : '🎯 도전 과제'}
                      </Heading>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                        {project.challenge}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      <Heading as="h4" fontSize="md" color="white" mb={3}>
                        {lang === 'en' ? '💡 Solution' : '💡 솔루션'}
                      </Heading>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                        {project.solution}
                      </Text>
                    </Box>
                  </HStack>

                  {/* Impact */}
                  <Box>
                    <Heading as="h4" fontSize="md" color="white" mb={3}>
                      {lang === 'en' ? '📊 Impact' : '📊 영향'}
                    </Heading>
                    <VStack align="flex-start" spacing={2}>
                      {project.impact.map((item, idx) => (
                        <HStack key={idx} align="flex-start" spacing={3}>
                          <Text color="brand.500" fontSize="lg" lineHeight="1.4">
                            •
                          </Text>
                          <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                            {item}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>

                  {/* Partners & Website */}
                  <HStack
                    justify="space-between"
                    align="flex-start"
                    flexDirection={{ base: "column", md: "row" }}
                    spacing={4}
                  >
                    {/* Partners */}
                    {project.partners && project.partners.length > 0 && (
                      <Box flex={1}>
                        <Text fontWeight="600" color="white" mb={3} fontSize="sm">
                          {lang === 'en' ? '🤝 Partners' : '🤝 파트너'}
                        </Text>
                        <HStack flexWrap="wrap" gap={2}>
                          {project.partners.map((partner, idx) => (
                            <Badge
                              key={idx}
                              bg="dark.700"
                              color="gray.400"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                            >
                              {partner}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    )}

                    {/* Visit Button */}
                    {project.website !== '#' && (
                      <Button
                        as="a"
                        href={project.website}
                        target="_blank"
                        size="md"
                        bg="transparent"
                        border="1px"
                        borderColor="brand.500"
                        color="brand.500"
                        rightIcon={<ExternalLinkIcon />}
                        _hover={{ bg: 'brand.500', color: 'white' }}
                        transition="all 0.2s"
                        px={8}
                      >
                        {lang === 'en' ? 'Visit Project' : '프로젝트 방문'}
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </Box>

              {/* Divider between projects */}
              {index < projectsList.length - 1 && (
                <Box py={6}>
                  <Divider borderColor="dark.700" />
                </Box>
              )}
            </Box>
          ))}
        </VStack>

        {/* Collaboration CTA */}
        <Box py={32} mt={20} borderTop="2px" borderColor="dark.600">
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
            <Text fontSize="6xl" mb={6}>
              🤝
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              mb={6}
            >
              {lang === 'en' ? 'Wanna Collab?' : '함께 협업하실래요?'}
            </Heading>
            <Text fontSize="lg" color="gray.400" mb={8} lineHeight="1.8" maxW="600px" mx="auto">
              {lang === 'en'
                ? "We're always looking for like-minded partners, entrepreneurs, and change-makers to collaborate with. If you have an idea or project that aligns with our glocal mission, let's talk."
                : '우리는 항상 같은 마음을 가진 파트너, 기업가, 체인지메이커들과 협업할 기회를 찾고 있습니다. 우리의 글로컬 미션과 부합하는 아이디어나 프로젝트가 있다면 이야기를 나눠봐요.'}
            </Text>
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  bg="brand.500"
                  color="white"
                  px={12}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  leftIcon={<EmailIcon />}
                  _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  {lang === 'en' ? 'Get in Touch' : '문의하기'}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                px={12}
                py={6}
                fontSize="md"
                fontWeight="600"
                leftIcon={<DownloadIcon />}
                _hover={{
                  bg: 'brand.500',
                  color: 'white',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                {lang === 'en' ? 'Download Partnership Brief' : '파트너십 안내서 다운로드'}
              </Button>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
