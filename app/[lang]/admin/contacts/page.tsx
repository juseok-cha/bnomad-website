'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import AdminLayout from '@/components/admin/AdminLayout'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

export default function AdminContacts() {
  const params = useParams()
  const lang = params?.lang as string || 'en'
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      setLoading(true)
      const contactsRef = collection(db, 'contacts')
      const q = query(contactsRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)

      const contactsData: Contact[] = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          subject: data.subject || '',
          message: data.message || '',
          createdAt: data.createdAt?.toDate() || new Date(),
        }
      })

      setContacts(contactsData)
    } catch (error) {
      console.error('Error loading contacts:', error)
      toast({
        title: 'Error loading contacts',
        description: 'Failed to load contact submissions',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    onOpen()
  }

  return (
    <AdminLayout lang={lang}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="xl" mb={2}>Contact Submissions</Heading>
              <Text color="gray.600">
                View and manage contact form submissions
              </Text>
            </Box>
            <Badge colorScheme="blue" fontSize="md" px={3} py={2}>
              {contacts.length} Total
            </Badge>
          </Flex>

          <Box bg="white" rounded="lg" shadow="sm" overflow="hidden" borderWidth="1px">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Subject</Th>
                  <Th>Date</Th>
                  <Th>Message</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={10}>
                      <Text color="gray.500">Loading contacts...</Text>
                    </Td>
                  </Tr>
                ) : contacts.length === 0 ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={10}>
                      <VStack spacing={3}>
                        <Icon as={EmailIcon} boxSize={12} color="gray.300" />
                        <Text color="gray.500" fontWeight="medium">
                          No contact submissions yet
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          Contact form submissions will appear here
                        </Text>
                      </VStack>
                    </Td>
                  </Tr>
                ) : (
                  contacts.map((contact) => (
                    <Tr
                      key={contact.id}
                      _hover={{ bg: 'gray.50', cursor: 'pointer' }}
                      onClick={() => handleViewContact(contact)}
                    >
                      <Td fontWeight="medium">{contact.name}</Td>
                      <Td>{contact.email}</Td>
                      <Td>
                        <Text noOfLines={1} maxW="200px">
                          {contact.subject}
                        </Text>
                      </Td>
                      <Td fontSize="sm" color="gray.600">
                        {contact.createdAt.toLocaleDateString()}
                      </Td>
                      <Td>
                        <Text noOfLines={2} maxW="300px" fontSize="sm" color="gray.600">
                          {contact.message}
                        </Text>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>

      {/* Contact Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Submission Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedContact && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Name
                  </Text>
                  <Text fontSize="lg">{selectedContact.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Email
                  </Text>
                  <Text fontSize="lg" color="brand.500">
                    <a href={`mailto:${selectedContact.email}`}>
                      {selectedContact.email}
                    </a>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Subject
                  </Text>
                  <Text fontSize="lg">{selectedContact.subject}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Date
                  </Text>
                  <Text>
                    {selectedContact.createdAt.toLocaleDateString()} at{' '}
                    {selectedContact.createdAt.toLocaleTimeString()}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={2}>
                    Message
                  </Text>
                  <Box
                    p={4}
                    bg="gray.50"
                    rounded="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Text whiteSpace="pre-wrap">{selectedContact.message}</Text>
                  </Box>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdminLayout>
  )
}
