//tela inicial onde são mostradas todas as cartas, se houver, no baralho. Ao selecionar alguma, muda para a tela do editor
import type {Baralho, Cartas} from './Componentes/Types.tsx';
import Carta from './Componentes/Carta.tsx';

type MesaProps = {
    cartasSalvas: Cartas[];
    onNovaCarta: (nome: string | null) => void;
    onEditarCarta: (carta: Cartas) => void;
    onVoltarMenu: () => void;
    onSalvarBaralho: () => void;
    baralhoAtual: Baralho | null;
}

export default function Mesa({cartasSalvas, onNovaCarta, onEditarCarta, onVoltarMenu, onSalvarBaralho, baralhoAtual}: MesaProps) {
    return (    
        <div className="mesa">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
            <button className='btn-acao voltar' onClick={onVoltarMenu}>Voltar</button>
            <button className='btn-acao salvar' onClick={onSalvarBaralho}>Salvar</button>
        </div>
        <div>
            <h2> {baralhoAtual?.nome}</h2>
            

            <div className="exibeCartas">
                {cartasSalvas.map(c => (
                <div 
                    key={c.id} 
                    className="cartaInicial" 
                    onClick={() => onEditarCarta(c)}
                ><p>{c.nome}</p>

                <div className="cartaMiniatura">

                    <Carta elementos={c.dados} cor={c.cor} onSelecionarElemento={()=>{}}  />

                </div>

                </div>

                ))}

                <div className="cartaInicial novaCarta" onClick={() => onNovaCarta(null)}>
                    <div className="cartaMiniatura">
                        <div className="cartaPlaceholder">+</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    );
}