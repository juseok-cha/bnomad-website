import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore'
import { db } from './config'
import { BlogPost, BlogPostInput } from '@/lib/types/blog'

const BLOG_COLLECTION = 'blogPosts'

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate()
  }
  return new Date(timestamp)
}

// Get all published blog posts
export async function getPublishedPosts(
  lang: 'en' | 'ko',
  limitCount: number = 10
): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, BLOG_COLLECTION)
    const q = query(
      postsRef,
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as BlogPost
    })
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

// Get featured posts for homepage
export async function getFeaturedPosts(limitCount: number = 3): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, BLOG_COLLECTION)
    const q = query(
      postsRef,
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as BlogPost
    })
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, BLOG_COLLECTION)
    const q = query(postsRef, where('slug', '==', slug), limit(1))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      publishedAt: convertTimestamp(data.publishedAt),
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as BlogPost
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

// Get all posts (admin only)
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, BLOG_COLLECTION)
    const q = query(postsRef, orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as BlogPost
    })
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

// Create a new blog post
export async function createPost(
  postData: BlogPostInput,
  authorEmail: string,
  authorName: string
): Promise<string> {
  try {
    const now = Timestamp.now()
    const postsRef = collection(db, BLOG_COLLECTION)

    const newPost = {
      ...postData,
      author: {
        email: authorEmail,
        name: authorName,
      },
      publishedAt: postData.published ? now : null,
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await addDoc(postsRef, newPost)
    return docRef.id
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Update a blog post
export async function updatePost(postId: string, postData: Partial<BlogPostInput>): Promise<void> {
  try {
    const postRef = doc(db, BLOG_COLLECTION, postId)
    const updateData: any = {
      ...postData,
      updatedAt: Timestamp.now(),
    }

    // If publishing for the first time
    if (postData.published) {
      const postDoc = await getDoc(postRef)
      if (postDoc.exists() && !postDoc.data().publishedAt) {
        updateData.publishedAt = Timestamp.now()
      }
    }

    await updateDoc(postRef, updateData)
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

// Delete a blog post
export async function deletePost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, BLOG_COLLECTION, postId)
    await deleteDoc(postRef)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Get posts by category
export async function getPostsByCategory(
  category: string,
  limitCount: number = 10
): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, BLOG_COLLECTION)
    const q = query(
      postsRef,
      where('published', '==', true),
      where('category', '==', category),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as BlogPost
    })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}
