import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap { return siteUrl ? ['pt-BR', 'en'].map(locale => ({ url: `${siteUrl}/${locale}`, alternates: { languages: { 'pt-BR': `${siteUrl}/pt-BR`, en: `${siteUrl}/en` } } })) : []; }
