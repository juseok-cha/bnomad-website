'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useToast,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, AddIcon, ViewIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons'
import { getAllPosts, deletePost } from '@/lib/firebase/blogService'
import { BlogPost } from '@/lib/types/blog'
import AdminLayout from '@/components/admin/AdminLayout'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  featuredPosts: number
}

export default function AdminDashboard() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const fetchedPosts = await getAllPosts()
      setPosts(fetchedPosts)

      // Calculate stats
      const totalPosts = fetchedPosts.length
      const publishedPosts = fetchedPosts.filter(p => p.published).length
      const draftPosts = fetchedPosts.filter(p => !p.published).length
      const featuredPosts = fetchedPosts.filter(p => p.featured).length

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        featuredPosts,
      })
    } catch (error) {
      console.error('Error loading posts:', error)
      toast({
        title: 'Error loading posts',
        description: 'Failed to load blog posts',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      await deletePost(postId)
      toast({
        title: 'Post deleted',
        status: 'success',
        duration: 2000,
      })
      loadPosts()
    } catch (error) {
      toast({
        title: 'Error deleting post',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const StatCard = ({ label, value, icon, color, helpText }: any) => (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px">
      <Stat>
        <Flex justify="space-between" align="flex-start">
          <Box>
            <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
              {label}
            </StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold" color={color} mt={2}>
              {value}
            </StatNumber>
            {helpText && (
              <StatHelpText fontSize="xs" color="gray.500" mt={1}>
                {helpText}
              </StatHelpText>
            )}
          </Box>
          <Icon as={icon} boxSize={8} color={color} opacity={0.8} />
        </Flex>
      </Stat>
    </Box>
  )

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="xl" mb={2}>Dashboard</Heading>
              <Text color="gray.600">Welcome back! Here's your overview.</Text>
            </Box>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              size="lg"
              onClick={() => router.push(`/${lang}/admin/posts/new`)}
            >
              New Post
            </Button>
          </Flex>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard
              label="Total Posts"
              value={stats.totalPosts}
              icon={ChatIcon}
              color="blue.500"
              helpText="All blog posts"
            />
            <StatCard
              label="Published"
              value={stats.publishedPosts}
              icon={ViewIcon}
              color="green.500"
              helpText="Live on website"
            />
            <StatCard
              label="Drafts"
              value={stats.draftPosts}
              icon={EditIcon}
              color="orange.500"
              helpText="Not yet published"
            />
            <StatCard
              label="Featured"
              value={stats.featuredPosts}
              icon={EmailIcon}
              color="purple.500"
              helpText="Shown on homepage"
            />
          </SimpleGrid>

          {/* Recent Posts */}
          <Box>
            <Heading size="md" mb={4}>Recent Posts</Heading>
            <Box bg="white" rounded="lg" shadow="sm" overflow="hidden" borderWidth="1px">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Title (EN)</Th>
                    <Th>Category</Th>
                    <Th>Status</Th>
                    <Th>Featured</Th>
                    <Th>Published</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={10}>
                        <Text color="gray.500">Loading posts...</Text>
                      </Td>
                    </Tr>
                  ) : posts.length === 0 ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={10}>
                        <VStack spacing={3}>
                          <Icon as={ChatIcon} boxSize={12} color="gray.300" />
                          <Text color="gray.500" fontWeight="medium">
                            No posts yet
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            Create your first blog post to get started!
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="brand"
                            onClick={() => router.push(`/${lang}/admin/posts/new`)}
                          >
                            Create Post
                          </Button>
                        </VStack>
                      </Td>
                    </Tr>
                  ) : (
                    posts.slice(0, 10).map((post) => (
                      <Tr key={post.id} _hover={{ bg: 'gray.50' }}>
                        <Td fontWeight="medium">{post.title.en}</Td>
                        <Td>
                          <Badge colorScheme="purple">{post.category}</Badge>
                        </Td>
                        <Td>
                          <Badge colorScheme={post.published ? 'green' : 'gray'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </Td>
                        <Td>
                          {post.featured && <Badge colorScheme="yellow">Featured</Badge>}
                        </Td>
                        <Td fontSize="sm" color="gray.600">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : '-'}
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Edit post"
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="blue"
                              variant="ghost"
                              onClick={() =>
                                router.push(`/${lang}/admin/posts/${post.id}`)
                              }
                            />
                            <IconButton
                              aria-label="Delete post"
                              icon={<DeleteIcon />}
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => handleDelete(post.id)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>

            {posts.length > 10 && (
              <Flex justify="center" mt={4}>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/${lang}/admin/posts`)}
                >
                  View All Posts ({posts.length})
                </Button>
              </Flex>
            )}
          </Box>
        </VStack>
      </Container>
    </AdminLayout>
  )
}
