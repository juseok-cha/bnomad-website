import { isLocale, type SupportedLang } from '@/lib/i18n/localeUtils'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react'
import Link from 'next/link'
import projectsContent from '@/lib/i18n/locales/projects.json'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }]
}

const copy = {
  en: {
    hero: {
      eyebrow: 'Venture Studio',
      title: 'Be Nomad, Be Glocal',
      description:
        'A glocal impact accelerator rooted in Seoul and Jeju—building ventures, programs, and labs with global vision and local depth.',
      brochure: 'Download Brochure',
      contact: 'Talk to Us',
      brochureLink: '/assets/bnomad-brochure.pdf',
    },
    intro: {
      eyebrow: 'Our mission',
      title: 'Authentic relationships, bold challenges',
      body: [
        'We cultivate teams that connect people, culture, and ideas beyond borders.',
        'We build ecosystems where daring teams can grow through real practice.',
      ],
      stats: [
        { label: 'Global MTA labs', value: '14' },
        { label: 'University programs', value: '30' },
        { label: 'Business projects', value: '220' },
      ],
    },
    vision: {
      title: 'Future forward',
      items: [
        {
          title: 'Glocal flow from Korea to the world',
          desc: 'Build a bridge where local strengths and global reach move together.',
        },
        {
          title: 'Connected labs, programs, strategy',
          desc: 'Link open labs, immersive programs, and venture strategy into one platform.',
        },
        {
          title: 'Make the future together',
          desc: "We don't wait for change—we build it collectively, across teams and borders.",
        },
      ],
    },
    team: {
      title: 'Team mantra',
      mantraTitle: 'Team mantra',
      mantra: [
        'Learning through action—depth comes from doing.',
        'Glocal thinking—wide global view, deep local insight.',
        'Diversity and autonomy—respect perspectives, work with trust.',
        'Teampreneurship—we challenge and grow as one team.',
      ],
      photos: [
        {
          title: 'Field learning',
          subtitle: 'Roadtrips with LEINNers',
          image:
            'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Making together',
          subtitle: 'Labs, tools, and hands-on work',
          image:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    projects: {
      title: 'Projects we are building',
      cta: 'See all projects',
    },
    collab: {
      title: 'Wanna collab?',
      subtitle: 'We partner with founders, universities, and communities to build ventures with heart.',
      button: 'Start a project with us',
    },
  },
  ko: {
    hero: {
      eyebrow: '벤처 스튜디오',
      title: 'Be Nomad, Be Glocal',
      description:
        '포용적 지속가능성을 촉진하는 글로컬 임팩트 액셀러레이터 — 서울·제주를 기반으로 글로벌 비전과 로컬 깊이를 연결합니다.',
      brochure: '브로슈어 다운로드',
      contact: '함께 이야기해요',
      brochureLink: '/assets/bnomad-brochure.pdf',
    },
    intro: {
      eyebrow: '미션',
      title: '진정성 있는 관계를 맺으며 나다움에 도전',
      body: [
        '사람·문화·아이디어를 넘어 연결을 만들고,',
        '도전적인 팀이 성장할 수 있는 생태계를 구축합니다.',
      ],
      stats: [
        { label: '글로벌 MTA 랩', value: '14' },
        { label: '대학 프로그램', value: '30' },
        { label: '비즈니스 프로젝트', value: '220' },
      ],
    },
    vision: {
      title: 'Future forward',
      items: [
        {
          title: '한국에서 세계로 이어지는 흐름',
          desc: '로컬의 힘과 글로벌 확장을 함께 만드는 글로컬 흐름.',
        },
        {
          title: '랩–프로그램–전략의 연결',
          desc: '오픈랩, 프로그램, 전략을 하나의 변혁 플랫폼으로 연결합니다.',
        },
        {
          title: '함께 만드는 미래',
          desc: '미래는 기다리는 것이 아니라 함께 만들어간다는 믿음.',
        },
      ],
    },
    team: {
      title: '팀 만트라',
      mantraTitle: '팀 만트라',
      mantra: [
        '실행을 통한 배움 — 깊이는 직접 경험에서 나온다.',
        '글로컬 사고 — 넓은 글로벌 시야와 깊은 로컬 통찰.',
        '다양성과 자율성 — 관점을 존중하고 신뢰 기반으로 일한다.',
        '팀프러너십 — 창업가정신으로 하나의 팀처럼 도전하고 성장한다.',
      ],
      photos: [
        {
          title: '현장에서 배우기',
          subtitle: '레이너와 함께하는 로드트립',
          image:
            'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: '함께 만드는 시간',
          subtitle: '랩, 도구, 손으로 배우는 협업',
          image:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    projects: {
      title: '우리가 만드는 프로젝트',
      cta: '모든 프로젝트 보기',
    },
    collab: {
      title: '같이 만들까요?',
      subtitle: '창업가, 대학, 커뮤니티와 함께 마음이 있는 벤처를 빌드합니다.',
      button: '프로젝트 시작하기',
    },
  },
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const fallbackLocale: SupportedLang = 'en'
  const locale = isLocale(lang) ? lang : fallbackLocale
  const t = copy[locale]
  const projects = projectsContent[locale].projects
  const projectCards = Object.values(projects).slice(0, 3)

  return (
    <Box bg="black" minH="100vh" color="white">
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }} py={12}>
        {/* Hero */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} py={12} alignItems="center">
          <VStack align="flex-start" spacing={6}>
            <Badge
              colorScheme="orange"
              bg="brand.500"
              color="black"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              fontWeight="700"
              letterSpacing="wide"
            >
              {t.hero.eyebrow}
            </Badge>
            <Heading as="h1" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} lineHeight="1.05">
              {t.hero.title}
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.300" lineHeight="1.8" maxW="700px">
              {t.hero.description}
            </Text>
            <HStack spacing={4} flexWrap="wrap">
              <Button
                as="a"
                href={t.hero.brochureLink}
                size="lg"
                bg="brand.500"
                color="black"
                px={8}
                py={6}
                fontWeight="700"
                _hover={{ bg: 'brand.600', color: 'white', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                {t.hero.brochure}
              </Button>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="brand.500"
                  color="brand.500"
                  px={8}
                  py={6}
                  fontWeight="700"
                  _hover={{ bg: 'brand.500', color: 'black', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  {t.hero.contact}
                </Button>
              </Link>
            </HStack>
          </VStack>

          <Box
            bg="linear-gradient(135deg, rgba(249,63,5,0.15), rgba(249,63,5,0.05))"
            border="1px"
            borderColor="dark.600"
            borderRadius="2xl"
            p={10}
            shadow="xl"
          >
            <VStack align="stretch" spacing={6}>
              {t.intro.stats.map((stat, idx) => (
                <Box
                  key={idx}
                  p={4}
                  borderRadius="lg"
                  bg="rgba(255,255,255,0.04)"
                  border="1px"
                  borderColor="dark.600"
                >
                  <Text fontSize="4xl" fontWeight="800" color="brand.500">
                    {stat.value}
                  </Text>
                  <Text color="gray.300" fontWeight="600">
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Introduction */}
        <Box py={24} borderTop="1px" borderColor="dark.600">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="start">
            <VStack align="flex-start" spacing={4}>
              <Badge colorScheme="orange" bg="dark.800" color="brand.500" px={3} py={1} borderRadius="full">
                {t.intro.eyebrow}
              </Badge>
              <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} lineHeight="1.2">
                {t.intro.title}
              </Heading>
            </VStack>
            <VStack align="flex-start" spacing={4}>
              {t.intro.body.map((paragraph, idx) => (
                <Text key={idx} fontSize="lg" color="gray.300" lineHeight="1.8">
                  {paragraph}
                </Text>
              ))}
              <Link href={`/${locale}/team`}>
                <Text color="brand.500" fontWeight="700" _hover={{ textDecoration: 'underline' }} cursor="pointer">
                  {locale === 'en' ? 'Meet the crew →' : '팀 소개 보기 →'}
                </Text>
              </Link>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Vision */}
        <Box py={24} borderTop="1px" borderColor="dark.600">
          <VStack align="flex-start" spacing={6} mb={10}>
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
              {t.vision.title}
            </Heading>
            <Text color="gray.400" maxW="760px">
              {locale === 'en'
                ? 'A glocal impact accelerator: inclusive, sustainable, and built together.'
                : '포용적이고 지속가능한 글로컬 임팩트 액셀러레이터를 함께 만들어갑니다.'}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {t.vision.items.map((item, idx) => (
              <Box
                key={idx}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)' }}
                transition="all 0.2s"
              >
                <Heading as="h3" fontSize="xl" mb={3}>
                  {item.title}
                </Heading>
                <Text color="gray.400" lineHeight="1.7">
                  {item.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Team Highlight */}
        <Box py={24} borderTop="1px" borderColor="dark.600">
          <VStack align="flex-start" spacing={4} mb={10}>
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
              {t.team.title}
            </Heading>
            <HStack spacing={3} flexWrap="wrap">
              {t.team.mantra.map((line, idx) => (
                <Badge
                  key={idx}
                  bg="dark.800"
                  color="brand.500"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  border="1px"
                  borderColor="dark.600"
                >
                  {line}
                </Badge>
              ))}
            </HStack>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {t.team.photos.map((photo, idx) => (
              <Box
                key={idx}
                borderRadius="xl"
                overflow="hidden"
                position="relative"
                minH="320px"
                bgImage={`url(${photo.image})`}
                bgSize="cover"
                bgPosition="center"
                _after={{
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  bg: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
                }}
              >
                <Box position="absolute" bottom={6} left={6} zIndex={1}>
                  <Text fontSize="lg" fontWeight="700">
                    {photo.title}
                  </Text>
                  <Text color="gray.300">{photo.subtitle}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Projects preview */}
        <Box py={24} borderTop="1px" borderColor="dark.600">
          <VStack align="flex-start" spacing={6} mb={10}>
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
              {t.projects.title}
            </Heading>
            <Text color="gray.400" maxW="760px">
              {locale === 'en'
                ? 'Key glocal programs and venture bridges we are running.'
                : '현재 운영 중인 글로컬 프로그램과 벤처 브릿지를 소개합니다.'}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {projectCards.map((project: any, idx: number) => (
              <Box
                key={idx}
                p={6}
                bg="dark.800"
                border="1px"
                borderColor="dark.600"
                borderRadius="lg"
                _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)' }}
                transition="all 0.2s"
                h="full"
              >
                <Badge colorScheme="orange" mb={3} px={3} py={1} borderRadius="md">
                  {project.category}
                </Badge>
                <Heading as="h3" fontSize="xl" mb={2}>
                  {project.title}
                </Heading>
                <Text color="brand.500" fontWeight="700" mb={3}>
                  {project.tagline}
                </Text>
                <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                  {project.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
          <HStack justify="flex-start" mt={8}>
            <Link href={`/${locale}/projects`}>
              <Button variant="link" color="brand.500" fontWeight="700">
                {t.projects.cta} →
              </Button>
            </Link>
          </HStack>
        </Box>

        {/* Collaboration CTA */}
        <Box
          py={20}
          px={{ base: 6, md: 12 }}
          bg="linear-gradient(120deg, rgba(249,63,5,0.15), rgba(249,63,5,0.05))"
          border="1px"
          borderColor="dark.600"
          borderRadius="2xl"
          textAlign="center"
          mt={16}
        >
          <VStack spacing={6}>
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
              {t.collab.title}
            </Heading>
            <Text color="gray.300" maxW="720px" fontSize="lg">
              {t.collab.subtitle}
            </Text>
            <HStack spacing={4} justify="center">
              <Link href={`/${locale}/contact`}>
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
                  {t.collab.button}
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
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
                  {locale === 'en' ? 'Browse projects' : '프로젝트 살펴보기'}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
