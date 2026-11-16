import { project } from '@/data/project';
import type { Locale } from './i18n';
export function feedbackUrl(kind: number, locale: Locale) {
  const english = locale === 'en';
  const titles = english ? ['[Suggestion] ', '[Bug] ', '[Next update] '] : ['[Sugestão] ', '[Bug] ', '[Próxima atualização] '];
  const bodies = english ? [
    '## Idea\n\n## Why it would help\n\n',
    '## Versions\nWindCraft: 0.5.0\nMinecraft: 26.3\nForge: 66.1.8\n\n## What happened\n\n## Steps to reproduce\n\n## Expected behavior\n\n## Logs / screenshots\n\n',
    '## Roadmap idea\nChoose: Kites / Windmills / Wind power / Sailboats / Balloons and airships / Advanced weather\n\n## Why this should come next\n\n',
  ] : [
    '## Ideia\n\n## Como ajudaria\n\n',
    '## Versões\nWindCraft: 0.5.0\nMinecraft: 26.3\nForge: 66.1.8\n\n## O que aconteceu\n\n## Passos para reproduzir\n\n## Comportamento esperado\n\n## Logs / capturas\n\n',
    '## Ideia do roadmap\nEscolha: Pipas / Moinhos / Energia eólica / Barcos a vela / Balões e dirigíveis / Clima avançado\n\n## Por que deveria vir a seguir\n\n',
  ];
  return `${project.repository}/issues/new?${new URLSearchParams({ title: titles[kind], body: bodies[kind].replaceAll("0.5.0", project.version) })}`;
}
