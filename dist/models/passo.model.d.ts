import { Model } from '@loopback/repository';
export declare class Passo extends Model {
    idPapel: string;
    descricao: string;
    ordem: number;
    constructor(data?: Partial<Passo>);
}
