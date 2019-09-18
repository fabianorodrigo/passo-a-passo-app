import { Entity } from '@loopback/repository';
export declare class Procedimento extends Entity {
    id: string;
    titulo: string;
    quando: string;
    idGrupo: string;
    entradas?: string[];
    saidas?: string[];
    procedimentosRelacionados?: string[];
    passos: string[];
    constructor(data?: Partial<Procedimento>);
}
