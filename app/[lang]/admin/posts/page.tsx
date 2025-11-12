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
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, AddIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
import { getAllPosts, deletePost } from '@/lib/firebase/blogService'
import { BlogPost } from '@/lib/types/blog'
import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminPosts() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchQuery, categoryFilter, statusFilter])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const fetchedPosts = await getAllPosts()
      setPosts(fetchedPosts)
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

  const filterPosts = () => {
    let filtered = [...posts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.en.toLowerCase().includes(query) ||
          post.title.ko.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((post) => post.category === categoryFilter)
    }

    // Status filter
    if (statusFilter === 'published') {
      filtered = filtered.filter((post) => post.published)
    } else if (statusFilter === 'draft') {
      filtered = filtered.filter((post) => !post.published)
    } else if (statusFilter === 'featured') {
      filtered = filtered.filter((post) => post.featured)
    }

    setFilteredPosts(filtered)
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

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="xl" mb={2}>Blog Posts</Heading>
              <Text color="gray.600">
                Manage all your blog posts ({filteredPosts.length} of {posts.length})
              </Text>
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

          {/* Filters */}
          <Box bg="white" p={4} rounded="lg" shadow="sm" borderWidth="1px">
            <HStack spacing={4}>
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={SearchIcon} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search by title, slug, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>

              <Select
                maxW="200px"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="journey">Journey</option>
                <option value="insights">Insights</option>
                <option value="reflections">Reflections</option>
                <option value="reports">Reports</option>
              </Select>

              <Select
                maxW="200px"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="featured">Featured</option>
              </Select>

              {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('all')
                    setStatusFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </HStack>
          </Box>

          {/* Posts Table */}
          <Box bg="white" rounded="lg" shadow="sm" overflow="hidden" borderWidth="1px">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Title (EN)</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Tags</Th>
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
                ) : filteredPosts.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} textAlign="center" py={10}>
                      <VStack spacing={3}>
                        <Icon as={ViewIcon} boxSize={12} color="gray.300" />
                        <Text color="gray.500" fontWeight="medium">
                          {posts.length === 0
                            ? 'No posts yet'
                            : 'No posts match your filters'}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          {posts.length === 0
                            ? 'Create your first blog post to get started!'
                            : 'Try adjusting your search or filters'}
                        </Text>
                      </VStack>
                    </Td>
                  </Tr>
                ) : (
                  filteredPosts.map((post) => (
                    <Tr key={post.id} _hover={{ bg: 'gray.50' }}>
                      <Td>
                        <Text fontWeight="medium" noOfLines={1}>
                          {post.title.en}
                        </Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>
                          /{post.slug}
                        </Text>
                      </Td>
                      <Td>
                        <Badge colorScheme="purple">{post.category}</Badge>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <Badge colorScheme={post.published ? 'green' : 'gray'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                          {post.featured && (
                            <Badge colorScheme="yellow" fontSize="xx-small">
                              ★
                            </Badge>
                          )}
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={1} flexWrap="wrap">
                          {post.tags.slice(0, 2).map((tag, i) => (
                            <Badge key={i} size="sm" colorScheme="blue" fontSize="xx-small">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge size="sm" fontSize="xx-small">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </HStack>
                      </Td>
                      <Td fontSize="sm" color="gray.600">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : '-'}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          {post.published && (
                            <IconButton
                              aria-label="View post"
                              icon={<ViewIcon />}
                              size="sm"
                              colorScheme="green"
                              variant="ghost"
                              onClick={() =>
                                window.open(`/${lang}/blog/${post.slug}`, '_blank')
                              }
                            />
                          )}
                          <IconButton
                            aria-label="Edit post"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => router.push(`/${lang}/admin/posts/${post.id}`)}
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
        </VStack>
      </Container>
    </AdminLayout>
  )
}
