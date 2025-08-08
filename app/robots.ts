import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/sitemap.xml` 
    : 'http://localhost:3000/sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
  }
}
