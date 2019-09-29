import { Model } from '@loopback/repository';
import { Procedimento } from '.';
export declare class Passo extends Model {
    idPapel: string;
    descricao: string;
    executarProcedimento: Procedimento;
    ordem: number;
    constructor(data?: Partial<Passo>);
}
