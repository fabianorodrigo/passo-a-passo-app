import {DefaultCrudRepository} from '@loopback/repository';
import {Procedimento} from '../models';
import {PassoApassoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcedimentoRepository extends DefaultCrudRepository<
  Procedimento,
  typeof Procedimento.prototype.id
> {
  constructor(
    @inject('datasources.passoApassoDS') dataSource: PassoApassoDsDataSource,
  ) {
    super(Procedimento, dataSource);
  }
}
