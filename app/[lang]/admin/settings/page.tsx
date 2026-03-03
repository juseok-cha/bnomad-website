'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Divider,
  HStack,
  Icon,
  Avatar,
  Badge,
  Code,
} from '@chakra-ui/react'
import { EmailIcon, LockIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/contexts/AuthContext'
import { updateProfile } from 'firebase/auth'
import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminSettings() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [updating, setUpdating] = useState(false)
  const toast = useToast()

  const handleUpdateProfile = async () => {
    if (!user) return

    setUpdating(true)
    try {
      await updateProfile(user, {
        displayName: displayName,
      })

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Update failed',
        description: 'Failed to update profile',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="xl" mb={2}>Settings</Heading>
            <Text color="gray.600">Manage your admin account settings</Text>
          </Box>

          {/* Account Information */}
          <Box bg="white" p={6} rounded="lg" shadow="sm" borderWidth="1px">
            <HStack spacing={4} mb={6}>
              <Avatar size="lg" name={user?.displayName || user?.email || ''} />
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {user?.displayName || 'Admin'}
                </Text>
                <Text color="gray.600">{user?.email}</Text>
                <Badge colorScheme="green" mt={1}>
                  {user?.emailVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </Box>
            </HStack>

            <Divider mb={6} />

            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Display Name</FormLabel>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={user?.email || ''} isDisabled />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Email cannot be changed from here
                </Text>
              </FormControl>

              <Button
                colorScheme="brand"
                onClick={handleUpdateProfile}
                isLoading={updating}
                loadingText="Updating..."
              >
                Update Profile
              </Button>
            </VStack>
          </Box>

          {/* Firebase Information */}
          <Box bg="white" p={6} rounded="lg" shadow="sm" borderWidth="1px">
            <HStack mb={4}>
              <Icon as={InfoIcon} color="blue.500" />
              <Heading size="md">Firebase Configuration</Heading>
            </HStack>

            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                  Project ID
                </Text>
                <Code fontSize="sm" p={2} rounded="md" w="full">
                  {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not configured'}
                </Code>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                  Auth Domain
                </Text>
                <Code fontSize="sm" p={2} rounded="md" w="full">
                  {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not configured'}
                </Code>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                  Storage Bucket
                </Text>
                <Code fontSize="sm" p={2} rounded="md" w="full">
                  {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'Not configured'}
                </Code>
              </Box>
            </VStack>
          </Box>

          {/* Admin Capabilities */}
          <Box bg="white" p={6} rounded="lg" shadow="sm" borderWidth="1px">
            <HStack mb={4}>
              <Icon as={LockIcon} color="purple.500" />
              <Heading size="md">Admin Capabilities</Heading>
            </HStack>

            <VStack spacing={3} align="stretch">
              <HStack>
                <Icon as={EmailIcon} color="green.500" />
                <Text fontSize="sm">Manage blog posts (create, edit, delete)</Text>
              </HStack>
              <HStack>
                <Icon as={EmailIcon} color="green.500" />
                <Text fontSize="sm">View contact form submissions</Text>
              </HStack>
              <HStack>
                <Icon as={EmailIcon} color="green.500" />
                <Text fontSize="sm">Upload and manage media files</Text>
              </HStack>
              <HStack>
                <Icon as={EmailIcon} color="green.500" />
                <Text fontSize="sm">Access admin dashboard and analytics</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Security Information */}
          <Box bg="yellow.50" p={6} rounded="lg" borderWidth="1px" borderColor="yellow.200">
            <HStack spacing={3} align="flex-start">
              <Icon as={WarningIcon} color="yellow.600" mt={1} />
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="yellow.900" mb={2}>
                  Security Best Practices
                </Text>
                <VStack spacing={1} align="flex-start">
                  <Text fontSize="xs" color="yellow.800">
                    • Use a strong, unique password for your admin account
                  </Text>
                  <Text fontSize="xs" color="yellow.800">
                    • Never share your login credentials
                  </Text>
                  <Text fontSize="xs" color="yellow.800">
                    • Always sign out after using the admin panel
                  </Text>
                  <Text fontSize="xs" color="yellow.800">
                    • Keep your Firebase configuration secure
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </Box>

          {/* Useful Links */}
          <Box bg="blue.50" p={6} rounded="lg" borderWidth="1px" borderColor="blue.200">
            <Heading size="sm" mb={3} color="blue.900">
              Useful Resources
            </Heading>
            <VStack spacing={2} align="flex-start">
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text fontSize="sm" color="blue.600" _hover={{ textDecoration: 'underline' }}>
                  → Firebase Console
                </Text>
              </a>
              <a
                href={`/${lang}/blog`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text fontSize="sm" color="blue.600" _hover={{ textDecoration: 'underline' }}>
                  → View Public Blog
                </Text>
              </a>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text fontSize="sm" color="blue.600" _hover={{ textDecoration: 'underline' }}>
                  → Markdown Syntax Guide
                </Text>
              </a>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </AdminLayout>
  )
}
