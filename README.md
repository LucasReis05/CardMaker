# CardMaker TCG

Aplicação web para criação e gerenciamento de cartas colecionáveis personalizadas, organizada por baralhos. O projeto foi desenvolvido como frontend em React + TypeScript, com foco em modelagem de estado, componentização e experiência de edição visual.

## Contexto do projeto

Este projeto simula uma plataforma de edição de cartas no estilo TCG (Trading Card Game), em que o usuário:

1. Cria baralhos.
2. Adiciona cartas em cada baralho.
3. Edita visualmente o conteúdo de cada carta.
4. Salva o progresso localmente no navegador.

O objetivo principal foi construir uma interface funcional e intuitiva para composição de layout, com controle de elementos textuais e imagens em um canvas de carta.

## Funcionalidades implementadas

- Criação, abertura e exclusão de baralhos.
- Persistência dos baralhos no `localStorage`.
- Criação de novas cartas dentro de um baralho.
- Edição de cartas existentes.
- Duplicação e exclusão de cartas.
- Edição visual por elementos na carta (texto e imagem).
- Controles de texto: conteúdo, posição, cor, tamanho, espessura e estilo da fonte.
- Controles de imagem: URL/conteúdo, posição, largura e altura.
- Definição da cor de fundo da carta.
- Navegação por telas: `Baralho -> Mesa -> Editor`.

## Como a aplicação funciona

O fluxo principal é dividido em três telas:

- `BaralhoTela`: lista os baralhos existentes e permite criar novos.
- `Mesa`: exibe as miniaturas das cartas do baralho selecionado e permite abrir uma carta para edição.
- `Editor`: área de customização da carta, com painel de opções e controles do elemento selecionado.

A camada de estado global da aplicação utiliza `useReducer` (arquivo `src/App.tsx`) para centralizar as regras de negócio, incluindo ações de criação, edição, duplicação e remoção de baralhos/cartas/elementos.

## Estrutura técnica

- `React 19` para renderização de UI e composição de componentes.
- `TypeScript` para tipagem de entidades de domínio (`Baralho`, `Cartas`, `Elemento`).
- `Vite` para ambiente de desenvolvimento e build.
- `CSS` modularizado por componente/tela.
- `localStorage` para persistência local dos dados do usuário.

## Executando localmente

### Pré-requisitos

- Node.js 18+ (recomendado)
- npm

### Passos

```bash
npm install
npm run dev
```

A aplicação será iniciada em ambiente local via Vite.

## Scripts disponíveis

- `npm run dev`: inicia servidor de desenvolvimento.
- `npm run build`: gera build de produção.
- `npm run preview`: executa preview da build.
- `npm run lint`: analisa o código com ESLint.
- `npm run deploy`: publica a build (GitHub Pages).

## Competências demonstradas

- Modelagem de estado complexo com `useReducer`.
- Arquitetura de componentes reutilizáveis em React.
- Manipulação de formulários e controles dinâmicos.
- Persistência no navegador e sincronização de dados de interface.
- Organização de projeto frontend com TypeScript e Vite.



