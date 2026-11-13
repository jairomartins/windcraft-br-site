import pt from '@/locales/pt-BR';
import en from '@/locales/en';
export const locales = ['pt-BR', 'en'] as const;
export type Locale = typeof locales[number];
export type Dictionary = typeof pt;
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const dictionary = (locale: Locale) => locale === 'en' ? en : pt;
