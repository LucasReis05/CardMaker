import type { ChangeEvent} from 'react';
import { useRef, useState } from 'react';
import type { Elemento } from './Types.tsx';
import EditorInputs from './EditorInputs.tsx';
import '../Estilos/EditorPainel.css';

type EditorPanelProps = {
  elementoAtivo?: Elemento;
  onAtualizaElemento: (id: number, chave: string, valor: string | number) => void;
  onAddElemento: (tipo: 'texto' | 'imagem') => void;
  onApagarElemento: (id: number) => void;
  cor: string;
  onAtualizarCor: (cor: string) => void;
  nomeCartaRef: React.RefObject<string>;
}


export default function EditorPanel({ elementoAtivo, onAtualizaElemento, onAddElemento, onApagarElemento, cor, onAtualizarCor, nomeCartaRef}: EditorPanelProps) {
  const [menuAberto, defineMenuAberto] = useState(false);
  const nomeCartaInputRef = useRef<HTMLInputElement>(null);
  
  const atualizarNomeNoRef = () => {
    if (nomeCartaInputRef.current) {
      nomeCartaRef.current = nomeCartaInputRef.current.value;
    }
  };
  
  const alterarElemento = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
  {
    const { name, value } = e.target;
    if (elementoAtivo) {
      onAtualizaElemento(elementoAtivo.id, name, value);
    }
  };

  const adicionarElemento = (tipo: 'texto' | 'imagem') => {
    onAddElemento(tipo);
    defineMenuAberto(false);
  };

  return (
    <div className="editor-painel">

      <button 
        className="adicionarEditor" 
        onClick={() => defineMenuAberto(!menuAberto)}
        title="Adicionar elemento"
      >
      +
      </button>

      {menuAberto && (
        <div className="menuAdicionar">
          <button onClick={() => adicionarElemento('texto')}>📝 Adicionar Texto</button>
          <button onClick={() => adicionarElemento('imagem')}>🖼️ Adicionar Imagem</button>
          <div style={{display: 'flex', flexDirection: 'row', gap: ' 10px' }}>
          <p>Cor da Carta:</p> 
          <input style={{display: 'inline'}} type="color" name="corCarta" value={cor} onChange={e => onAtualizarCor(e.target.value)}/>
          </div>
          <input ref={nomeCartaInputRef} type="text" defaultValue={nomeCartaRef.current} placeholder="Nome da carta" onChange={atualizarNomeNoRef} />
         
        </div>
      )}

      {elementoAtivo && <EditorInputs elemento={elementoAtivo} onAlterarElemento={alterarElemento} onApagarElemento={onApagarElemento} />}
    </div>
  );
}