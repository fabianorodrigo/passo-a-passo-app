import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Teste extends Entity {
  @property({
    type: 'array',
    itemType: 'object',
  })
  tutu?: object[];


  constructor(data?: Partial<Teste>) {
    super(data);
  }
}
