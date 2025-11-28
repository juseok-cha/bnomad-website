'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Spinner,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { getPostBySlug } from '@/lib/firebase/blogService'
import { BlogPost } from '@/lib/types/blog'

export default function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const lang = params.lang as 'en' | 'ko'
  const router = useRouter()

  useEffect(() => {
    loadPost()
  }, [params.slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      const fetchedPost = await getPostBySlug(params.slug)

      if (!fetchedPost || !fetchedPost.published) {
        router.push(`/${lang}/blog`)
        return
      }

      setPost(fetchedPost)
    } catch (error) {
      console.error('Error loading post:', error)
      router.push(`/${lang}/blog`)
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

  if (loading) {
    return (
      <Box bg="black" minH="100vh" color="white">
        <Container maxW="900px" py={32}>
          <VStack spacing={6}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text color="gray.400" fontSize="lg">
              {lang === 'en' ? 'Loading...' : '로딩 중...'}
            </Text>
          </VStack>
        </Container>
      </Box>
    )
  }

  if (!post) {
    return null
  }

  return (
    <Box bg="black" minH="100vh" color="white">
      <Container maxW="900px" px={{ base: 4, md: 8, lg: 12 }} py={32}>
        <VStack spacing={8} align="stretch">
          {/* Cover Image */}
          {post.coverImage && (
            <Box
              h={{ base: "300px", md: "500px" }}
              bgImage={`url(${post.coverImage})`}
              bgSize="cover"
              bgPosition="center"
              borderRadius="lg"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                inset: 0,
                bg: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)',
                borderRadius: 'lg',
              }}
            />
          )}

          {/* Post Header */}
          <VStack spacing={6} align="stretch">
            <HStack spacing={3} flexWrap="wrap">
              <Badge
                bg="brand.500"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
                textTransform="uppercase"
              >
                {categoryLabels[post.category]?.[lang] || post.category}
              </Badge>
              {post.featured && (
                <Badge
                  bg="dark.600"
                  color="brand.500"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  {lang === 'en' ? 'Featured' : '추천'}
                </Badge>
              )}
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              lineHeight="1.2"
            >
              {post.title[lang] || post.title.en}
            </Heading>

            <HStack spacing={4} color="gray.500" fontSize="sm" divider={<Text>•</Text>}>
              <Text>{post.author.name}</Text>
              <Text>
                {new Date(post.publishedAt).toLocaleDateString(
                  lang === 'ko' ? 'ko-KR' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </Text>
            </HStack>

            {post.tags.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    bg="dark.700"
                    color="gray.400"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                    fontWeight="500"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            <Divider borderColor="dark.600" />

            {/* Markdown Content */}
            <Box
              className="markdown-content"
              sx={{
                '& h1': {
                  fontSize: { base: '2xl', md: '3xl' },
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 6,
                  mt: 8,
                  lineHeight: '1.3',
                },
                '& h2': {
                  fontSize: { base: 'xl', md: '2xl' },
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 4,
                  mt: 8,
                  lineHeight: '1.3',
                },
                '& h3': {
                  fontSize: { base: 'lg', md: 'xl' },
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 3,
                  mt: 6,
                  lineHeight: '1.4',
                },
                '& p': {
                  mb: 6,
                  lineHeight: '1.8',
                  color: 'gray.400',
                  fontSize: { base: 'md', md: 'lg' },
                },
                '& ul, & ol': {
                  ml: 6,
                  mb: 6,
                  color: 'gray.400',
                },
                '& li': {
                  mb: 3,
                  lineHeight: '1.7',
                },
                '& a': {
                  color: 'brand.500',
                  textDecoration: 'underline',
                  _hover: {
                    color: 'brand.400',
                  },
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'brand.500',
                  pl: 6,
                  py: 4,
                  my: 6,
                  fontStyle: 'italic',
                  color: 'gray.400',
                  bg: 'dark.800',
                  borderRadius: 'md',
                },
                '& img': {
                  rounded: 'lg',
                  my: 8,
                  width: '100%',
                  height: 'auto',
                },
                '& pre': {
                  rounded: 'lg',
                  my: 6,
                  overflow: 'auto',
                },
                '& code': {
                  fontSize: '0.9em',
                },
                '& hr': {
                  borderColor: 'dark.600',
                  my: 8,
                },
              }}
            >
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: '8px',
                          padding: '1.5rem',
                          fontSize: '0.9em',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={className}
                        {...props}
                        style={{
                          background: '#1a1a1a',
                          color: '#F93F05',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.9em',
                        }}
                      >
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {post.content[lang] || post.content.en}
              </ReactMarkdown>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
