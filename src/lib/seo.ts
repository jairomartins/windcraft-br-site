const configured = process.env.SITE_URL?.trim() || 'https://windcraft-br-site.vercel.app';
if (configured && !/^https?:\/\/[^\s/]+(?:\/)?$/.test(configured)) throw new Error('SITE_URL must be an absolute HTTP(S) origin without a path.');
export const siteUrl = configured?.replace(/\/$/, '');
