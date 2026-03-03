'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { useParams } from 'next/navigation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const routingParams = useParams<{ lang?: string | string[] }>()
  const langParam = Array.isArray(routingParams?.lang)
    ? routingParams?.lang[0]
    : routingParams?.lang
  const lang = langParam === 'ko' ? 'ko' : 'en'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: lang === 'en' ? 'Missing fields' : '필수 항목 누락',
        description:
          lang === 'en'
            ? 'Please fill in all required fields'
            : '모든 필수 항목을 입력해주세요',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setLoading(true)

    try {
      const contactsRef = collection(db, 'contacts')
      await addDoc(contactsRef, {
        ...formData,
        createdAt: Timestamp.now(),
        lang: lang,
      })

      toast({
        title: lang === 'en' ? 'Message sent!' : '메시지 전송 완료!',
        description:
          lang === 'en'
            ? 'Thank you for reaching out. We will get back to you soon.'
            : '문의해 주셔서 감사합니다. 곧 연락드리겠습니다.',
        status: 'success',
        duration: 5000,
      })

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: lang === 'en' ? 'Error' : '오류',
        description:
          lang === 'en'
            ? 'Failed to send message. Please try again.'
            : '메시지 전송에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg="black" minH="100vh" color="white">
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }} py={32}>
        {/* Hero Section */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={20} alignItems="center">
          <VStack spacing={6} align="flex-start">
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {lang === 'en' ? 'Contact' : '문의'}
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              color="white"
            >
              {lang === 'en' ? 'Get in Touch' : '문의하기'}
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.400" maxW="700px" lineHeight="1.8">
              {lang === 'en'
                ? "Have questions or want to collaborate? We'd love to hear from you."
                : '질문이 있거나 협력을 원하시나요? 여러분의 이야기를 듣고 싶습니다.'}
            </Text>
            <Text color="gray.500">
              {lang === 'en'
                ? 'We usually reply within 2 business days.'
                : '영업일 기준 2일 이내로 답변드립니다.'}
            </Text>
          </VStack>

          <Box
            borderRadius="2xl"
            overflow="hidden"
            border="1px"
            borderColor="dark.600"
            bgImage="linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80)"
            bgSize="cover"
            bgPosition="center"
            minH="320px"
          />
        </SimpleGrid>

        {/* Photo Section */}
        <Box mb={20}>
          <Box
            w="full"
            h={{ base: "300px", md: "500px" }}
            bg="dark.800"
            border="1px"
            borderColor="dark.600"
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={4}
            >
              <Text fontSize="5xl">🏝️</Text>
              <Text color="gray.600" fontSize="lg" fontWeight="600">
                {lang === 'en' ? 'Jeju Sehwa House' : '제주 세화 하우스'}
              </Text>
              <Text color="gray.700" fontSize="sm">
                {lang === 'en' ? '(Photo placeholder)' : '(사진 자리)'}
              </Text>
            </Box>
          </Box>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
          {/* Contact Form */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Heading as="h2" fontSize="2xl" color="white">
                {lang === 'en' ? 'Send us a message' : '메시지 보내기'}
              </Heading>

              <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontWeight="500">
                      {lang === 'en' ? 'Name' : '이름'}
                    </FormLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder={lang === 'en' ? 'Your name' : '이름을 입력하세요'}
                      bg="dark.800"
                      border="1px"
                      borderColor="dark.600"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.500' }}
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontWeight="500">
                      {lang === 'en' ? 'Email' : '이메일'}
                    </FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder={
                        lang === 'en' ? 'your@email.com' : '이메일을 입력하세요'
                      }
                      bg="dark.800"
                      border="1px"
                      borderColor="dark.600"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.500' }}
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                      size="lg"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.400" fontWeight="500">
                      {lang === 'en' ? 'Subject' : '제목'}
                    </FormLabel>
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder={lang === 'en' ? 'Subject' : '제목을 입력하세요'}
                      bg="dark.800"
                      border="1px"
                      borderColor="dark.600"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.500' }}
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontWeight="500">
                      {lang === 'en' ? 'Message' : '메시지'}
                    </FormLabel>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder={
                        lang === 'en'
                          ? 'Tell us more about your inquiry...'
                          : '문의 내용을 입력하세요...'
                      }
                      rows={6}
                      bg="dark.800"
                      border="1px"
                      borderColor="dark.600"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.500' }}
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #F93F05' }}
                      size="lg"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    bg="brand.500"
                    color="white"
                    size="lg"
                    px={12}
                    py={6}
                    fontSize="md"
                    fontWeight="600"
                    _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                    isLoading={loading}
                    loadingText={lang === 'en' ? 'Sending...' : '전송 중...'}
                  >
                    {lang === 'en' ? 'Send Message' : '메시지 보내기'}
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>

          {/* Contact Info */}
          <VStack spacing={8} align="stretch">
            <Heading as="h2" fontSize="2xl" color="white">
              {lang === 'en' ? 'Other ways to reach us' : '다른 연락 방법'}
            </Heading>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="lg"
            >
              <HStack spacing={4} align="start">
                <EmailIcon color="brand.500" boxSize={6} mt={1} />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="600" fontSize="lg" color="white">
                    {lang === 'en' ? 'Email' : '이메일'}
                  </Text>
                  <ChakraLink
                    href="mailto:info@bnomad.co"
                    color="brand.500"
                    fontSize="lg"
                    _hover={{ color: 'brand.400' }}
                  >
                    info@bnomad.co
                  </ChakraLink>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="dark.600"
              borderRadius="lg"
            >
              <VStack align="start" spacing={4}>
                <Text fontWeight="600" fontSize="lg" color="white">
                  {lang === 'en' ? 'Follow Us' : '팔로우하기'}
                </Text>
                <VStack align="start" spacing={3}>
                  <ChakraLink
                    href="https://instagram.com/bnomad.co"
                    isExternal
                    color="gray.400"
                    fontSize="lg"
                    display="flex"
                    alignItems="center"
                    _hover={{ color: 'brand.500' }}
                    transition="color 0.2s"
                  >
                    Instagram <ExternalLinkIcon ml={2} />
                  </ChakraLink>
                  <ChakraLink
                    href="https://www.linkedin.com/company/bnomad-inc/?viewAsMember=true"
                    isExternal
                    color="gray.400"
                    fontSize="lg"
                    display="flex"
                    alignItems="center"
                    _hover={{ color: 'brand.500' }}
                    transition="color 0.2s"
                  >
                    LinkedIn <ExternalLinkIcon ml={2} />
                  </ChakraLink>
                </VStack>
              </VStack>
            </Box>

            <Box
              p={8}
              bg="dark.800"
              border="1px"
              borderColor="brand.500"
              borderRadius="lg"
            >
              <VStack align="start" spacing={3}>
                <Heading as="h3" fontSize="xl" color="brand.500">
                  {lang === 'en' ? 'Jeju Sehwa House' : '제주 세화 하우스'}
                </Heading>
                <Text color="gray.400" lineHeight="1.7">
                  {lang === 'en'
                    ? 'Visit our home base in Jeju for programs and community events.'
                    : '프로그램 및 커뮤니티 이벤트를 위해 제주에 있는 우리의 베이스캠프를 방문하세요.'}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
