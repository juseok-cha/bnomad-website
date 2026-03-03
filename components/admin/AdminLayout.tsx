'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, Spinner, VStack, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/contexts/AuthContext'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
  lang: string
}

export default function AdminLayout({ children, lang }: AdminLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/admin/login`)
    }
  }, [user, loading, router, lang])

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={4} color="white">
          <Spinner size="xl" color="brand.500" />
          <Text>Loading...</Text>
        </VStack>
      </Container>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Box minH="100vh" bg="black" color="white">
      <AdminSidebar lang={lang} />
      <Box ml="260px" minH="100vh" bg="dark.900" color="white" borderLeft="1px" borderColor="dark.700">
        {children}
      </Box>
    </Box>
  )
}
