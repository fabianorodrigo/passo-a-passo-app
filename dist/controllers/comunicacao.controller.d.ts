import { Count, Filter, Where } from '@loopback/repository';
import { Comunicacao } from '../models';
import { ComunicacaoRepository } from '../repositories';
export declare class ComunicacaoController {
    comunicacaoRepository: ComunicacaoRepository;
    constructor(comunicacaoRepository: ComunicacaoRepository);
    create(comunicacao: Omit<Comunicacao, 'id'>): Promise<Comunicacao>;
    count(where?: Where<Comunicacao>): Promise<Count>;
    find(filter?: Filter<Comunicacao>): Promise<Comunicacao[]>;
    updateAll(comunicacao: Comunicacao, where?: Where<Comunicacao>): Promise<Count>;
    findById(id: string): Promise<Comunicacao>;
    updateById(id: string, comunicacao: Comunicacao): Promise<void>;
    replaceById(id: string, comunicacao: Comunicacao): Promise<void>;
    deleteById(id: string): Promise<void>;
}
