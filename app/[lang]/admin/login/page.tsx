'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  Text,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { resolveLangParam } from '@/lib/i18n/localeUtils'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()
  const routeParams = useParams<{ lang?: string | string[] }>()
  const lang = resolveLangParam(Array.isArray(routeParams?.lang) ? routeParams?.lang[0] : routeParams?.lang)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push(`/${lang}/admin/dashboard`)
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="radial-gradient(circle at 20% 20%, rgba(249,63,5,0.15), transparent 30%), radial-gradient(circle at 80% 0%, rgba(249,63,5,0.08), transparent 35%), #0a0a0a"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={16}
    >
      <Container maxW="md">
        <Box
          bg="rgba(15,15,15,0.85)"
          border="1px solid"
          borderColor="dark.600"
          rounded="2xl"
          shadow="xl"
          p={{ base: 6, md: 8 }}
          backdropFilter="blur(10px)"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={2} textAlign="center">
              <Text fontSize="sm" letterSpacing="wide" color="brand.500" textTransform="uppercase" fontWeight="700">
                Admin Access
              </Text>
              <Heading size="lg">Sign in to continue</Heading>
              <Text fontSize="sm" color="gray.400">
                Secure workspace for managing content and settings.
              </Text>
            </VStack>

            {error && (
              <Alert status="error" rounded="md" bg="rgba(255,0,0,0.05)" borderColor="red.500">
                <AlertIcon />
                <AlertDescription color="red.200">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.300">Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bnomad.io"
                    bg="dark.800"
                    borderColor="dark.600"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ borderColor: 'brand.500' }}
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    bg="dark.800"
                    borderColor="dark.600"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ borderColor: 'brand.500' }}
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  bg="brand.500"
                  color="black"
                  fontWeight="700"
                  _hover={{ bg: 'brand.600', transform: 'translateY(-1px)' }}
                  _active={{ bg: 'brand.700' }}
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
    </Box>
  )
}
