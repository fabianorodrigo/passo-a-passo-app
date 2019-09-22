import { Entity } from '@loopback/repository';
import { Passo } from './passo.model';
export declare class Procedimento extends Entity {
    id: string;
    titulo: string;
    quando: string;
    idGrupo: string;
    entradas?: string[];
    saidas?: string[];
    procedimentosRelacionados?: string[];
    passos: Passo[];
    constructor(data?: Partial<Procedimento>);
}
