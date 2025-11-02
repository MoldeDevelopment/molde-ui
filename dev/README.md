# molde-ui Playground

Ambiente de desenvolvimento para testar os componentes da biblioteca `molde-ui` localmente.

## Como usar

```bash
# Iniciar o playground
pnpm dev
# ou
pnpm dev:playground
```

O playground estará disponível em `http://localhost:3001` (abre automaticamente no navegador).

## O que você pode testar

- ✅ Componente Menu com diferentes configurações
- ✅ Todos os tamanhos (sm, md, lg)
- ✅ Todas as variantes (default, compact)
- ✅ Itens com ícones
- ✅ Subitens (nested menu)
- ✅ Itens desabilitados
- ✅ Navegação por teclado
- ✅ Troca de temas DaisyUI
- ✅ Estados ativos/hover
- ✅ Interações e callbacks

## Estrutura

```
dev/
├── index.html       # HTML principal
├── main.tsx         # Entry point
├── App.tsx          # Componente principal com exemplos
├── vite.config.ts   # Configuração Vite específica do playground
└── README.md        # Este arquivo
```

## Nota

Este diretório **NÃO será incluído** no pacote npm quando você publicar a biblioteca. Ele é apenas para desenvolvimento local.
