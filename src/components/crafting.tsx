import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { recipes } from '@/data/project';
import type { Dictionary } from '@/lib/i18n';

const symbols = ['▧', '╱', '╱', '♧', '▰', '◈', ''];
export default function Crafting({ t, kind }: { t: Dictionary; kind: keyof typeof recipes }) {
  const glider = kind === 'glider';
  return <article className="recipe-card">
    <div className="recipe-top"><span className="tag">3 × 3</span><span className="muted">{glider ? '01' : '02'}</span></div>
    <h3>{glider ? t.glider : t.anemometer}</h3>
    <div className="crafting-bench"><div className="recipe-grid" role="group" aria-label={glider ? t.glider : t.anemometer}>
      {recipes[kind].map((ingredient, i) => <div className={`ingredient ingredient-${ingredient}`} key={i} tabIndex={ingredient === 6 ? undefined : 0} aria-label={`${Math.floor(i / 3) + 1}, ${i % 3 + 1}: ${t.ingredients[ingredient]}`}><span aria-hidden="true">{symbols[ingredient]}</span><span className="tooltip">{t.ingredients[ingredient]}</span></div>)}
    </div><ArrowRight className="recipe-arrow" aria-hidden="true" /><div className="recipe-result"><Image src={`/images/${glider ? 'wind_glider' : 'anemometer'}.png`} alt={glider ? t.glider : t.anemometer} width={72} height={72} /></div></div>
    <p className="materials">{glider ? t.gliderMaterials : t.meterMaterials}</p>
    <div className="ingredient-legend">{[...new Set(recipes[kind])].filter(i => i !== 6).map(i => <span key={i}><b className={`legend-symbol ingredient-${i}`} aria-hidden="true">{symbols[i]}</b>{t.ingredients[i]}</span>)}</div>
  </article>;
}
