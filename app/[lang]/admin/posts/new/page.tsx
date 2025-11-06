'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
  Switch,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { createPost } from '@/lib/firebase/blogService'
import { BlogPostInput } from '@/lib/types/blog'

export default function NewPost({ params }: { params: { lang: string } }) {
  const [formData, setFormData] = useState<BlogPostInput>({
    title: { en: '', ko: '' },
    slug: '',
    content: { en: '', ko: '' },
    excerpt: { en: '', ko: '' },
    category: 'journey',
    tags: [],
    coverImage: '',
    featured: false,
    published: false,
  })
  const [tagsInput, setTagsInput] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (!user) {
      router.push(`/${params.lang}/admin/login`)
    }
  }, [user, router, params.lang])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (lang: 'en' | 'ko', value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: { ...prev.title, [lang]: value },
      slug: lang === 'en' && !formData.slug ? generateSlug(value) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: 'Not authenticated',
        description: 'Please sign in to create a post',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (!formData.title.en || !formData.content.en) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in at least the English title and content',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setLoading(true)

    try {
      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const postData = {
        ...formData,
        tags,
      }

      await createPost(postData, user.email || '', user.displayName || 'Admin')

      toast({
        title: 'Post created',
        description: 'Your blog post has been created successfully',
        status: 'success',
        duration: 3000,
      })

      router.push(`/${params.lang}/admin/dashboard`)
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: 'Error creating post',
        description: 'Failed to create blog post',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl">Create New Post</Heading>
          <Button
            variant="ghost"
            onClick={() => router.push(`/${params.lang}/admin/dashboard`)}
          >
            Cancel
          </Button>
        </HStack>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Box bg="white" p={6} rounded="lg" shadow="md">
              <Tabs>
                <TabList>
                  <Tab>English</Tab>
                  <Tab>Korean</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl isRequired>
                        <FormLabel>Title (English)</FormLabel>
                        <Input
                          value={formData.title.en}
                          onChange={(e) => handleTitleChange('en', e.target.value)}
                          placeholder="Enter post title in English"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Content (English)</FormLabel>
                        <Textarea
                          value={formData.content.en}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              content: { ...prev.content, en: e.target.value },
                            }))
                          }
                          placeholder="Write your post content in Markdown..."
                          minH="300px"
                          fontFamily="monospace"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Excerpt (English)</FormLabel>
                        <Textarea
                          value={formData.excerpt.en}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              excerpt: { ...prev.excerpt, en: e.target.value },
                            }))
                          }
                          placeholder="Brief summary of the post"
                          rows={3}
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Title (Korean)</FormLabel>
                        <Input
                          value={formData.title.ko}
                          onChange={(e) => handleTitleChange('ko', e.target.value)}
                          placeholder="한국어 제목을 입력하세요"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Content (Korean)</FormLabel>
                        <Textarea
                          value={formData.content.ko}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              content: { ...prev.content, ko: e.target.value },
                            }))
                          }
                          placeholder="마크다운 형식으로 내용을 작성하세요..."
                          minH="300px"
                          fontFamily="monospace"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Excerpt (Korean)</FormLabel>
                        <Textarea
                          value={formData.excerpt.ko}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              excerpt: { ...prev.excerpt, ko: e.target.value },
                            }))
                          }
                          placeholder="게시물 요약"
                          rows={3}
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            <Box bg="white" p={6} rounded="lg" shadow="md">
              <VStack spacing={4} align="stretch">
                <Heading size="md">Post Settings</Heading>
                <Divider />

                <FormControl isRequired>
                  <FormLabel>URL Slug</FormLabel>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="url-friendly-slug"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as any,
                      }))
                    }
                  >
                    <option value="journey">Journey</option>
                    <option value="insights">Insights</option>
                    <option value="reflections">Reflections</option>
                    <option value="reports">Reports</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <Input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="innovation, community, collaboration"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Cover Image URL</FormLabel>
                  <Input
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </FormControl>

                <HStack spacing={6}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Featured</FormLabel>
                    <Switch
                      isChecked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Publish</FormLabel>
                    <Switch
                      isChecked={formData.published}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          published: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>
                </HStack>
              </VStack>
            </Box>

            <HStack justify="flex-end" spacing={4}>
              <Button
                variant="outline"
                onClick={() => router.push(`/${params.lang}/admin/dashboard`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                isLoading={loading}
                loadingText="Creating..."
              >
                Create Post
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  )
}
