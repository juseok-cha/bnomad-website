import { storage } from './config'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

// Upload image to Firebase Storage
export async function uploadImage(
  file: File,
  path: string = 'blog-images'
): Promise<string> {
  try {
    // Create a unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    const fullPath = `${path}/${fileName}`

    // Create a storage reference
    const storageRef = ref(storage, fullPath)

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    })

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

// Upload multiple images
export async function uploadImages(
  files: File[],
  path: string = 'blog-images'
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, path))
    const urls = await Promise.all(uploadPromises)
    return urls
  } catch (error) {
    console.error('Error uploading images:', error)
    throw new Error('Failed to upload images')
  }
}

// Delete image from Firebase Storage
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract the path from the URL
    const urlParts = imageUrl.split('/o/')
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL')
    }

    const pathPart = urlParts[1].split('?')[0]
    const decodedPath = decodeURIComponent(pathPart)

    const storageRef = ref(storage, decodedPath)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}

// Validate image file
export function validateImageFile(file: File): {
  valid: boolean
  error?: string
} {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File is too large. Maximum size is 5MB.',
    }
  }

  return { valid: true }
}
