'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { gallery } from '@/data/project';
import type { Dictionary } from '@/lib/i18n';

export default function Gallery({ t }: { t: Dictionary }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<number | null>(null);
  function move(delta: number) { setIndex(i => (i + delta + gallery.length) % gallery.length); }
  function close() { dialog.current?.close(); opener.current?.focus(); }
  return <>
    <div className="gallery-grid">{gallery.map((file, i) => <button key={file} className="gallery-card" aria-label={`${t.enlarge}: ${t.captions[i]}`} onClick={e => { opener.current = e.currentTarget; setIndex(i); dialog.current?.showModal(); }}>
      <div className="gallery-image"><Image src={`/images/${file}`} alt={t.captions[i]} fill sizes="(max-width: 700px) 94vw, 48vw" /><span className="expand"><Expand size={18} /></span></div>
      <span className="gallery-caption"><span><small>0{i + 1}</small>{t.captions[i]}</span><ArrowRight size={18} /></span>
    </button>)}</div>
    <dialog ref={dialog} className="lightbox" aria-label={t.enlarge} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowLeft') move(-1); if (e.key === 'ArrowRight') move(1); }}>
      <div className="lightbox-inner" onTouchStart={e => { touch.current = e.changedTouches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null) { const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); touch.current = null; } }}>
        <button autoFocus className="lightbox-close icon-button" onClick={close} aria-label={t.close}><X /></button>
        <Image src={`/images/${gallery[index]}`} alt={t.captions[index]} width={1280} height={720} sizes="95vw" />
        <div className="lightbox-controls"><button className="icon-button" onClick={() => move(-1)} aria-label={t.previous}><ArrowLeft /></button><p aria-live="polite">{index + 1} / 4 · {t.captions[index]}</p><button className="icon-button" onClick={() => move(1)} aria-label={t.next}><ArrowRight /></button></div>
        <p className="muted lightbox-hint">{t.galleryHint}</p>
      </div>
    </dialog>
  </>;
}
