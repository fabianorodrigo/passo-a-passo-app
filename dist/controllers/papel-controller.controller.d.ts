import { Count, Filter, Where } from '@loopback/repository';
import { Papel } from '../models';
import { PapelRepository } from '../repositories';
export declare class PapelControllerController {
    papelRepository: PapelRepository;
    constructor(papelRepository: PapelRepository);
    create(papel: Papel): Promise<Papel>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Papel[]>;
    updateAll(papel: Papel, where?: Where): Promise<Count>;
    findById(id: string): Promise<Papel>;
    updateById(id: string, papel: Papel): Promise<void>;
    replaceById(id: string, papel: Papel): Promise<void>;
    deleteById(id: string): Promise<void>;
}
