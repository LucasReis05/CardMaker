//Mostra a Carta a ser editada, utiliza o EditorPainel para isso
import Carta from "./Componentes/Carta";
import type { Elemento } from "./Componentes/Types";
import { useRef } from "react";
import EditorPanel from "./Componentes/EditorPainel";
import EditorOpcoes from "./Componentes/EditorOpcoes";


export type EditorProps = {
    onDefineTela: (tela: 'mesa' | 'editor') => void;
    elementosAtuais: Elemento[];
    idSelecionado?: number | null;
    onSelecionarElemento: (id: number) => void;
    onAdicionarElemento: (tipo: 'texto' | 'imagem') => void;
    onModificarElemento: (id: number, chave: string, valor: string | number) => void;
    onSalvarCarta: (nome: string | null) => void;
    onApagarCarta: () => void;
    onDuplicarCarta: () => void;
    cartaIdAtual:number | null;
    corCarta: string;
    cartaNomeAtual: string;
    onAtualizarCor: (cor: string) => void;
    onApagarElemento: (id: number) => void;
}

export default function Editor(
    {onDefineTela,elementosAtuais,idSelecionado,onSelecionarElemento,
    onAdicionarElemento, onModificarElemento, onSalvarCarta,
    onApagarCarta, onDuplicarCarta, cartaIdAtual, corCarta,
    cartaNomeAtual, onAtualizarCor, onApagarElemento}:
    EditorProps) 
    {
        const nomeCartaRef = useRef<string>(cartaNomeAtual);
        
        const onSalvarCartaComNome = () => {
            onSalvarCarta(nomeCartaRef.current);
        };   

        const elementoSelecionado = elementosAtuais.find(element => element.id === idSelecionado);
        return(    
            <div className="editor">
                <h2>Editor de Cartas</h2>
                <button className="btn-acao voltar" onClick={()=>onDefineTela("mesa")}>Voltar</button>
            
                <div className="editorCentral">
                    <EditorOpcoes cartaId = {cartaIdAtual} salvarCarta={onSalvarCartaComNome} apagarCarta={onApagarCarta} duplicarCarta={onDuplicarCarta}/>
                   
            
                    <Carta elementos={elementosAtuais} onSelecionarElemento={onSelecionarElemento} cor={corCarta}/>
                    
                    <EditorPanel
                    onAddElemento={onAdicionarElemento}
                    onAtualizaElemento={onModificarElemento}
                    elementoAtivo={elementoSelecionado}
                    onApagarElemento={onApagarElemento}
                    cor={corCarta}
                    onAtualizarCor={onAtualizarCor}
                    nomeCartaRef={nomeCartaRef}
                    />
                    
                </div>
            </div>

        );
    }