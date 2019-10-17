import { Entity } from '@loopback/repository';
export declare class Comunicacao extends Entity {
    id: string;
    procedimento: object;
    data: string;
    mensagem: string;
    excluida: boolean;
    constructor(data?: Partial<Comunicacao>);
}
export interface ComunicacaoRelations {
}
export declare type ComunicacaoWithRelations = Comunicacao & ComunicacaoRelations;
