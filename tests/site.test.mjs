import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
import { readFile } from 'node:fs/promises';

const base = 'http://127.0.0.1:3197';
const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, '') || 'https://windcraft-br-site.vercel.app';
let server;
let output = '';
const pages = {};
before(async () => {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', '3197'], { stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', data => { output += data; });
  server.stderr.on('data', data => { output += data; });
  for (let i = 0; i < 120; i++) {
    if (server.exitCode !== null) throw new Error(output);
    try { if ((await fetch(`${base}/pt-BR`)).ok) break; } catch {}
    if (i === 119) throw new Error(`Server did not start: ${output}`);
    await setTimeout(250);
  }
  for (const locale of ['pt-BR', 'en']) {
    const response = await fetch(`${base}/${locale}`);
    assert.equal(response.status, 200);
    pages[locale] = await response.text();
  }
});
after(() => { server?.kill(); });

test('root redirects to Brazilian Portuguese; unknown languages return 404', async () => {
  const response = await fetch(base, { redirect: 'manual' });
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get('location'), base).pathname, '/pt-BR');
  assert.equal((await fetch(`${base}/es`)).status, 404);
});
test('both languages have translated content, metadata, correct HTML language and alternate navigation', () => {
  for (const [locale, heading] of [['pt-BR', 'Domine o vento.'], ['en', 'Master the wind.']]) {
    const html = pages[locale];
    assert.ok(html.includes(`<html lang="${locale}"`));
    assert.ok(html.includes(heading));
    assert.match(html, /name="description"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /href="\/pt-BR"/);
    assert.match(html, /href="\/en"/);
    assert.match(html, /application\/ld\+json/);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}/${locale}"`));
  }
  assert.ok(!pages.en.includes('Relatar um problema'));
});
test('release 0.6.0 includes six screenshots and same-color wool crafting', () => {
  for (const html of Object.values(pages)) {
    assert.ok(html.includes('0.6.0'));
    assert.ok(!html.includes('0.5.0'));
    for (const file of ['planador-oceano', 'planador-vista-superior', 'planador-vista-inferior', 'planador-curva', 'planador-montanhas', 'planador-planicie']) {
      assert.ok(html.includes(`${file}-0.6.0.png`), file);
    }
  }
  assert.ok(pages['pt-BR'].includes('4 lãs da mesma cor'));
  assert.ok(pages.en.includes('4 wool of the same color'));
});

test('every in-page navigation link has a real target', () => {
  for (const html of Object.values(pages)) {
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of html.matchAll(/href="#([^"]*)"/g)) {
      assert.ok(match[1].length > 0);
      assert.ok(ids.has(match[1]), `Missing #${match[1]}`);
    }
  }
});
test('download points to the verified official alpha; feedback opens three real issue composers', () => {
  for (const [locale, html] of Object.entries(pages)) {
    assert.match(html, /https:\/\/github.com\/jairomartins\/windcraft-br\/raw\/refs\/heads\/main\/dist\/windcraft-0.6.0.jar/);
    const issues = [...html.matchAll(/href="(https:\/\/github.com\/jairomartins\/windcraft-br\/issues\/new\?[^"]+)"/g)];
    assert.equal(issues.length, 3);
    for (const [index, match] of issues.entries()) {
      const url = new URL(match[1].replaceAll('&amp;', '&'));
      assert.ok(url.searchParams.get('title'));
      const expectedSections = locale === 'en' ? ['## Idea', '## Versions', '## Roadmap idea'] : ['## Ideia', '## Versões', '## Ideia do roadmap'];
      assert.ok(url.searchParams.get('body').includes(expectedSections[index]));
    }
    assert.ok(!html.includes('<video'), 'no player for a missing video');
  }
});
test('real screenshots, item icons, favicon and image optimization return valid images', async () => {
  for (const file of ['planador-oceano-0.6.0.png', 'planador-vista-superior-0.6.0.png', 'planador-vista-inferior-0.6.0.png', 'planador-curva-0.6.0.png', 'planador-montanhas-0.6.0.png', 'planador-planicie-0.6.0.png', 'wind_glider.png', 'anemometer.png']) {
    const response = await fetch(`${base}/images/${file}`);
    assert.equal(response.status, 200, file);
    assert.match(response.headers.get('content-type'), /image\/png/);
    assert.ok((await response.arrayBuffer()).byteLength > 100);
  }
  assert.equal((await fetch(`${base}/favicon.png`)).status, 200);
  const optimized = await fetch(`${base}/_next/image?url=%2Fimages%2Fplanador-curva-0.6.0.png&w=640&q=75`);
  assert.equal(optimized.status, 200);
  assert.match(optimized.headers.get('content-type'), /image\//);
});
test('localized social images render at 1200 by 630', async () => {
  for (const locale of ['pt-BR', 'en']) {
    const response = await fetch(`${base}/${locale}/social-image`);
    assert.equal(response.status, 200);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
});
test('robots and sitemap are served without invented domains', async () => {
  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Allow: \//);
  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.ok(!xml.includes('example.com'));
  assert.ok(xml.includes(`${siteUrl}/en`));
});
test('crafting patterns match the official mod JSON files when the sibling checkout exists', async t => {
  let glider, meter;
  try {
    glider = JSON.parse(await readFile('../WindCraft/src/main/resources/data/windcraft/recipe/wind_glider.json', 'utf8'));
    meter = JSON.parse(await readFile('../WindCraft/src/main/resources/data/windcraft/recipe/anemometer.json', 'utf8'));
  } catch (error) { if (error.code === 'ENOENT') return t.skip('Sibling mod checkout is optional'); throw error; }
  assert.deepEqual(glider.pattern, ['LBL', 'LGL', 'CGC']);
  assert.deepEqual(meter.pattern, [' I ', 'ICI', ' S ']);
  const source = await readFile('src/data/project.ts', 'utf8');
  assert.ok(source.includes('glider: [0, 1, 0, 0, 2, 0, 3, 2, 3]'));
  assert.ok(source.includes('anemometer: [6, 4, 6, 4, 5, 4, 6, 2, 6]'));
});
