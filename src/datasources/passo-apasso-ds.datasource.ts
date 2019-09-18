import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './passo-apasso-ds.datasource.json';

export class PassoApassoDsDataSource extends juggler.DataSource {
  static dataSourceName = 'passoApassoDS';

  constructor(
    @inject('datasources.config.passoApassoDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
