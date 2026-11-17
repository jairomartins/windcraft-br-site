# WindCraft BR — site oficial

Landing page independente do mod Java: Next.js App Router, TypeScript, Tailwind CSS e Lucide React. Conteúdo principal pré-renderizado em PT-BR (`/pt-BR`) e inglês (`/en`); `/` redireciona para PT-BR. Sem banco de dados obrigatório.

## Executar no Windows 11

Requer Node.js 22 LTS ou posterior compatível com Next.js 16 e npm.

```powershell
cd D:\Programacao\mods\WindCraft-BR-site
npm.cmd ci
npm.cmd run dev
```

Abra http://localhost:3000. `npm.cmd` evita problemas de execução de scripts PowerShell em algumas instalações do Windows.

## Verificar e executar produção

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
npm.cmd start
```

Os testes iniciam e encerram seu próprio servidor de produção na porta 3197; execute o build primeiro. Cobrem rotas, idiomas, metadados, âncoras, destinos de feedback, imagens, otimização, imagens sociais, robots, sitemap e receitas oficiais quando o mod irmão estiver disponível. A comparação de receitas é opcional no deploy isolado.

## Estrutura dos projetos

```text
mods/                        # equivalente à pasta Projetos/ do briefing
├── WindCraft/               # mod existente, preservado
│   ├── src/
│   ├── docs/
│   ├── build.gradle
│   └── README.md
└── WindCraft-BR-site/        # este projeto independente
    ├── src/
    │   ├── app/[locale]/
    │   ├── components/
    │   ├── data/
    │   ├── lib/
    │   ├── locales/
    │   └── styles/
    ├── public/images/
    ├── tests/
    ├── package.json
    └── next.config.ts
```

Os nomes existentes foram mantidos para preservar caminhos locais do ambiente Java. O site pode ser copiado para um repositório próprio chamado `windcraft-br-site` sem depender do Gradle. Não precisa do checkout do mod para rodar ou compilar.

## Conteúdo e fontes

Dados conferidos em 16/11/2026 no checkout e no [repositório oficial](https://github.com/jairomartins/windcraft-br):

- Alpha 0.6.1, Minecraft Java 26.3, Forge 66.1.8 e Java 25, conforme README e build.gradle.
- Receitas conferidas em `docs/CRAFTING.md` e `src/main/resources/data/windcraft/recipe/*.json`.
- A galeria usa seis capturas da Alpha 0.6.0 fornecidas pelo autor em 16/11/2026, com o planador em leque e HUD. A imagem de abertura é uma arte baseada na captura do voo sobre o vale. Ícones e favicon são do mod.
- O site aponta para o download oficial em `main/dist/windcraft-0.6.1.jar`.
- Issues habilitadas e Discussions desabilitadas. Os três links de feedback abrem o compositor do GitHub com título e corpo traduzidos. O jogador conclui o envio no GitHub, com sua conta. Nenhuma Issue é criada automaticamente.
- Limitações vêm de `VALIDATION.md`: validação completa de áudio, multiplayer, colisões e compatibilidade ainda pendente. Não se promete voo propulsado, animação de folhas nem vento no Nether/End.

Edite versões, URLs, receitas e IDs do roadmap em `src/data/project.ts`. Edite os textos do roadmap e traduções em `src/locales/pt-BR.ts` e `src/locales/en.ts`. Não adicione datas sem confirmação. As receitas usam símbolos visuais, legenda e nomes acessíveis; os ícones de resultado são os do mod.

Para adicionar vídeo real, preencha `project.gameplayVideo` com uma URL HTTPS direta de vídeo reproduzível (ex.: MP4). O player é ocultado enquanto não houver URL. O botão de gameplay sempre abre a galeria real. O visualizador usa diálogo nativo, foco restaurado, Escape, setas, botões e gesto de deslizar. Animações respeitam `prefers-reduced-motion`.

Preparação para votação futura: [docs/VOTING.md](docs/VOTING.md). Não há conexão Supabase nem contagem fictícia.

## Deploy na Vercel e SEO

1. Importe esta pasta como repositório independente ou selecione `WindCraft-BR-site` como Root Directory em um repositório que contenha os dois projetos.
2. Use o preset **Next.js** e Node.js 22. Comandos padrão: instalação `npm ci`, build `npm run build`; não configure Output Directory manualmente.
3. O domínio de produção padrão é `https://windcraft-br-site.vercel.app`. Se usar um domínio personalizado, configure `SITE_URL` com a origem absoluta dele, sem caminho nem barra final, e faça um novo deploy.

Não é necessário `vercel.json`: a configuração nativa do Next.js é suficiente. Nenhum deploy foi executado por esta entrega local.

`.env.example` documenta a variável opcional, que substitui o domínio padrão. A origem configurada habilita canonical, alternates por idioma, imagens Open Graph/Twitter e sitemap bilíngue. As imagens sociais de 1200×630 ficam em `/pt-BR/social-image` e `/en/social-image`, compostas com captura real do mod. `robots.txt` é gerado pelo Next.js.

## Verificação visual

A suíte HTTP cobre as seis capturas, receitas por cor, idiomas, links e imagens
sociais 1200 × 630.

Conferir em desktop e celular: navegação e seletor de idioma, menu compacto, quebra do hero, receitas com foco/toque, galeria (Escape/setas/deslize), controles de voo, ações de download e feedback, ausência de rolagem horizontal, contraste e modo de movimento reduzido. Não há pontuação Lighthouse declarada. A inspeção visual automatizada desta entrega ficou indisponível por expiração do acesso ao Chrome; os testes HTTP não substituem essa revisão.
