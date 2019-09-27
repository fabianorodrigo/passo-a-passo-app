import { Model } from '@loopback/repository';
export declare class Passo extends Model {
    idPapel: string;
    descricao: string;
    executarId: string;
    markdown: string;
    ordem: number;
    constructor(data?: Partial<Passo>);
}
