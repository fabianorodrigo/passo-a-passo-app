import { Model } from '@loopback/repository';
export declare class Email extends Model {
    tituloProcedimento: string;
    mensagem: string;
    constructor(data?: Partial<Email>);
}
export interface EmailRelations {
}
export declare type EmailWithRelations = Email & EmailRelations;
