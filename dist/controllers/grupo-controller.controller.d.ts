import { Count, Filter, Where } from '@loopback/repository';
import { Grupo } from '../models';
import { GrupoRepository } from '../repositories';
export declare class GrupoControllerController {
    grupoRepository: GrupoRepository;
    constructor(grupoRepository: GrupoRepository);
    create(grupo: Grupo): Promise<Grupo>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Grupo[]>;
    updateAll(grupo: Grupo, where?: Where): Promise<Count>;
    findById(id: string): Promise<Grupo>;
    updateById(id: string, grupo: Grupo): Promise<void>;
    replaceById(id: string, grupo: Grupo): Promise<void>;
    deleteById(id: string): Promise<void>;
}
