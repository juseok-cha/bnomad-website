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
  List,
  ListItem,
  ListIcon,
  Divider,
  HStack,
} from '@chakra-ui/react'
import { CheckCircleIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import projectsContent from '@/lib/i18n/locales/projects.json'

export default function ProjectsPage() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'ko') || 'en'
  const content = projectsContent[lang]

  const projectsList = [
    {
      key: 'openWaste',
      ...content.projects.openWaste,
      color: 'green',
      icon: '♻️',
    },
    {
      key: 'politico',
      ...content.projects.politico,
      color: 'blue',
      icon: '🗳️',
    },
    {
      key: 'beeModel',
      ...content.projects.beeModel,
      color: 'yellow',
      icon: '🐝',
    },
    {
      key: 'glocalLab',
      ...content.projects.glocalLab,
      color: 'purple',
      icon: '🔬',
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

      {/* Projects */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={16}>
          {projectsList.map((project, index) => (
            <Card
              key={project.key}
              width="full"
              bg={useColorModeValue('white', 'gray.800')}
              shadow="xl"
              rounded="2xl"
              overflow="hidden"
            >
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0}>
                {/* Left Side - Visual */}
                <Box
                  bg={`${project.color}.100`}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  p={10}
                  minH="400px"
                >
                  <Text fontSize="8xl" mb={4}>
                    {project.icon}
                  </Text>
                  <Badge colorScheme={project.color} fontSize="md" mb={2}>
                    {project.category}
                  </Badge>
                  <Badge colorScheme="gray" fontSize="sm">
                    {project.status}
                  </Badge>
                </Box>

                {/* Right Side - Content */}
                <Box p={8}>
                  <VStack align="start" spacing={6}>
                    <VStack align="start" spacing={2}>
                      <Heading size="xl" color={`${project.color}.600`}>
                        {project.title}
                      </Heading>
                      <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        {project.tagline}
                      </Text>
                    </VStack>

                    <Text color="gray.700" fontSize="md">
                      {project.description}
                    </Text>

                    <Divider />

                    {/* Challenge & Solution */}
                    <Box>
                      <Text fontWeight="bold" color={`${project.color}.600`} mb={2}>
                        {lang === 'en' ? 'Challenge' : '도전 과제'}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {project.challenge}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="bold" color={`${project.color}.600`} mb={2}>
                        {lang === 'en' ? 'Solution' : '솔루션'}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {project.solution}
                      </Text>
                    </Box>

                    {/* Impact */}
                    <Box>
                      <Text fontWeight="bold" color={`${project.color}.600`} mb={3}>
                        {lang === 'en' ? 'Impact' : '영향'}
                      </Text>
                      <List spacing={2}>
                        {project.impact.map((item, idx) => (
                          <ListItem key={idx} fontSize="sm" display="flex" alignItems="start">
                            <ListIcon as={CheckCircleIcon} color={`${project.color}.500`} mt={0.5} />
                            <Text>{item}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    {/* Partners */}
                    <Box>
                      <Text fontWeight="bold" color={`${project.color}.600`} mb={2}>
                        {lang === 'en' ? 'Partners' : '파트너'}
                      </Text>
                      <HStack flexWrap="wrap" gap={2}>
                        {project.partners.map((partner, idx) => (
                          <Badge key={idx} colorScheme={project.color} variant="subtle">
                            {partner}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>

                    {project.website !== '#' && (
                      <Button
                        as="a"
                        href={project.website}
                        target="_blank"
                        colorScheme={project.color}
                        rightIcon={<ExternalLinkIcon />}
                      >
                        {lang === 'en' ? 'Visit Project' : '프로젝트 방문'}
                      </Button>
                    )}
                  </VStack>
                </Box>
              </SimpleGrid>
            </Card>
          ))}
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="brand.600" py={16} mt={10}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Heading size="xl">{content.cta.title}</Heading>
            <Text fontSize="lg" maxW="2xl">
              {content.cta.description}
            </Text>
            <Link href={`/${lang}/contact`}>
              <Button
                size="lg"
                bg="white"
                color="brand.600"
                _hover={{ bg: 'gray.100' }}
              >
                {content.cta.button}
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
