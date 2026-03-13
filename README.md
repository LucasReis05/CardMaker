# CardMaker TCG

Aplicacao web para criacao e gerenciamento de cartas colecionaveis personalizadas, organizada por baralhos. O projeto foi desenvolvido como frontend em React + TypeScript, com foco em modelagem de estado, componentizacao e experiencia de edicao visual.

## Contexto do projeto

Este projeto simula uma plataforma de edicao de cartas no estilo TCG (Trading Card Game), em que o usuario:

1. Cria baralhos.
2. Adiciona cartas em cada baralho.
3. Edita visualmente o conteudo de cada carta.
4. Salva o progresso localmente no navegador.

O objetivo principal foi construir uma interface funcional e intuitiva para composicao de layout, com controle de elementos textuais e imagens em um canvas de carta.

## Funcionalidades implementadas

- Criacao, abertura e exclusao de baralhos.
- Persistencia dos baralhos no `localStorage`.
- Criacao de novas cartas dentro de um baralho.
- Edicao de cartas existentes.
- Duplicacao e exclusao de cartas.
- Edicao visual por elementos na carta (texto e imagem).
- Controles de texto: conteudo, posicao, cor, tamanho, espessura e estilo da fonte.
- Controles de imagem: URL/conteudo, posicao, largura e altura.
- Definicao da cor de fundo da carta.
- Navegacao por telas: `Baralho -> Mesa -> Editor`.

## Como a aplicacao funciona

O fluxo principal e dividido em tres telas:

- `BaralhoTela`: lista os baralhos existentes e permite criar novos.
- `Mesa`: exibe as miniaturas das cartas do baralho selecionado e permite abrir uma carta para edicao.
- `Editor`: area de customizacao da carta, com painel de opcoes e controles do elemento selecionado.

A camada de estado global da aplicacao utiliza `useReducer` (arquivo `src/App.tsx`) para centralizar as regras de negocio, incluindo acoes de criacao, edicao, duplicacao e remocao de baralhos/cartas/elementos.

## Estrutura tecnica

- `React 19` para renderizacao de UI e composicao de componentes.
- `TypeScript` para tipagem de entidades de dominio (`Baralho`, `Cartas`, `Elemento`).
- `Vite` para ambiente de desenvolvimento e build.
- `CSS` modularizado por componente/tela.
- `localStorage` para persistencia local dos dados do usuario.

## Executando localmente

### Pre-requisitos

- Node.js 18+ (recomendado)
- npm

### Passos

```bash
npm install
npm run dev
```

A aplicacao sera iniciada em ambiente local via Vite.

## Scripts disponiveis

- `npm run dev`: inicia servidor de desenvolvimento.
- `npm run build`: gera build de producao.
- `npm run preview`: executa preview da build.
- `npm run lint`: analisa o codigo com ESLint.
- `npm run deploy`: publica a build (GitHub Pages).

## Competencias demonstradas

- Modelagem de estado complexo com `useReducer`.
- Arquitetura de componentes reutilizaveis em React.
- Manipulacao de formularios e controles dinamicos.
- Persistencia no navegador e sincronizacao de dados de interface.
- Organizacao de projeto frontend com TypeScript e Vite.



