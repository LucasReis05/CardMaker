//tela inicial onde são mostradas todas as cartas, se houver, no baralho. Ao selecionar alguma, muda para a tela do editor
import type {Baralho, Cartas} from './Componentes/Types.tsx';
import Carta from './Componentes/Carta.tsx';

type MesaProps = {
    cartasSalvas: Cartas[];
    onNovaCarta: (nome: string) => void;
    onEditarCarta: (carta: Cartas) => void;
    onVoltarMenu: () => void;
    onSalvarBaralho: () => void;
    onApagarBaralho: (id: number) => void;
    baralhoAtual: Baralho | null;
}

export default function Mesa({cartasSalvas, onNovaCarta, onEditarCarta, onVoltarMenu, onSalvarBaralho, onApagarBaralho, baralhoAtual}: MesaProps) {
    return (    
        <div className="mesa">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
            <button className='btn-acao voltar' onClick={onVoltarMenu}>Voltar</button>
            <button className='btn-acao salvar' onClick={onSalvarBaralho}>Salvar Baralho</button>
             {baralhoAtual && (<button className='btn-acao apagar' onClick={() => onApagarBaralho(baralhoAtual.id)}>Apagar Baralho</button>
    )}
        </div>
        <div>
            <h2> {baralhoAtual?.nome}</h2>
            

            <div className="exibeCartas">
                {cartasSalvas.map(c => (
                <div 
                    key={c.id} 
                    className="cartaInicial" 
                    onClick={() => onEditarCarta(c)}
                >

                <div className="cartaMiniatura">

                    <Carta elementos={c.dados} cor={c.cor} onSelecionarElemento={()=>{}}  />

                </div>
                <p className="nomeCarta">{c.nome}</p>
                </div>

                ))}

                <div className="cartaInicial novaCarta" onClick={() => onNovaCarta('')}>
                    <div className="cartaMiniatura">
                        <div className="cartaPlaceholder">+</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    );
}