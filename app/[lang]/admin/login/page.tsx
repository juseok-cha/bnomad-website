'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function AdminLogin({ params }: { params: { lang: string } }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push(`/${params.lang}/admin/dashboard`)
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="md" py={20}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
        rounded="xl"
        shadow="lg"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="xl" color="brand.600">
            Admin Login
          </Heading>

          {error && (
            <Alert status="error" rounded="md">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bnomad.io"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                width="full"
                size="lg"
                isLoading={loading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  )
}
