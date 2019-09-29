import {
  DefaultCrudRepository,
  Class,
  Filter,
  Options,
} from '@loopback/repository';
import { Procedimento } from '../models';
import { PassoApassoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ProcedimentoRepository extends DefaultCrudRepository<
  Procedimento,
  typeof Procedimento.prototype.id
> {
  constructor(
    @inject('datasources.passoApassoDS') dataSource: PassoApassoDsDataSource,
  ) {
    super(Procedimento, dataSource);
  }

  /*public findEager(
    modelClass: Class<Procedimento>,
    filter: Filter<Account>,
    options: Options,
  ): Promise<Procedimento[]> {
    const teste = this;
    return new Promise<Procedimento[]>(async function(resolve, reject) {
      const procedimentos = await teste.find(filter, options);
      procedimentos.forEach(proc => {
        proc.passos.forEach(passo => {
          if (passo.executarId != null && passo.executarId != '') {
            passo.executarProcedimento = teste.findById(passo.executarId);
          }
        });
      });
      resolve(procedimentos);
    });
  }*/
}
