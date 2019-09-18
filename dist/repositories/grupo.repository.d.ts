import { DefaultCrudRepository } from '@loopback/repository';
import { Grupo } from '../models';
import { PassoApassoDsDataSource } from '../datasources';
export declare class GrupoRepository extends DefaultCrudRepository<Grupo, typeof Grupo.prototype.id> {
    constructor(dataSource: PassoApassoDsDataSource);
}
