import { Entity } from '@loopback/repository';
export declare class Grupo extends Entity {
    id: string;
    titulo: string;
    ordem: number;
    grupoPai?: string;
    constructor(data?: Partial<Grupo>);
}
