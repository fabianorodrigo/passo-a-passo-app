import { DefaultCrudRepository } from '@loopback/repository';
import { Procedimento } from '../models';
import { PassoApassoDsDataSource } from '../datasources';
export declare class ProcedimentoRepository extends DefaultCrudRepository<Procedimento, typeof Procedimento.prototype.id> {
    constructor(dataSource: PassoApassoDsDataSource);
}
