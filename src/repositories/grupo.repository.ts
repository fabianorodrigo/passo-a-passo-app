import {DefaultCrudRepository} from '@loopback/repository';
import {Grupo} from '../models';
import {PassoApassoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id
> {
  constructor(
    @inject('datasources.passoApassoDS') dataSource: PassoApassoDsDataSource,
  ) {
    super(Grupo, dataSource);
  }
}
