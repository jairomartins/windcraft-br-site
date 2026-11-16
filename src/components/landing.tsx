import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUp, Check, CloudSun, Compass, ExternalLink, Feather, Github, Menu, MessageSquare, Mountain, Navigation, Wind, Gauge, Bug, Lightbulb } from 'lucide-react';
import { project, roadmap } from '@/data/project';
import { dictionary, type Locale } from '@/lib/i18n';
import { feedbackUrl } from '@/lib/feedback';
import { siteUrl } from '@/lib/seo';
import Gallery from './gallery';
import Crafting from './crafting';

const ids = ['features', 'gameplay', 'crafting', 'roadmap'];
const icons = [Wind, Feather, Mountain, Compass, CloudSun, Gauge];
function Brand() { return <span className="brand"><Image src="/images/wind_glider.png" alt="" width={43} height={43} /><span>WINDCRAFT<span className="brand-br"> BR</span><small>MINECRAFT JAVA MOD</small></span></span>; }
function Heading({ label, title, intro }: { label: string; title: string; intro?: string }) { return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>; }
export default function Landing({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  const video = project.gameplayVideo.startsWith('https://') ? project.gameplayVideo : undefined;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    softwareVersion: project.version,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux',
    softwareRequirements: `Minecraft Java ${project.minecraft}, Forge ${project.forge}, Java ${project.java}`,
    description: t.meta,
    downloadUrl: project.download,
    codeRepository: project.repository,
    inLanguage: locale,
    isAccessibleForFree: true,
    ...(siteUrl ? {
      url: `${siteUrl}/${locale}`,
      image: `${siteUrl}/${locale}/social-image`,
      screenshot: ['planador-oceano', 'planador-vista-superior', 'planador-vista-inferior', 'planador-curva', 'planador-montanhas', 'planador-planicie'].map((name) => `${siteUrl}/images/${name}-${project.version}.png`),
    } : {}),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header" id="top"><div className="container header-inner">
      <Link href={`/${locale}`} aria-label="WindCraft BR"><Brand /></Link>
      <nav className="desktop-nav" aria-label={t.menu}>{t.nav.map((item, i) => <a key={item} href={`#${ids[i]}`}>{item}</a>)}</nav>
      <div className="header-actions"><nav className="language-switch" aria-label={t.language}><Link href="/pt-BR" lang="pt-BR" aria-current={locale === 'pt-BR' ? 'page' : undefined}>PT</Link><span>/</span><Link href="/en" lang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link></nav><a className="button button-small header-download" href="#download"><ArrowDownToLine size={16} />{t.download}</a></div>
      <details className="mobile-menu"><summary aria-label={t.menu}><Menu /></summary><nav aria-label={t.menu}>{t.nav.map((item, i) => <a key={item} href={`#${ids[i]}`}>{item}</a>)}<a href="#download">{t.download}</a></nav></details>
    </div></header>
    <main id="main">
      <section className="hero"><div className="hero-landscape"><Image src="/images/planador-curva-0.6.0.png" alt="" fill priority sizes="100vw" /></div><div className="hero-shade" /><div className="wind-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="container hero-inner"><a className="alpha-badge" href="#download"><span />{t.alpha}<ArrowRight size={14} /></a><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}<br /><span>{t.titleEnd}</span></h1><p className="hero-intro">{t.intro}</p>
          <div className="hero-buttons"><a className="button" href={project.download}><ArrowDownToLine size={19} />{t.download}<ArrowRight size={18} /></a><a className="button button-secondary" href="#gameplay">{t.gameplay}<ArrowDown size={18} /></a></div>
          <div className="compatibility"><span><span className="status-dot" />Minecraft Java {project.minecraft}</span><span>Forge {project.forge}</span><span>Java {project.java}</span></div>
          <a className="hero-github" href={project.repository}><Github size={16} />{t.github}<ExternalLink size={13} /></a>
        </div><div className="container hero-bottom"><span><ArrowDown size={15} />{t.scroll}</span><span className="hero-caption">{t.heroCaption}</span></div>
      </section>
      <section className="section container" id="features"><Heading label={t.featureLabel} title={t.featureTitle} intro={t.featureIntro} /><div className="features-grid">{t.features.map(([title, description], i) => { const Icon = icons[i]; return <article className="feature-card" key={title}><span className="feature-icon"><Icon size={25} strokeWidth={1.5} /></span><span className="feature-number">0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>; })}</div></section>
      <section className="section gallery-section" id="gameplay"><div className="container"><Heading label={t.galleryLabel} title={t.galleryTitle} intro={t.galleryIntro} /><Gallery t={t} />{video && <video className="gameplay-video" controls preload="none" aria-label={t.gameplay} poster="/images/planador-curva-0.6.0.png"><source src={video} /><a href={video}>{t.gameplay}</a></video>}</div></section>
      <section className="section container" id="crafting"><Heading label={t.craftingLabel} title={t.craftingTitle} intro={t.craftingIntro} /><div className="recipes"><Crafting kind="glider" t={t} /><Crafting kind="anemometer" t={t} /></div><p className="crafting-note">{t.craftingNote} <a className="text-link" href={`${project.repository}/blob/main/docs/CRAFTING.md`}>{t.recipeSource}<ExternalLink size={13} /></a></p><details className="controls"><summary><Navigation size={20} />{t.controlsTitle}<span>+</span></summary><dl>{t.controls.map(([key, description]) => <div key={key}><dt><kbd>{key}</kbd></dt><dd>{description}</dd></div>)}</dl></details></section>
      <section className="section download-section" id="download"><div className="container download-layout"><div><Heading label={t.downloadLabel} title={t.downloadTitle} intro={t.downloadIntro} /><div className="version-pills"><span>ALPHA {project.version}</span><span>Minecraft {project.minecraft}</span><span>Forge {project.forge}</span></div><a className="button" href={project.download}><ArrowDownToLine size={20} />{t.jar}<ArrowRight size={18} /></a><p className="download-source">{t.sourceDownload}</p><a className="text-link" href={project.forgeDownload}>{t.forge}<ExternalLink size={14} /></a></div><ol className="install-steps">{t.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div><aside className="container"><div className="alpha-notice"><Compass size={23} /><div><h3>{t.limitations}</h3><p>{t.limitationText}</p><a className="text-link" href={`${project.repository}/blob/main/VALIDATION.md`}>{t.validation}<ArrowRight size={15} /></a></div></div></aside></section>
      <section className="section container" id="roadmap"><Heading label={t.roadmapLabel} title={t.roadmapTitle} /><div className="roadmap-grid"><article className="roadmap-card"><div className="roadmap-label"><span className="status-dot" />{t.implemented}</div><ul>{roadmap.implemented.map((id, i) => <li key={id}><Check size={17} />{t.roadmapDone[i]}</li>)}</ul></article><article className="roadmap-card roadmap-planned"><div className="roadmap-label"><span className="future-dot" />{t.planned}</div><ul>{roadmap.planned.map((id, i) => <li key={id}><span className="small-square" />{t.roadmapFuture[i]}</li>)}</ul><p>{t.plannedNote}</p></article></div></section>
      <section className="section community-section" id="community"><div className="container"><Heading label={t.communityLabel} title={t.communityTitle} intro={t.communityIntro} /><div className="community-grid">{t.community.map(([title, description], i) => { const Icon = [MessageSquare, Bug, Lightbulb][i]; return <a key={title} className="community-card" href={feedbackUrl(i, locale)}><Icon size={24} /><h3>{title}</h3><p>{description}</p><ArrowRight size={22} /></a>; })}</div><p className="feedback-note">{t.feedbackNote}</p></div></section>
    </main><footer className="container site-footer"><div><Link href={`/${locale}`}><Brand /></Link><p>{t.footer}</p><small>{t.unofficial}</small></div><nav aria-label={t.documentation}><a href={project.repository}><Github size={16} />GitHub</a><a href={`${project.repository}/blob/main/README.md`}>{t.documentation}<ExternalLink size={14} /></a><a href="#top">{t.top}<ArrowUp size={15} /></a></nav></footer>
  </>;
}
