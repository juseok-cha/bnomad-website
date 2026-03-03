'use client'

import { useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  Image,
  Text,
  IconButton,
  Progress,
  FormHelperText,
} from '@chakra-ui/react'
import { DeleteIcon, AttachmentIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/contexts/AuthContext'
import { createPost } from '@/lib/firebase/blogService'
import { uploadImage, validateImageFile } from '@/lib/firebase/imageService'
import { BlogPostInput } from '@/lib/types/blog'
import AdminLayout from '@/components/admin/AdminLayout'

export default function NewPost() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
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
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const coverImageInputRef = useRef<HTMLInputElement>(null)
  const contentImageInputRef = useRef<HTMLInputElement>(null)

  const { user } = useAuth()
  const router = useRouter()
  const toast = useToast()

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

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.valid) {
      toast({
        title: 'Invalid file',
        description: validation.error,
        status: 'error',
        duration: 3000,
      })
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const imageUrl = await uploadImage(file, 'blog-covers')

      clearInterval(progressInterval)
      setUploadProgress(100)

      setFormData((prev) => ({ ...prev, coverImage: imageUrl }))

      toast({
        title: 'Image uploaded',
        description: 'Cover image uploaded successfully',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Upload failed',
        description: 'Failed to upload cover image',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (coverImageInputRef.current) {
        coverImageInputRef.current.value = ''
      }
    }
  }

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.valid) {
      toast({
        title: 'Invalid file',
        description: validation.error,
        status: 'error',
        duration: 3000,
      })
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const imageUrl = await uploadImage(file, 'blog-content')

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Insert markdown image syntax at cursor position
      const markdownImage = `![${file.name}](${imageUrl})`

      toast({
        title: 'Image uploaded',
        description: 'Copy the markdown below to insert the image',
        status: 'success',
        duration: 5000,
      })

      // Copy to clipboard
      navigator.clipboard.writeText(markdownImage)

      toast({
        title: 'Copied to clipboard',
        description: 'Markdown image syntax copied! Paste it in your content.',
        status: 'info',
        duration: 3000,
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = ''
      }
    }
  }

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: '' }))
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

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="xl">Create New Post</Heading>
            <Button
              variant="ghost"
              onClick={() => router.push(`/${lang}/admin/dashboard`)}
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
                          color="gray.900"
                          bg="white"
                          _placeholder={{ color: 'gray.400' }}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Content (English)</FormLabel>
                        <VStack spacing={2} align="stretch">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleContentImageUpload}
                            ref={contentImageInputRef}
                            display="none"
                          />
                          <HStack>
                            <Button
                              size="sm"
                              leftIcon={<AttachmentIcon />}
                              onClick={() => contentImageInputRef.current?.click()}
                              isLoading={uploading}
                              variant="outline"
                            >
                              Insert Image
                            </Button>
                            <Text fontSize="xs" color="gray.500">
                              Upload an image to get markdown code
                            </Text>
                          </HStack>
                          {uploading && uploadProgress > 0 && (
                            <Progress value={uploadProgress} size="xs" colorScheme="brand" />
                          )}
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
                            color="gray.900"
                            bg="white"
                            _placeholder={{ color: 'gray.400' }}
                            fontSize="md"
                            lineHeight="tall"
                          />
                        </VStack>
                        <FormHelperText>
                          Supports Markdown formatting. Use Insert Image button to upload and insert images.
                        </FormHelperText>
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
                          color="gray.900"
                          bg="white"
                          _placeholder={{ color: 'gray.400' }}
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
                          color="gray.900"
                          bg="white"
                          _placeholder={{ color: 'gray.400' }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Content (Korean)</FormLabel>
                        <VStack spacing={2} align="stretch">
                          <HStack>
                            <Button
                              size="sm"
                              leftIcon={<AttachmentIcon />}
                              onClick={() => contentImageInputRef.current?.click()}
                              isLoading={uploading}
                              variant="outline"
                            >
                              이미지 삽입
                            </Button>
                            <Text fontSize="xs" color="gray.500">
                              이미지를 업로드하여 마크다운 코드 받기
                            </Text>
                          </HStack>
                          {uploading && uploadProgress > 0 && (
                            <Progress value={uploadProgress} size="xs" colorScheme="brand" />
                          )}
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
                            color="gray.900"
                            bg="white"
                            _placeholder={{ color: 'gray.400' }}
                            fontSize="md"
                            lineHeight="tall"
                          />
                        </VStack>
                        <FormHelperText>
                          마크다운 형식을 지원합니다. 이미지 삽입 버튼으로 이미지를 업로드하세요.
                        </FormHelperText>
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
                          color="gray.900"
                          bg="white"
                          _placeholder={{ color: 'gray.400' }}
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
                    color="gray.900"
                    bg="white"
                    _placeholder={{ color: 'gray.400' }}
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
                    color="gray.900"
                    bg="white"
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
                    color="gray.900"
                    bg="white"
                    _placeholder={{ color: 'gray.400' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Cover Image</FormLabel>
                  {formData.coverImage ? (
                    <Box position="relative">
                      <Image
                        src={formData.coverImage}
                        alt="Cover"
                        borderRadius="md"
                        maxH="300px"
                        objectFit="cover"
                        w="full"
                      />
                      <IconButton
                        aria-label="Remove image"
                        icon={<DeleteIcon />}
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="red"
                        size="sm"
                        onClick={removeCoverImage}
                      />
                    </Box>
                  ) : (
                    <VStack spacing={2} align="stretch">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        ref={coverImageInputRef}
                        display="none"
                      />
                      <Button
                        leftIcon={<AttachmentIcon />}
                        onClick={() => coverImageInputRef.current?.click()}
                        isLoading={uploading}
                        loadingText="Uploading..."
                        variant="outline"
                      >
                        Upload Cover Image
                      </Button>
                      {uploading && uploadProgress > 0 && (
                        <Progress value={uploadProgress} size="sm" colorScheme="brand" />
                      )}
                      <FormHelperText>
                        Or paste image URL below (Max 5MB, JPEG/PNG/GIF/WebP)
                      </FormHelperText>
                      <Input
                        value={formData.coverImage}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                        }
                        placeholder="https://example.com/image.jpg"
                        size="sm"
                      />
                    </VStack>
                  )}
                </FormControl>

                <Box
                  p={4}
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor={formData.published ? 'green.400' : 'orange.400'}
                  bg={formData.published ? 'green.50' : 'orange.50'}
                >
                  <VStack spacing={3} align="stretch">
                    <Heading size="sm" color={formData.published ? 'green.700' : 'orange.700'}>
                      Publication Status
                    </Heading>

                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel mb="0" fontWeight="bold" color="gray.900">
                          {formData.published ? '✅ Published' : '📝 Draft'}
                        </FormLabel>
                        <Text fontSize="xs" color="gray.600">
                          {formData.published
                            ? 'Post is visible to all visitors'
                            : 'Post is saved but not visible to visitors'}
                        </Text>
                      </Box>
                      <Switch
                        size="lg"
                        colorScheme={formData.published ? 'green' : 'orange'}
                        isChecked={formData.published}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            published: e.target.checked,
                          }))
                        }
                      />
                    </FormControl>

                    <Divider />

                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel mb="0" fontWeight="bold" color="gray.900">
                          {formData.featured ? '⭐ Featured' : 'Regular Post'}
                        </FormLabel>
                        <Text fontSize="xs" color="gray.600">
                          {formData.featured
                            ? 'Show on homepage featured section'
                            : 'Normal blog post'}
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="yellow"
                        isChecked={formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                      />
                    </FormControl>
                  </VStack>
                </Box>
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
    </AdminLayout>
  )
}
