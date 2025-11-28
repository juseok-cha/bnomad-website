import { getDictionary, isLocale, type Locale } from "@/lib/i18n/dictionaries"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react"
import Link from "next/link"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }]
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const fallbackLocale: Locale = "en"
  const locale = isLocale(lang) ? lang : fallbackLocale
  const dict = await getDictionary(locale)

  return (
    <Box bg="black" minH="100vh">
      {/* Hero Section */}
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
        <VStack
          minH="90vh"
          justify="center"
          align="flex-start"
          spacing={8}
          py={20}
        >
          <Box>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="brand.500"
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
              mb={4}
            >
              Venture Studio
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="800"
              lineHeight="1.1"
              color="white"
              maxW="1000px"
              mb={6}
            >
              Glocal Innovation
              <br />
              with Soul &{" "}
              <Text as="span" color="brand.500">
                Authenticity
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.400"
              maxW="700px"
              mb={8}
              lineHeight="1.8"
            >
              We bridge global innovation and local communities, creating meaningful ventures that honor both tradition and transformation.
            </Text>
          </Box>

          <HStack spacing={4} flexWrap="wrap">
            <Link href={`/${locale}/projects`}>
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                View Our Projects
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{
                  bg: "brand.500",
                  color: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              >
                Get in Touch
              </Button>
            </Link>
          </HStack>
        </VStack>

        {/* Stats Section */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={12}
          py={20}
          borderTop="1px"
          borderColor="dark.600"
        >
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.500">
              10+
            </Text>
            <Text fontSize="lg" color="gray.400">
              Active Projects
            </Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.500">
              5+
            </Text>
            <Text fontSize="lg" color="gray.400">
              Countries
            </Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.500">
              15+
            </Text>
            <Text fontSize="lg" color="gray.400">
              Global Partners
            </Text>
          </VStack>
        </SimpleGrid>

        {/* About Section */}
        <Box py={32}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
            <VStack align="flex-start" spacing={6}>
              <Text
                fontSize="sm"
                color="brand.500"
                fontWeight="600"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                About BNomad
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                Building Bridges Between Global Innovation and Local Wisdom
              </Heading>
            </VStack>

            <VStack align="flex-start" spacing={6}>
              <Text
                fontSize="lg"
                color="gray.400"
                lineHeight="1.8"
              >
                BNomad is a venture studio dedicated to creating meaningful innovations that honor both global standards and local authenticity. We believe in the power of "glocal" thinking—combining the best of global perspectives with deep respect for local communities and traditions.
              </Text>
              <Text
                fontSize="lg"
                color="gray.400"
                lineHeight="1.8"
              >
                Through our programs and projects, we foster cross-cultural collaboration, support entrepreneurial ventures, and build lasting connections between innovators worldwide.
              </Text>
              <Link href={`/${locale}/team`}>
                <Text
                  fontSize="md"
                  color="brand.500"
                  fontWeight="600"
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                >
                  Meet Our Team →
                </Text>
              </Link>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* CTA Section */}
        <Box py={32} textAlign="center" borderTop="1px" borderColor="dark.600">
          <VStack spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              maxW="800px"
            >
              Ready to Create Impact Together?
            </Heading>
            <Text
              fontSize="xl"
              color="gray.400"
              maxW="600px"
            >
              Let's explore how we can collaborate to bring your vision to life.
            </Text>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                px={12}
                py={6}
                fontSize="md"
                fontWeight="600"
                _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                Start a Conversation
              </Button>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
