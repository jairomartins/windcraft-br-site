# Votação futura com Supabase

O site atual encaminha sugestões para GitHub Issues. Nenhum voto é contado ou simulado.

Contrato proposto para uma implementação posterior:

- `roadmap_options`: `id` (os IDs em `src/data/project.ts`), `active`, `created_at`.
- `roadmap_votes`: `option_id`, `user_id` (Supabase Auth), `created_at`; chave única composta `(option_id, user_id)` para impedir duplicatas.
- Autenticação obrigatória para registrar/remover votos. RLS permite apenas inserir/remover linhas cujo `user_id = auth.uid()`, com opção ativa. Sem edição de votos de terceiros.
- Totais públicos por opção através de uma função SQL que retorne somente contagens; nunca expor a lista de usuários que votaram.
- Validar IDs no servidor, aplicar limite de requisições e apresentar estados de carregamento, erro e confirmação nas duas línguas.
- Segredos de serviço ficam somente no servidor. Chaves e conexão não são necessárias na versão atual.

Antes de ativar: definir política de privacidade, retenção e regras de votação; criar migrações e testes de RLS/duplicidade. Só então adicionar a interface de votos e variáveis de ambiente. As opções planejadas não representam compromisso de lançamento.
