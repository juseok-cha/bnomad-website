'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { getPublishedPosts } from '@/lib/firebase/blogService'
import { BlogPost } from '@/lib/types/blog'

export default function BlogPage({ params }: { params: { lang: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const lang = params.lang as 'en' | 'ko'

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const fetchedPosts = await getPublishedPosts(lang, 50)
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const categoryLabels: Record<string, { en: string; ko: string }> = {
    journey: { en: 'Journey', ko: '여정' },
    insights: { en: 'Insights', ko: '인사이트' },
    reflections: { en: 'Reflections', ko: '성찰' },
    reports: { en: 'Reports', ko: '리포트' },
  }

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
            {lang === 'en' ? 'Blog' : '블로그'}
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
          >
            {lang === 'en' ? 'Stories & Insights' : '스토리 & 인사이트'}
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.400" maxW="700px" lineHeight="1.8">
            {lang === 'en'
              ? 'Sharing our journey of glocal innovation and authentic community building'
              : '글로컬 혁신과 진정성 있는 커뮤니티 구축의 여정을 공유합니다'}
          </Text>
        </VStack>

        {/* Posts Grid */}
        {loading ? (
          <Box textAlign="center" py={20}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text mt={4} color="gray.400" fontSize="lg">
              {lang === 'en' ? 'Loading posts...' : '게시물 로딩 중...'}
            </Text>
          </Box>
        ) : posts.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="xl" color="gray.500">
              {lang === 'en'
                ? 'No posts published yet. Check back soon!'
                : '아직 게시된 글이 없습니다. 곧 돌아와 주세요!'}
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {posts.map((post) => (
              <Link key={post.id} href={`/${lang}/blog/${post.slug}`}>
                <Box
                  bg="dark.800"
                  border="1px"
                  borderColor="dark.600"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{
                    borderColor: 'brand.500',
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                  h="full"
                >
                  {post.coverImage && (
                    <Box
                      h="240px"
                      bgImage={`url(${post.coverImage})`}
                      bgSize="cover"
                      bgPosition="center"
                      position="relative"
                      _after={{
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        bg: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)',
                      }}
                    />
                  )}
                  <VStack align="flex-start" spacing={4} p={6}>
                    <HStack spacing={2} flexWrap="wrap">
                      <Badge
                        bg="brand.500"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="600"
                        textTransform="uppercase"
                      >
                        {categoryLabels[post.category]?.[lang] || post.category}
                      </Badge>
                      {post.featured && (
                        <Badge
                          bg="dark.600"
                          color="brand.500"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          textTransform="uppercase"
                        >
                          {lang === 'en' ? 'Featured' : '추천'}
                        </Badge>
                      )}
                    </HStack>
                    <Heading
                      as="h3"
                      fontSize="xl"
                      color="white"
                      fontWeight="bold"
                      noOfLines={2}
                      lineHeight="1.4"
                    >
                      {post.title[lang] || post.title.en}
                    </Heading>
                    <Text color="gray.400" noOfLines={3} fontSize="sm" lineHeight="1.7">
                      {post.excerpt[lang] || post.excerpt.en}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt="auto" pt={2}>
                      {new Date(post.publishedAt).toLocaleDateString(
                        lang === 'ko' ? 'ko-KR' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
