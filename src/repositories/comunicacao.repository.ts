import {DefaultCrudRepository} from '@loopback/repository';
import {Comunicacao} from '../models';
import {PassoApassoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ComunicacaoRepository extends DefaultCrudRepository<
  Comunicacao,
  typeof Comunicacao.prototype.id
> {
  constructor(
    @inject('datasources.passoApassoDS') dataSource: PassoApassoDsDataSource,
  ) {
    super(Comunicacao, dataSource);
  }
}
