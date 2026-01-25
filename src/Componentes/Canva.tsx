import type { CSSProperties } from "react";
import type { Elemento } from "./Types.tsx";

type CanvaProps = {
    elementos: Elemento[];
    onSelecionar: (id: number) => void;
}

export default function Canva({elementos, onSelecionar}: CanvaProps) {
    if (elementos.length === 0) return <div className="vazio" style={{color: "gray"}}>Adicione algo...</div>;
    return (
        <div >
            {elementos.map((item) => {
                const style:  CSSProperties = {
                position: 'absolute',
                left: `${item.posicaoHorizontal}px`,
                top: `${item.posicaoVertical}px`,
                color: item.cor,
                fontSize: `${item.tamanho}px`,
                cursor: 'pointer',
                fontWeight: item.espessuraFonte,
                fontStyle: item.estiloFonte
                };

                if(item.tipo === 'imagem') {
                    const imgStyle: CSSProperties = {
                        position: 'absolute',
                        left: `${item.posicaoHorizontal}px`,
                        top: `${item.posicaoVertical}px`,
                        width: item.largura ? `${item.largura}px` : '100px',
                        height: item.altura ? `${item.altura}px` : '100px',
                        cursor: 'pointer',
                        
                    };
                    return <img key={item.id} src={item.conteudo} style={imgStyle} onClick={() => onSelecionar(item.id)} />;
                }
                return <div key={item.id} style={style} onClick={() => onSelecionar(item.id)}>{item.conteudo}</div>;
            })}
            
        </div>
    );
}


