import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionary, isLocale, locales } from '@/lib/i18n';
import { siteUrl } from '@/lib/seo';
import Landing from '@/components/landing';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary(locale);
  const title = locale === 'en' ? 'WindCraft BR — Master the wind' : 'WindCraft BR — Domine o vento';
  const social = `/${locale}/social-image`;
  return { title, description: t.meta, metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    alternates: siteUrl ? { canonical: `${siteUrl}/${locale}`, languages: { 'pt-BR': `${siteUrl}/pt-BR`, en: `${siteUrl}/en`, 'x-default': `${siteUrl}/pt-BR` } } : undefined,
    openGraph: { title, description: t.meta, type: 'website', locale: locale === 'en' ? 'en_US' : 'pt_BR', alternateLocale: locale === 'en' ? 'pt_BR' : 'en_US', siteName: 'WindCraft BR', ...(siteUrl ? { url: `${siteUrl}/${locale}`, images: [{ url: `${siteUrl}${social}`, width: 1200, height: 630 }] } : {}) },
    twitter: { card: 'summary_large_image', title, description: t.meta, ...(siteUrl ? { images: [`${siteUrl}${social}`] } : {}) }, icons: { icon: '/favicon.png', apple: '/favicon.png' },
  };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <Landing locale={locale} />; }
