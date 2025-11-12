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
  useColorModeValue,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
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

  if (loading) {
    return (
      <Container maxW="container.md" py={20}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>{lang === 'en' ? 'Loading...' : '로딩 중...'}</Text>
        </VStack>
      </Container>
    )
  }

  if (!post) {
    return null
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        {post.coverImage && (
          <Box
            h="400px"
            bgImage={`url(${post.coverImage})`}
            bgSize="cover"
            bgPosition="center"
            rounded="xl"
          />
        )}

        <VStack spacing={4} align="stretch">
          <HStack spacing={2}>
            <Badge colorScheme={categoryColors[post.category]} fontSize="sm">
              {categoryLabels[post.category][lang]}
            </Badge>
            {post.featured && (
              <Badge colorScheme="yellow" fontSize="sm">
                {lang === 'en' ? 'Featured' : '추천'}
              </Badge>
            )}
          </HStack>

          <Heading size="2xl">{post.title[lang] || post.title.en}</Heading>

          <HStack spacing={4} color="gray.600" fontSize="sm">
            <Text>{post.author.name}</Text>
            <Text>•</Text>
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
                <Badge key={index} variant="outline" colorScheme="gray">
                  {tag}
                </Badge>
              ))}
            </HStack>
          )}

          <Divider />

          <Box
            className="markdown-content"
            sx={{
              '& h1': {
                fontSize: '2xl',
                fontWeight: 'bold',
                mb: 4,
                mt: 6,
              },
              '& h2': {
                fontSize: 'xl',
                fontWeight: 'bold',
                mb: 3,
                mt: 5,
              },
              '& h3': {
                fontSize: 'lg',
                fontWeight: 'bold',
                mb: 2,
                mt: 4,
              },
              '& p': {
                mb: 4,
                lineHeight: '1.8',
              },
              '& ul, & ol': {
                ml: 6,
                mb: 4,
              },
              '& li': {
                mb: 2,
              },
              '& a': {
                color: 'brand.600',
                textDecoration: 'underline',
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'gray.300',
                pl: 4,
                py: 2,
                my: 4,
                fontStyle: 'italic',
                color: 'gray.700',
              },
              '& img': {
                rounded: 'md',
                my: 4,
              },
              '& pre': {
                rounded: 'md',
                my: 4,
              },
            }}
          >
            <ReactMarkdown
              components={{
                code({ node, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={className}
                      {...props}
                      style={{
                        background: useColorModeValue('gray.100', 'gray.700'),
                        padding: '2px 6px',
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
  )
}
