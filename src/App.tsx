import "./App.css";
import { useReducer } from "react";
import BaralhoTela from "./BaralhoTela.tsx";
import Mesa from "./Mesa.tsx";
import Editor from "./Editor.tsx";
import type { Cartas, Elemento, Baralho } from "./Componentes/Types.tsx";

const novoElemento = (tipo: "texto" | "imagem"): Elemento => ({
  id: Date.now(),
  tipo: tipo,
  conteudo: tipo === "texto" ? "TEXTO" : "",
  posicaoHorizontal: 50,
  posicaoVertical: 50,
  cor: "#000000",
  tamanho: 16,
  largura: tipo === "imagem" ? 100 : undefined,
  altura: tipo === "imagem" ? 100 : undefined,
  espessuraFonte: 400,
  estiloFonte: "normal",
});
type AppState = {
  tela: "baralho" | "mesa" | "editor";
  baralhoAtual: Baralho | null;
  baralhosSalvos: Baralho[];
  cartasSalvas: Cartas[];
  corAtual: string;
  cartaIdAtual: number | null;
  elementos: Elemento[];
  idSelecionado: number | null;
};

type AppActions =
  | { type: "DEFINIR_TELA"; tela: "baralho" | "mesa" | "editor" }
  | { type: "CRIAR_BARALHO"; nome: string }
  | { type: "ABRIR_BARALHO"; baralho: Baralho }
  | { type: "SALVAR_BARALHO" }
  | { type: "SELECIONAR_ELEMENTO"; id: number }
  | { type: "ATUALIZAR_COR"; cor: string }
  | { type: "NOVA_CARTA" }
  | { type: "EDITAR_CARTA"; carta: Cartas }
  | { type: "SALVAR_CARTA" }
  | { type: "APAGAR_CARTA" }
  | { type: "DUPLICAR_CARTA" }
  | { type: "ADICIONAR_ELEMENTO"; tipo: "texto" | "imagem" }
  | {
      type: "MODIFICAR_ELEMENTO";
      id: number;
      chave: string;
      valor: string | number;
    }
  | { type: "APAGAR_ELEMENTO"; id: number };

const estadoInicial: AppState = {
  tela: "baralho",
  baralhoAtual: null,
  baralhosSalvos: [],
  cartasSalvas: [],
  corAtual: "#ffffff",
  cartaIdAtual: null,
  elementos: [],
  idSelecionado: null,
};

const reducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "DEFINIR_TELA":
      return { ...state, tela: action.tela };
    case "CRIAR_BARALHO": {
      const novoBaralho: Baralho = {
        id: Date.now(),
        nome: action.nome,
        cartas: [],
      };
      return {
        ...state,
        baralhosSalvos: [...state.baralhosSalvos, novoBaralho],
      };
    }
    case "ABRIR_BARALHO":
      return {
        ...state,
        baralhoAtual: action.baralho,
        cartasSalvas: action.baralho.cartas,
        tela: "mesa",
      };
    case "SALVAR_BARALHO": {
      if (!state.baralhoAtual) return state;
      state.baralhosSalvos = [...state.baralhosSalvos, state.baralhoAtual];
      return {
        ...state,
      };
    }
    case "SELECIONAR_ELEMENTO":
      return { ...state, idSelecionado: action.id };

    case "ADICIONAR_ELEMENTO": {
      const elem = novoElemento(action.tipo);
      return {
        ...state,
        elementos: [...state.elementos, elem],
        idSelecionado: elem.id,
      };
    }
    case "ATUALIZAR_COR":
      return { ...state, corAtual: action.cor };
    case "NOVA_CARTA":
      return {
        ...state,
        elementos: [],
        cartaIdAtual: null,
        idSelecionado: null,
        corAtual: "#ffffff",
        tela: "editor",
      };
    case "EDITAR_CARTA":
      return {
        ...state,
        elementos: action.carta.dados,
        cartaIdAtual: action.carta.id,
        corAtual: action.carta.cor,
        idSelecionado: null,
        tela: "editor",
      };
    case "SALVAR_CARTA": {
      if (state.cartaIdAtual) {
        const cartasAtualizadas = state.cartasSalvas.map((carta) =>
          carta.id === state.cartaIdAtual
            ? { ...carta, dados: state.elementos, cor: state.corAtual }
            : carta,
        );
        return { ...state, cartasSalvas: cartasAtualizadas, tela: "mesa" };
      }
      const novaCarta: Cartas = {
        id: Date.now(),
        dados: state.elementos,
        cor: state.corAtual,
      };
      return {
        ...state,
        cartasSalvas: [...state.cartasSalvas, novaCarta],
        tela: "mesa",
      };
    }
    case "APAGAR_CARTA": {
      if (state.cartaIdAtual === null) return state;
      const cartasRestantes = state.cartasSalvas.filter(
        (carta) => carta.id !== state.cartaIdAtual,
      );
      return { ...state, cartasSalvas: cartasRestantes, tela: "mesa" };
    }
    case "DUPLICAR_CARTA": {
      if (state.cartaIdAtual === null) return state;
      const indice = state.cartasSalvas.findIndex(
        (c) => c.id === state.cartaIdAtual,
      );
      if (indice === -1) return state;
      const original = state.cartasSalvas[indice];
      const copia: Cartas = {
        id: Date.now(),
        dados: [...original.dados],
        cor: original.cor,
      };
      const novasCartas = [...state.cartasSalvas];
      novasCartas.splice(indice + 1, 0, copia);
      return { ...state, cartasSalvas: novasCartas, tela: "mesa" };
    }
    case "MODIFICAR_ELEMENTO":
      return {
        ...state,
        elementos: state.elementos.map((e) =>
          e.id === action.id ? { ...e, [action.chave]: action.valor } : e,
        ),
      };
    case "APAGAR_ELEMENTO":
      return {
        ...state,
        elementos: state.elementos.filter((e) => e.id !== action.id),
        idSelecionado: null,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const criarBaralho = (nome: string) => {
    const novo: Baralho = {
      id: Date.now(),
      nome,
      cartas: [],
    };
    defineBaralhosSalvos((prev) => [...prev, novo]);
  };

  const abrirBaralho = (b: Baralho) => {
    defineBaralhoAtual(b);
    defineCartasSalvas(b.cartas);
    defineTela("mesa");
  };

  const salvarBaralho = () => {
    if (!baralhoAtual) return;
    baralhoAtual.cartas = cartasSalvas;
    defineBaralhosSalvos((prev) =>
      prev.map((item) => (item.id === baralhoAtual.id ? baralhoAtual : item)),
    );
  };

  const selecionarElemento = (id: number) => {
    defineIdSelecionado(id);
  };

  const atualizarCor = (cor: string) => {
    defineCorAtual(cor);
  };
  const novaCarta = () => {
    defineElementos([]);
    defineCartaIdAtual(null);
    defineIdSelecionado(null);
    defineCorAtual("#ffffff");
    defineTela("editor");
  };

  const editarCarta = (carta: Cartas) => {
    defineElementos(carta.dados);
    defineCartaIdAtual(carta.id);
    defineCorAtual(carta.cor);
    defineIdSelecionado(null);
    defineTela("editor");
  };
  const salvarCarta = () => {
    if (cartaIdAtual) {
      defineCartasSalvas((prev) =>
        prev.map((carta) =>
          carta.id === cartaIdAtual
            ? { ...carta, dados: elementos, cor: corAtual }
            : carta,
        ),
      );
    } else {
      const novaCarta: Cartas = {
        id: Date.now(),
        dados: elementos,
        cor: corAtual,
      };
      defineCartasSalvas((prev) => [...prev, novaCarta]);
    }

    defineTela("mesa");
  };

  const apagarCarta = () => {
    if (cartaIdAtual !== null) {
      defineCartasSalvas((prev) =>
        prev.filter((carta) => carta.id !== cartaIdAtual),
      );
      defineTela("mesa");
    }
  };

  const duplicarCarta = () => {
    dispatch({ type:"DUPLICAR_CARTA"})
  };

  const adicionarElemento = (tipo: "texto" | "imagem") => {
    dispatch({ type: "ADICIONAR_ELEMENTO", tipo})
  };

  const modificarElemento = (
    id: number,
    chave: string,
    valor: string | number,
  ) => {
    defineElementos((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [chave]: valor } : e)),
    );
  };

  const apagarElemento = (id: number) => {
    dispatch({ type: "APAGAR_ELEMENTO", id });
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="titulo">Meu TCG</h1>
      </header>

      {tela === "baralho" && (
        <BaralhoTela
          baralhos={baralhosSalvos}
          onCriarBaralho={criarBaralho}
          onAbrirBaralho={abrirBaralho}
        />
      )}

      {tela === "mesa" && (
        <Mesa
          cartasSalvas={cartasSalvas}
          baralhoAtual={baralhoAtual}
          onNovaCarta={novaCarta}
          onEditarCarta={editarCarta}
          onSalvarBaralho={salvarBaralho}
          onVoltarMenu={() => defineTela("baralho")}
        />
      )}

      {tela === "editor" && (
        <Editor
          onDefineTela={defineTela}
          onSelecionarElemento={selecionarElemento}
          onAdicionarElemento={adicionarElemento}
          onModificarElemento={modificarElemento}
          onSalvarCarta={salvarCarta}
          onApagarCarta={apagarCarta}
          onDuplicarCarta={duplicarCarta}
          onAtualizarCor={atualizarCor}
          onApagarElemento={apagarElemento}
          cartaIdAtual={cartaIdAtual}
          corCarta={corAtual}
          elementosAtuais={elementos}
          idSelecionado={idSelecionado}
        />
      )}

      <footer className="footer">
        <p>CardMaker 2025.</p>
      </footer>
    </div>
  );
}

export default App;
