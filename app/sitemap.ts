import { MetadataRoute } from 'next'
import { componentsData } from '@/data/components';

const BASE_URL = 'https://kinetic-ui.vercel.app'; // Replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const componentRoutes = componentsData.map(component => ({
    url: `${BASE_URL}/components/${component.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...componentRoutes,
  ]
}
