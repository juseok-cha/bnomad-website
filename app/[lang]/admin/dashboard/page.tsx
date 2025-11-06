'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
  Spinner,
  Text,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/contexts/AuthContext'
import { getAllPosts, deletePost } from '@/lib/firebase/blogService'
import { BlogPost } from '@/lib/types/blog'

export default function AdminDashboard({ params }: { params: { lang: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (!user) {
      router.push(`/${params.lang}/admin/login`)
      return
    }

    loadPosts()
  }, [user, router, params.lang])

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

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push(`/${params.lang}/admin/login`)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Loading dashboard...</Text>
        </VStack>
      </Container>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl">Blog Admin Dashboard</Heading>
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              onClick={() => router.push(`/${params.lang}/admin/posts/new`)}
            >
              New Post
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </HStack>
        </HStack>

        <Box bg="white" rounded="lg" shadow="md" overflow="hidden">
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
              {posts.length === 0 ? (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={10}>
                    <Text color="gray.500">No posts yet. Create your first post!</Text>
                  </Td>
                </Tr>
              ) : (
                posts.map((post) => (
                  <Tr key={post.id}>
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
                    <Td>
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
                          onClick={() =>
                            router.push(`/${params.lang}/admin/posts/${post.id}`)
                          }
                        />
                        <IconButton
                          aria-label="Delete post"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
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
  )
}
