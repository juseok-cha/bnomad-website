# 📝 How to Publish a Blog Post - Step by Step Guide

This guide will walk you through the complete process of creating and publishing a blog post on the BNOMAD website.

## 🎯 Quick Start (5 Steps)

1. **Login** to admin panel
2. **Create** a new post
3. **Write** your content
4. **Upload** images
5. **Publish** the post

---

## 📋 Detailed Step-by-Step Guide

### Step 1: Access the Admin Panel

1. Open your browser and go to:
   - English: `https://yoursite.com/en/admin/login`
   - Korean: `https://yoursite.com/ko/admin/login`

2. Sign in with your admin credentials

3. Click on **"Blog Posts"** in the admin menu

### Step 2: Create a New Post

1. Click the **"New Post"** button (top right)

2. You'll see the blog editor with two main sections:
   - **Content Tabs** (English/Korean)
   - **Post Settings** (below the tabs)

### Step 3: Write Your Content

#### English Tab

1. **Title (English)** ⭐ Required
   - Write a clear, compelling title
   - This will auto-generate the URL slug
   - Example: "Our Journey to Building Glocal Communities"

2. **Content (English)** ⭐ Required
   - Write your post using Markdown formatting
   - The text is now **dark and easy to read**
   - See Markdown tips below

3. **Excerpt (English)** (Optional)
   - Write 1-2 sentences summarizing your post
   - This appears in blog listings and RSS feeds
   - Example: "Discover how we're bridging global innovation with local traditions..."

#### Korean Tab

1. **Title (Korean)** (Optional but recommended)
   - Korean version of your title
   - Example: "글로컬 커뮤니티 구축의 여정"

2. **Content (Korean)** (Optional but recommended)
   - Korean version of your content
   - Use the same Markdown formatting

3. **Excerpt (Korean)** (Optional)
   - Korean summary of your post

### Step 4: Upload Images

#### Cover Image (Recommended)

1. Scroll down to **Post Settings** section

2. Find the **"Cover Image"** field

3. Click **"Upload Cover Image"** button

4. Select an image file from your computer
   - Maximum size: 5MB
   - Formats: JPEG, PNG, GIF, WebP

5. Wait for the progress bar to complete

6. Preview appears - you can remove it with the ❌ button if needed

**Tip:** Cover images appear at the top of your blog post and in social media previews!

#### Content Images (For images inside your blog post)

1. Go back to the **Content** field (English or Korean tab)

2. Click the **"Insert Image"** button above the textarea

3. Select an image file

4. Wait for upload to complete

5. The markdown code is **automatically copied to your clipboard**!

6. **Paste it** into your content where you want the image:
   ```markdown
   ![Image description](https://firebase-url.com/image.jpg)
   ```

**Pro Tip:** You can upload multiple images - just repeat steps 2-6 for each image!

### Step 5: Configure Post Settings

Scroll down to the **Post Settings** section:

#### URL Slug
- Auto-generated from English title
- You can customize it (use lowercase, hyphens only)
- Example: `building-glocal-communities`

#### Category ⭐ Required
Choose one:
- **Journey** - Stories and experiences
- **Insights** - Analysis and learnings
- **Reflections** - Thoughts and perspectives
- **Reports** - Updates and announcements

#### Tags (Optional)
- Add comma-separated tags
- Example: `innovation, community, collaboration`
- Helps readers find related content

### Step 6: Set Publication Status

Look for the **Publication Status** box (it has a colored border):

#### 📝 Draft Mode (Orange Border)
- Switch is **OFF** (left position)
- Post is saved but **NOT visible** to visitors
- Use this when you're still working on the post
- You can come back and edit it later

#### ✅ Published Mode (Green Border)
- Switch is **ON** (right position)
- Post is **immediately visible** to all visitors
- Appears in blog listing
- Added to RSS feed
- Can be found by search engines

#### ⭐ Featured Post
- Optional second switch
- **ON**: Shows on homepage featured section
- **OFF**: Normal blog post only in blog section

### Step 7: Save Your Post

#### Save as Draft
1. Make sure **Publish switch is OFF** (📝 Draft)
2. Click **"Create Post"** button
3. Post is saved - you can edit it later
4. No one can see it yet

#### Publish Immediately
1. Toggle **Publish switch to ON** (✅ Published)
2. Click **"Create Post"** button
3. Post goes live immediately!
4. Visible at: `yoursite.com/en/blog/your-slug`

---

## 📝 Markdown Formatting Guide

Your content supports full Markdown. Here are the most useful features:

### Headings
```markdown
# Main Heading
## Section Heading
### Sub-section Heading
```

### Text Styling
```markdown
**Bold text**
*Italic text*
**_Bold and italic_**
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2
  - Sub-point

1. Numbered item 1
2. Numbered item 2
```

### Quotes
```markdown
> This is a quote
> It can span multiple lines
```

### Code
```markdown
Inline `code` with backticks

```javascript
// Code block
function hello() {
  console.log("Hello!")
}
```
```

### Images (uploaded via Insert Image button)
```markdown
![Description](https://url-to-image.jpg)
```

### Line Break
```markdown
Use two spaces at the end of a line
to create a line break
```

---

## ✅ Pre-Publication Checklist

Before publishing, check:

- [ ] **Title** is clear and compelling (English required)
- [ ] **Content** is well-written and formatted
- [ ] **Excerpt** summarizes the post (shows in listings)
- [ ] **Cover image** is uploaded (recommended)
- [ ] **Category** is selected
- [ ] **Tags** are added (helps discovery)
- [ ] **URL slug** looks good
- [ ] **Proofread** for typos and errors
- [ ] **Preview** how it looks (in draft mode first)

---

## 🔄 Editing Published Posts

### How to Edit

1. Go to **Admin Panel** → **Blog Posts**

2. Find your post in the list

3. Click the **✏️ Edit icon**

4. Make your changes

5. Click **"Save Changes"**

### Important Notes

- Changes are **immediately visible** if post is published
- You can unpublish by turning off the Publish switch
- You can re-publish by turning it back on
- Previous versions are not saved (make backups if needed)

---

## 🎨 Writing Tips

### Keep Text Dark and Readable
- All text fields now have **dark text** for easy reading
- Placeholders are lighter gray
- Content area uses monospace font for Markdown

### Title Tips
- Keep it under 60 characters
- Make it descriptive and engaging
- Use keywords naturally
- Avoid clickbait

### Content Tips
- Use headings to break up content
- Keep paragraphs short (3-4 sentences)
- Add images to illustrate points
- Use lists for easy scanning
- Include links to relevant resources

### SEO Tips
- Use keywords naturally in title
- Write compelling excerpt (shows in search results)
- Add descriptive alt text to images
- Use relevant tags
- Keep URL slug clean and descriptive

---

## 🔍 Finding Your Published Post

### On the Website
- Blog listing: `yoursite.com/en/blog`
- Direct link: `yoursite.com/en/blog/your-slug`
- If featured: Shows on homepage

### In Admin Panel
- Go to **Blog Posts**
- Published posts show green **"Published"** badge
- Featured posts show yellow **★** badge
- Click **👁️ View** icon to see live post

---

## 📡 RSS Feed

Your published posts automatically appear in RSS feeds:

- **English**: `yoursite.com/rss.xml`
- **Korean**: `yoursite.com/rss-ko.xml`

Readers can subscribe using:
- RSS readers (Feedly, Inoreader, etc.)
- Email newsletter services
- Social media automation tools

---

## ❓ Troubleshooting

### Can't Upload Images
- **Check file size**: Must be under 5MB
- **Check format**: Use JPEG, PNG, GIF, or WebP
- **Check internet**: Make sure you're connected
- **Try again**: Refresh page and retry

### Post Not Showing on Website
- **Check publish status**: Make sure switch is ON (green)
- **Check URL**: Go directly to the post URL
- **Clear cache**: Refresh browser (Ctrl+F5 or Cmd+Shift+R)
- **Wait a moment**: May take a few seconds

### Lost My Draft
- Drafts are saved to database
- Go to **Blog Posts** and filter by **"Draft"**
- Look for your post in the list
- Click edit to continue

### Image Uploaded But Not Showing
- **Check markdown**: Make sure you pasted the markdown code
- **Check syntax**: Format must be `![text](url)`
- **Save post**: Changes must be saved to appear
- **Refresh**: Try refreshing the published post

---

## 🎯 Quick Reference Card

| Action | Location | Required? |
|--------|----------|-----------|
| Login | `/en/admin/login` | ✅ |
| Title (EN) | English tab | ✅ |
| Content (EN) | English tab | ✅ |
| Excerpt | English tab | Recommended |
| Cover Image | Post Settings | Recommended |
| Category | Post Settings | ✅ |
| Tags | Post Settings | Optional |
| Publish | Publication Status box | Choose |
| Featured | Publication Status box | Optional |

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide again
2. Look at **BLOG_GUIDE.md** for technical details
3. Check Firebase Console for storage/database issues
4. Check browser console for error messages

---

## 🚀 You're Ready!

You now know everything you need to create and publish blog posts. Start writing and share your story with the world!

**Remember:**
- 📝 Draft first, publish when ready
- 🎨 Use images to make it engaging
- ✏️ Proofread before publishing
- 🔄 You can always edit later

Happy blogging! 🎉
