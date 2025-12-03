import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/lib/firebase/blogService'

export async function GET() {
  try {
    const posts = await getPublishedPosts('en', 50)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bnomad.org'
    const rssDate = new Date().toUTCString()

    const rssItems = posts
      .map((post) => {
        const postUrl = `${siteUrl}/en/blog/${post.slug}`
        const pubDate = new Date(post.publishedAt).toUTCString()

        // Escape XML special characters
        const escapeXml = (str: string) =>
          str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')

        return `
    <item>
      <title>${escapeXml(post.title.en)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt.en || '')}</description>
      <author>${escapeXml(post.author.email)} (${escapeXml(post.author.name)})</author>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      ${post.coverImage ? `<enclosure url="${escapeXml(post.coverImage)}" type="image/jpeg" />` : ''}
    </item>`
      })
      .join('\n')

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BNOMAD Blog</title>
    <link>${siteUrl}</link>
    <description>Stories and insights from BNOMAD - Glocal innovation and authentic community building</description>
    <language>en</language>
    <lastBuildDate>${rssDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}
