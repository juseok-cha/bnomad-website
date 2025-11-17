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
  Card,
  CardBody,
  useToast,
  useColorModeValue,
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
    <>
      {/* Hero Section */}
      <Box bg="brand.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="brand.700">
              {lang === 'en' ? 'Get in Touch' : '문의하기'}
            </Heading>
            <Text fontSize="xl" color="gray.700" maxW="2xl">
              {lang === 'en'
                ? "Have questions or want to collaborate? We'd love to hear from you."
                : '질문이 있거나 협력을 원하시나요? 여러분의 이야기를 듣고 싶습니다.'}
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Contact Form */}
          <Box>
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color="brand.600">
                {lang === 'en' ? 'Send us a message' : '메시지 보내기'}
              </Heading>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>{lang === 'en' ? 'Name' : '이름'}</FormLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder={lang === 'en' ? 'Your name' : '이름을 입력하세요'}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{lang === 'en' ? 'Email' : '이메일'}</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder={
                        lang === 'en' ? 'your@email.com' : '이메일을 입력하세요'
                      }
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{lang === 'en' ? 'Subject' : '제목'}</FormLabel>
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder={lang === 'en' ? 'Subject' : '제목을 입력하세요'}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{lang === 'en' ? 'Message' : '메시지'}</FormLabel>
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
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
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
          <VStack spacing={6} align="stretch">
            <Heading size="lg" color="brand.600">
              {lang === 'en' ? 'Other ways to reach us' : '다른 연락 방법'}
            </Heading>

            <Card bg={useColorModeValue('white', 'gray.800')} shadow="lg">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <HStack>
                    <EmailIcon color="brand.600" boxSize={5} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold">
                        {lang === 'en' ? 'Email' : '이메일'}
                      </Text>
                      <ChakraLink
                        href="mailto:info@bnomad.co"
                        color="brand.600"
                        isExternal
                      >
                        info@bnomad.co
                      </ChakraLink>
                    </VStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={useColorModeValue('white', 'gray.800')} shadow="lg">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="semibold" fontSize="lg">
                    {lang === 'en' ? 'Follow Us' : '팔로우하기'}
                  </Text>
                  <VStack align="start" spacing={3}>
                    <ChakraLink
                      href="https://instagram.com/bnomad.co"
                      isExternal
                      color="brand.600"
                      display="flex"
                      alignItems="center"
                    >
                      Instagram <ExternalLinkIcon ml={2} />
                    </ChakraLink>
                    <ChakraLink
                      href="https://www.linkedin.com/company/bnomad-inc/?viewAsMember=true"
                      isExternal
                      color="brand.600"
                      display="flex"
                      alignItems="center"
                    >
                      LinkedIn <ExternalLinkIcon ml={2} />
                    </ChakraLink>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card bg="brand.50" shadow="lg">
              <CardBody>
                <VStack align="start" spacing={3}>
                  <Heading size="md" color="brand.700">
                    {lang === 'en' ? 'Jeju Sehwa House' : '제주 세화 하우스'}
                  </Heading>
                  <Text color="gray.700">
                    {lang === 'en'
                      ? 'Visit our home base in Jeju for programs and community events.'
                      : '프로그램 및 커뮤니티 이벤트를 위해 제주에 있는 우리의 베이스캠프를 방문하세요.'}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Container>
    </>
  )
}
