import type { Elemento } from "./Types.tsx";
import type { ChangeEvent } from "react";   

type EditorInputsProps = {
    elemento: Elemento;
    onAlterarElemento: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onApagarElemento: (id: number) => void;
}

export default function EditorInputs({elemento, onAlterarElemento, onApagarElemento}: EditorInputsProps)
{
    return (
    <>
        <div className="formulario">
            <label>Conteúdo</label>
            <input type="text" name="conteudo" value={elemento.conteudo} onChange={onAlterarElemento} />

            <label >Posição Horizontal</label>
            <input type="range" name="posicaoHorizontal" min={-25} max={400} value={elemento.posicaoHorizontal} onChange={onAlterarElemento} />

            <label >Posição Vertical</label>
            <input type="range" name="posicaoVertical" min={-40} max={550} value={elemento.posicaoVertical} onChange={onAlterarElemento} />

            {elemento.tipo === 'texto' && (
            <>
                <label>Cor</label>
                <input type="color" name="cor" value={elemento.cor} onChange={onAlterarElemento} />

                <label >Tamanho da Fonte</label>
                <input type="range" min= {8} max={80} name="tamanho" value={elemento.tamanho} onChange={onAlterarElemento} />

                <label >Espessura da Fonte</label>
                <input type = "range" min ={0} max ={1000} name = "espessuraFonte" value = {elemento.espessuraFonte} onChange={onAlterarElemento} />

                <label>Estilo da Fonte</label>
                <select name="estiloFonte" value={elemento.estiloFonte} onChange={onAlterarElemento}>
                    <option value="normal">Normal</option>
                    <option value="italic">Itálico</option>
                </select>
            </>
            )}
            {elemento.tipo === 'imagem' && (
            <>
                <label>Altura</label>
                <input type="range" name="altura" min={5} max={400} value={elemento.altura || 100} onChange={onAlterarElemento} /> 

                <label>Largura</label>
                <input type="range" name="largura" min={5} max={400} value={elemento.largura || 100} onChange={onAlterarElemento} /> 
            </>
            )}
            <button onClick={() => onApagarElemento(elemento.id)}>🗑️</button>
        </div>
    </>
    )
}