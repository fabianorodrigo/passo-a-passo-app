import { Entity } from '@loopback/repository';
export declare class Papel extends Entity {
    id: string;
    titulo: string;
    descricao: string;
    constructor(data?: Partial<Papel>);
}
