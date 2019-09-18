import { Count, Filter, Where } from '@loopback/repository';
import { Procedimento } from '../models';
import { ProcedimentoRepository } from '../repositories';
export declare class ProcedimentoControllerController {
    procedimentoRepository: ProcedimentoRepository;
    constructor(procedimentoRepository: ProcedimentoRepository);
    create(procedimento: Procedimento): Promise<Procedimento>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Procedimento[]>;
    updateAll(procedimento: Procedimento, where?: Where): Promise<Count>;
    findById(id: string): Promise<Procedimento>;
    updateById(id: string, procedimento: Procedimento): Promise<void>;
    replaceById(id: string, procedimento: Procedimento): Promise<void>;
    deleteById(id: string): Promise<void>;
}
