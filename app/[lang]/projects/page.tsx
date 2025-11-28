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
  Badge,
  Button,
  HStack,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import projectsContent from '@/lib/i18n/locales/projects.json'

export default function ProjectsPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = projectsContent[lang]

  const projectsList = [
    {
      key: 'openWaste',
      ...content.projects.openWaste,
      icon: '♻️',
    },
    {
      key: 'politico',
      ...content.projects.politico,
      icon: '🗳️',
    },
    {
      key: 'beeModel',
      ...content.projects.beeModel,
      icon: '🐝',
    },
    {
      key: 'glocalLab',
      ...content.projects.glocalLab,
      icon: '🔬',
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

        {/* Projects Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {projectsList.map((project, index) => (
            <Box
              key={project.key}
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
              <VStack align="flex-start" spacing={6}>
                {/* Icon & Category */}
                <HStack spacing={4} align="center">
                  <Text fontSize="4xl">{project.icon}</Text>
                  <VStack align="flex-start" spacing={1}>
                    <Badge
                      colorScheme="orange"
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
                      colorScheme="gray"
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                    >
                      {project.status}
                    </Badge>
                  </VStack>
                </HStack>

                {/* Title & Tagline */}
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" fontSize="2xl" color="white">
                    {project.title}
                  </Heading>
                  <Text fontSize="md" color="brand.500" fontWeight="600">
                    {project.tagline}
                  </Text>
                </VStack>

                {/* Description */}
                <Text color="gray.400" fontSize="md" lineHeight="1.7">
                  {project.description}
                </Text>

                {/* Challenge */}
                <Box>
                  <Text fontWeight="600" color="white" mb={2} fontSize="sm">
                    {lang === 'en' ? 'Challenge' : '도전 과제'}
                  </Text>
                  <Text color="gray.500" fontSize="sm" lineHeight="1.6">
                    {project.challenge}
                  </Text>
                </Box>

                {/* Solution */}
                <Box>
                  <Text fontWeight="600" color="white" mb={2} fontSize="sm">
                    {lang === 'en' ? 'Solution' : '솔루션'}
                  </Text>
                  <Text color="gray.500" fontSize="sm" lineHeight="1.6">
                    {project.solution}
                  </Text>
                </Box>

                {/* Impact */}
                <Box>
                  <Text fontWeight="600" color="white" mb={3} fontSize="sm">
                    {lang === 'en' ? 'Impact' : '영향'}
                  </Text>
                  <VStack align="flex-start" spacing={2}>
                    {project.impact.map((item, idx) => (
                      <HStack key={idx} align="flex-start" spacing={2}>
                        <Text color="brand.500" fontSize="lg" lineHeight="1">
                          •
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          {item}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                {/* Partners */}
                {project.partners && project.partners.length > 0 && (
                  <Box>
                    <Text fontWeight="600" color="white" mb={2} fontSize="sm">
                      {lang === 'en' ? 'Partners' : '파트너'}
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
                    size="sm"
                    bg="transparent"
                    border="1px"
                    borderColor="brand.500"
                    color="brand.500"
                    rightIcon={<ExternalLinkIcon />}
                    _hover={{ bg: 'brand.500', color: 'white' }}
                    transition="all 0.2s"
                  >
                    {lang === 'en' ? 'Visit Project' : '프로젝트 방문'}
                  </Button>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <Box py={32} textAlign="center" borderTop="1px" borderColor="dark.600" mt={32}>
          <VStack spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="white"
              maxW="700px"
            >
              {content.cta.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="600px">
              {content.cta.description}
            </Text>
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
                {content.cta.button}
              </Button>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
