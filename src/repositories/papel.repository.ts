import {DefaultCrudRepository} from '@loopback/repository';
import {Papel} from '../models';
import {PassoApassoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PapelRepository extends DefaultCrudRepository<
  Papel,
  typeof Papel.prototype.id
> {
  constructor(
    @inject('datasources.passoApassoDS') dataSource: PassoApassoDsDataSource,
  ) {
    super(Papel, dataSource);
  }
}
