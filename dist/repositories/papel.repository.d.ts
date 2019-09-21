import { DefaultCrudRepository } from '@loopback/repository';
import { Papel } from '../models';
import { PassoApassoDsDataSource } from '../datasources';
export declare class PapelRepository extends DefaultCrudRepository<Papel, typeof Papel.prototype.id> {
    constructor(dataSource: PassoApassoDsDataSource);
}
