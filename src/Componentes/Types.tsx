export type Elemento =  {
    id:number;
    tipo: 'texto' | 'imagem';
    posicaoVertical:number,
    posicaoHorizontal:number,
    conteudo: string;
    cor: string;
    tamanho: number;
    altura?: number;
    largura?: number;
    espessuraFonte: number;
    estiloFonte: 'normal' | 'italic';
}

export type Cartas = {
    id: number;
    nome: string | null;
    dados: Elemento[];
    cor: string;
}

export type Baralho = {
    id: number;
    nome: string;
    cartas: Cartas[];
}
