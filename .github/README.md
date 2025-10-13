# GitHub Actions Workflows

Este repositório possui workflows automatizados do GitHub Actions para garantir qualidade do código e automatizar a publicação no NPM.

## Workflows

### 1. CI Tests (`ci.yml`)
**Trigger**: Push e Pull Requests para `master`, `main`, `develop`

**Funcionalidades**:
- ✅ Testa em múltiplas versões do Node.js (16.x, 18.x, 20.x)
- ✅ Valida estrutura do package
- ✅ Testa carregamento do SDK
- ✅ Valida definições TypeScript
- ✅ Verifica sintaxe dos arquivos de exemplo
- ✅ Executa auditoria de segurança
- ✅ Escaneia por credenciais expostas

### 2. NPM Publish (`npm-publish.yml`)
**Trigger**: 
- Push para `master`/`main`
- Pull Request aprovado e merged

**Funcionalidades**:
- ✅ Executa todos os testes de CI
- ✅ Valida que a versão é nova
- ✅ Publica automaticamente no NPM
- ✅ Cria tag Git com a versão
- ✅ Gera release no GitHub

## Configuração Necessária

### Secrets do GitHub

Para que os workflows funcionem corretamente, você precisa configurar os seguintes secrets no GitHub:

1. **NPM_TOKEN** (obrigatório para publicação)
   - Acesse [npmjs.com](https://www.npmjs.com)
   - Vá em "Access Tokens" no seu perfil
   - Gere um token do tipo "Automation"
   - Adicione como secret no GitHub: `Settings > Secrets and variables > Actions > New repository secret`

2. **GITHUB_TOKEN** (automático)
   - Este token é criado automaticamente pelo GitHub
   - Não requer configuração manual

### Como configurar os secrets:

1. Vá para o repositório no GitHub
2. Clique em `Settings`
3. Na sidebar, clique em `Secrets and variables` > `Actions`
4. Clique em `New repository secret`
5. Adicione os secrets necessários:

```
Nome: NPM_TOKEN
Valor: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Fluxo de Publicação

### Desenvolvimento Normal
1. Desenvolva em uma branch feature
2. Abra Pull Request para `master`
3. CI roda automaticamente
4. Após aprovação e merge, package é publicado automaticamente

### Publicação Manual de Versão
1. Atualize a versão no `package.json`:
   ```bash
   npm version patch  # ou minor, major
   ```
2. Commit e push para `master`
3. Publicação automática será executada

## Estrutura de Versioning

O projeto segue [Semantic Versioning](https://semver.org/):

- **MAJOR** (`1.0.0`): Mudanças que quebram compatibilidade
- **MINOR** (`0.1.0`): Novas funcionalidades mantendo compatibilidade
- **PATCH** (`0.0.1`): Bug fixes e melhorias

### Comandos úteis:

```bash
# Incrementar patch version (1.0.0 -> 1.0.1)
npm version patch

# Incrementar minor version (1.0.0 -> 1.1.0)
npm version minor

# Incrementar major version (1.0.0 -> 2.0.0)
npm version major

# Definir versão específica
npm version 1.2.3
```

## Monitoramento

### Status dos Workflows
- ✅ Verde: Todos os testes passaram
- ❌ Vermelho: Falhas encontradas
- 🟡 Amarelo: Em execução

### Logs detalhados
- Acesse a aba `Actions` no GitHub
- Clique no workflow específico
- Visualize logs detalhados de cada step

## Troubleshooting

### Falha na publicação NPM
- Verifique se `NPM_TOKEN` está configurado corretamente
- Confirme que a versão no `package.json` é nova
- Verifique se não há conflitos de nome no NPM

### Falha nos testes TypeScript
- Atualize as definições em `index.d.ts`
- Execute localmente: `tsc index.d.ts --noEmit --strict`

### Falha na auditoria de segurança
- Execute localmente: `npm audit`
- Corrija com: `npm audit fix`

## Configurações Opcionais

### Branch Protection Rules
Para maior segurança, configure regras de proteção da branch:

1. `Settings > Branches`
2. Add rule para `master`
3. Ative:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include CI Tests workflow

### Ambiente de Staging
Para testar antes da publicação:

1. Crie branch `staging`
2. Configure workflow para publicar em NPM com tag `beta`
3. Teste a versão beta antes do merge para `master`

---

📝 **Nota**: Sempre teste os workflows em um fork ou repositório de teste antes de aplicar em produção.