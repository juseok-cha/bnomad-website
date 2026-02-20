import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/lib/firebase/blogService'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getPublishedPosts('ko', 50)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bnomad.org'
    const rssDate = new Date().toUTCString()

    const rssItems = posts
      .map((post) => {
        const postUrl = `${siteUrl}/ko/blog/${post.slug}`
        const pubDate = new Date(post.publishedAt).toUTCString()

        // Escape XML special characters
        const escapeXml = (str: string) =>
          str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')

        const title = post.title.ko || post.title.en
        const excerpt = post.excerpt.ko || post.excerpt.en

        return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(excerpt || '')}</description>
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
    <title>BNOMAD 블로그</title>
    <link>${siteUrl}</link>
    <description>BNOMAD의 스토리와 인사이트 - 글로컬 혁신과 진정성 있는 커뮤니티 구축</description>
    <language>ko</language>
    <lastBuildDate>${rssDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss-ko.xml" rel="self" type="application/rss+xml" />
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
