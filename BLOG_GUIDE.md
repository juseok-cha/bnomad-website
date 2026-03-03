# BNOMAD Blog Admin Guide

This guide explains how to use the blog administration features including creating/editing posts with images and RSS feed.

## Features

- ✅ Create and edit blog posts in English and Korean
- ✅ Upload cover images and content images to Firebase Storage
- ✅ Markdown support for rich text formatting
- ✅ Image management with drag-and-drop upload
- ✅ RSS feed generation for both languages
- ✅ Category and tag management
- ✅ Draft and publish workflow
- ✅ Featured posts

## Accessing the Admin Panel

1. Navigate to `/en/admin/login` or `/ko/admin/login`
2. Sign in with your admin credentials
3. Access the blog management at `/en/admin/posts` or `/ko/admin/posts`

## Creating a New Blog Post

1. Go to Admin Panel → Blog Posts
2. Click "New Post" button
3. Fill in the required fields:

### English Tab
- **Title (English)** - Required
- **Content (English)** - Required, supports Markdown
- **Excerpt (English)** - Optional short summary

### Korean Tab
- **Title (Korean)** - Optional
- **Content (Korean)** - Optional, supports Markdown
- **Excerpt (Korean)** - Optional short summary

### Post Settings
- **URL Slug** - Auto-generated from English title, can be customized
- **Category** - Choose from: Journey, Insights, Reflections, Reports
- **Tags** - Comma-separated tags (e.g., "innovation, community, collaboration")
- **Cover Image** - Upload or paste URL
- **Featured** - Toggle to feature on homepage
- **Publish** - Toggle to publish immediately or save as draft

## Uploading Images

### Cover Image
1. Click "Upload Cover Image" button in Post Settings
2. Select an image file (Max 5MB, JPEG/PNG/GIF/WebP)
3. Image will be uploaded to Firebase Storage
4. Preview appears with option to remove

### Content Images
1. Click "Insert Image" button above the content textarea
2. Select an image file
3. Markdown code is automatically copied to clipboard
4. Paste the markdown code into your content where you want the image

Example markdown for images:
```markdown
![Image description](https://firebase-url.com/image.jpg)
```

## Editing Existing Posts

1. Go to Admin Panel → Blog Posts
2. Find the post in the list
3. Click the edit icon (pencil)
4. Make your changes
5. Click "Save Changes"

## Markdown Formatting Guide

The blog content supports full Markdown syntax:

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](image-url.jpg)
```

### Lists
```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Blockquotes
```markdown
> This is a quote
```

### Code
```markdown
Inline `code` with backticks

```javascript
// Code block
function example() {
  return "Hello World"
}
```
```

### Horizontal Rule
```markdown
---
```

## RSS Feed

The blog automatically generates RSS feeds in both languages:

- **English RSS Feed**: `https://yoursite.com/rss.xml`
- **Korean RSS Feed**: `https://yoursite.com/rss-ko.xml`

RSS feeds are automatically updated when you publish new posts. They include:
- Post title
- Publication date
- Excerpt/description
- Author information
- Categories and tags
- Cover image (if available)

### Adding RSS to Your Site

The RSS feeds are automatically linked in the HTML `<head>` so RSS readers can auto-discover them. Users can subscribe using:
- RSS readers (Feedly, Inoreader, etc.)
- News aggregators
- Email newsletter services

## Managing Posts

### Filtering Posts
Use the filters at the top of the posts list:
- **Search** - Search by title, slug, or tags
- **Category** - Filter by category
- **Status** - Filter by Published, Draft, or Featured

### Post Actions
- **View** (eye icon) - Preview published post
- **Edit** (pencil icon) - Edit the post
- **Delete** (trash icon) - Delete the post (with confirmation)

## Best Practices

1. **Always fill in English content** - It's required and used as fallback
2. **Write compelling excerpts** - These appear in post previews and RSS feeds
3. **Use meaningful slugs** - Keep URLs clean and SEO-friendly
4. **Optimize images** - Keep images under 5MB for faster loading
5. **Use categories consistently** - Helps readers find related content
6. **Add relevant tags** - Improves discoverability
7. **Preview before publishing** - Check formatting in published view

## Image Storage

Images are stored in Firebase Storage with the following structure:
- `/blog-covers/` - Cover images
- `/blog-content/` - Content images

Each image filename is generated with a timestamp and random string to prevent conflicts.

## Troubleshooting

### Image Upload Fails
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, GIF, WebP only)
- Ensure Firebase Storage is properly configured

### Post Not Appearing
- Check if post is published (not draft)
- Verify required fields (English title and content)
- Check publication date

### RSS Feed Not Updating
- RSS feeds are cached for 1 hour
- Wait or clear your RSS reader cache
- Verify posts are published (not drafts)

## Technical Details

- **Frontend**: Next.js 16 with React 19
- **UI Framework**: Chakra UI
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Markdown Parser**: react-markdown
- **Syntax Highlighting**: react-syntax-highlighter

## Support

For technical issues or questions, check:
- Firebase Console for storage and database issues
- Browser console for error messages
- Network tab for upload failures
