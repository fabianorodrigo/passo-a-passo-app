import { DefaultCrudRepository } from '@loopback/repository';
import { Comunicacao } from '../models';
import { PassoApassoDsDataSource } from '../datasources';
export declare class ComunicacaoRepository extends DefaultCrudRepository<Comunicacao, typeof Comunicacao.prototype.id> {
    constructor(dataSource: PassoApassoDsDataSource);
}
