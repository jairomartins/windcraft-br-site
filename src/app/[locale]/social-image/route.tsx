import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { project } from '@/data/project';
import { isLocale } from '@/lib/i18n';
export const dynamic = 'force-static';
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const data = await readFile(path.join(process.cwd(), 'public/images/planador-curva-0.6.0.png'));
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#101d30', color: 'white', position: 'relative' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${data.toString('base64')}`} alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: .35 }} />
    <div style={{ display: 'flex', flexDirection: 'column', padding: 72, background: 'linear-gradient(90deg, #101d30, transparent)', width: '100%', justifyContent: 'center' }}><div style={{ color: '#86dbb0', fontSize: 25, letterSpacing: 5 }}>{`WINDCRAFT BR · ALPHA ${project.version}`}</div><div style={{ fontSize: 88, fontWeight: 700, marginTop: 32 }}>{locale === 'en' ? 'Master the wind.' : 'Domine o vento.'}</div><div style={{ fontSize: 34, color: '#b6dff5', marginTop: 20 }}>{locale === 'en' ? 'Explore new horizons.' : 'Explore novos horizontes.'}</div><div style={{ fontSize: 22, marginTop: 54 }}>MINECRAFT JAVA 26.3 · FORGE 66.1.8</div></div>
  </div>, { width: 1200, height: 630 });
}
