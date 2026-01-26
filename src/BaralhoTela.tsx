import { useState } from "react";
import type { Baralho } from "./Componentes/Types";

type BaralhoProps = {
  baralhos: Baralho[];
  onCriarBaralho: (nome: string) => void;
  onAbrirBaralho: (b: Baralho) => void;
  onApagarBaralho: (id: number) => void;
}

export default function BaralhoTela({ baralhos, onCriarBaralho, onAbrirBaralho, onApagarBaralho }: BaralhoProps) {
  const [nomeDigitado, setNomeDigitado] = useState("");

  const confirmarCriacao = () => {
    if (nomeDigitado.trim() === "") return;
    onCriarBaralho(nomeDigitado.trim());
    setNomeDigitado("");
  };

  return (
    <div className="baralho-container">

      <h2 className="titulo-baralho">Baralhos</h2>

      <div className="criador-baralho">
        <input
          type="text"
          placeholder="Nome do baralho"
          value={nomeDigitado}
          onChange={(e) => setNomeDigitado(e.target.value)}
          className="input-baralho"
        />

        <button onClick={confirmarCriacao} className="btn-criar">
          Criar
        </button>
      </div>

      <div className="lista-baralhos">
        {baralhos.length === 0 && (
          <p className="vazio">Nenhum baralho criado ainda.</p>
        )}

        {baralhos.map((b) => (
          <div
            key={b.id}
            className="item-baralho"
            onClick={() => onAbrirBaralho(b)}
          >
            <p>{b.nome}</p>
            <small>{b.cartas.length} cartas</small>

          <button
            className="btn-apagar-baralho"
            onClick={(e) => {
              e.stopPropagation();
              onApagarBaralho(b.id);
            }}
          >🗑️</button>

          </div>
        ))}
      </div>
    </div>
  );
}
