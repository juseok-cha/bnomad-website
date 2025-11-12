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
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
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

  const categoryColors: Record<string, string> = {
    journey: 'blue',
    insights: 'purple',
    reflections: 'green',
    reports: 'orange',
  }

  const categoryLabels: Record<string, { en: string; ko: string }> = {
    journey: { en: 'Journey', ko: '여정' },
    insights: { en: 'Insights', ko: '인사이트' },
    reflections: { en: 'Reflections', ko: '성찰' },
    reports: { en: 'Reports', ko: '리포트' },
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>
            {lang === 'en' ? 'Stories & Insights' : '스토리 & 인사이트'}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {lang === 'en'
              ? 'Sharing our journey of glocal innovation'
              : '글로컬 혁신의 여정을 공유합니다'}
          </Text>
        </Box>

        {loading ? (
          <Box textAlign="center" py={20}>
            <Spinner size="xl" color="brand.500" />
            <Text mt={4} color="gray.600">
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {posts.map((post) => (
              <Link key={post.id} href={`/${lang}/blog/${post.slug}`}>
                <Card
                  h="full"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                  bg={useColorModeValue('white', 'gray.800')}
                >
                  {post.coverImage && (
                    <Box
                      h="200px"
                      bgImage={`url(${post.coverImage})`}
                      bgSize="cover"
                      bgPosition="center"
                      roundedTop="md"
                    />
                  )}
                  <CardHeader>
                    <HStack spacing={2} mb={2}>
                      <Badge colorScheme={categoryColors[post.category]}>
                        {categoryLabels[post.category][lang]}
                      </Badge>
                      {post.featured && (
                        <Badge colorScheme="yellow">
                          {lang === 'en' ? 'Featured' : '추천'}
                        </Badge>
                      )}
                    </HStack>
                    <Heading size="md" noOfLines={2}>
                      {post.title[lang] || post.title.en}
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <Text color="gray.600" noOfLines={3}>
                      {post.excerpt[lang] || post.excerpt.en}
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={4}>
                      {new Date(post.publishedAt).toLocaleDateString(
                        lang === 'ko' ? 'ko-KR' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Text>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  )
}
