'use client'

import { useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Text,
  Input,
  HStack,
  Icon,
  useToast,
  Image,
  Flex,
  IconButton,
  SimpleGrid,
  Badge,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { AttachmentIcon, CopyIcon, CheckIcon, DownloadIcon } from '@chakra-ui/icons'
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata } from 'firebase/storage'
import { storage } from '@/lib/firebase/config'
import AdminLayout from '@/components/admin/AdminLayout'

interface UploadedFile {
  name: string
  url: string
  uploadedAt: Date
  size: number
}

export default function AdminMedia() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const file = files[0]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file',
          status: 'error',
          duration: 3000,
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB',
          status: 'error',
          duration: 3000,
        })
        return
      }

      // Create a unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`
      const storageRef = ref(storage, `media/${filename}`)

      // Upload file
      await uploadBytes(storageRef, file)

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef)

      // Add to uploaded files list
      const newFile: UploadedFile = {
        name: filename,
        url: downloadURL,
        uploadedAt: new Date(),
        size: file.size,
      }

      setUploadedFiles([newFile, ...uploadedFiles])

      toast({
        title: 'Upload successful',
        description: 'Your image has been uploaded',
        status: 'success',
        duration: 3000,
      })

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast({
      title: 'URL copied',
      description: 'Image URL copied to clipboard',
      status: 'success',
      duration: 2000,
    })

    setTimeout(() => {
      setCopiedUrl(null)
    }, 2000)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="xl" mb={2}>Media Library</Heading>
              <Text color="gray.600">
                Upload and manage images for your blog posts
              </Text>
            </Box>
            <Badge colorScheme="blue" fontSize="md" px={3} py={2}>
              {uploadedFiles.length} Files
            </Badge>
          </Flex>

          {/* Upload Section */}
          <Box
            bg="white"
            p={8}
            rounded="lg"
            shadow="sm"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="gray.300"
            textAlign="center"
            cursor="pointer"
            _hover={{ borderColor: 'brand.500', bg: 'brand.50' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <VStack spacing={4}>
              <Icon as={AttachmentIcon} boxSize={12} color="brand.500" />
              <Box>
                <Text fontSize="lg" fontWeight="medium" mb={1}>
                  Click to upload image
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Supports JPG, PNG, GIF up to 5MB
                </Text>
              </Box>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                display="none"
              />
              <Button
                colorScheme="brand"
                isLoading={uploading}
                loadingText="Uploading..."
                leftIcon={<AttachmentIcon />}
              >
                Select File
              </Button>
            </VStack>
          </Box>

          {/* Uploaded Files Grid */}
          {uploadedFiles.length > 0 && (
            <Box>
              <Heading size="md" mb={4}>Recently Uploaded</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {uploadedFiles.map((file, index) => (
                  <Box
                    key={index}
                    bg="white"
                    rounded="lg"
                    shadow="sm"
                    overflow="hidden"
                    borderWidth="1px"
                    _hover={{ shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <Box
                      h="200px"
                      bg="gray.100"
                      position="relative"
                      overflow="hidden"
                    >
                      <Image
                        src={file.url}
                        alt={file.name}
                        objectFit="cover"
                        w="full"
                        h="full"
                      />
                    </Box>
                    <Box p={4}>
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1} mb={2}>
                        {file.name}
                      </Text>
                      <HStack justify="space-between" mb={3}>
                        <Text fontSize="xs" color="gray.500">
                          {formatFileSize(file.size)}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {file.uploadedAt.toLocaleDateString()}
                        </Text>
                      </HStack>
                      <InputGroup size="sm">
                        <Input
                          value={file.url}
                          readOnly
                          fontSize="xs"
                          pr="70px"
                        />
                        <InputRightElement width="60px">
                          <IconButton
                            aria-label="Copy URL"
                            icon={
                              copiedUrl === file.url ? (
                                <CheckIcon />
                              ) : (
                                <CopyIcon />
                              )
                            }
                            size="xs"
                            colorScheme={copiedUrl === file.url ? 'green' : 'gray'}
                            onClick={() => handleCopyUrl(file.url)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {uploadedFiles.length === 0 && !uploading && (
            <Box textAlign="center" py={10}>
              <Icon as={AttachmentIcon} boxSize={16} color="gray.300" mb={4} />
              <Text color="gray.500" fontSize="lg" fontWeight="medium">
                No files uploaded yet
              </Text>
              <Text color="gray.400" fontSize="sm">
                Upload your first image to get started
              </Text>
            </Box>
          )}

          {/* Info Box */}
          <Box bg="blue.50" p={4} rounded="lg" borderWidth="1px" borderColor="blue.200">
            <HStack spacing={3} align="flex-start">
              <Icon as={DownloadIcon} color="blue.500" mt={1} />
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="blue.900" mb={1}>
                  How to use uploaded images
                </Text>
                <Text fontSize="xs" color="blue.700">
                  1. Upload an image using the upload area above
                  <br />
                  2. Click the copy icon to copy the image URL
                  <br />
                  3. Paste the URL in the "Cover Image URL" field when creating or editing a blog post
                  <br />
                  4. You can also use the URL in markdown content: ![alt text](image-url)
                </Text>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </AdminLayout>
  )
}
