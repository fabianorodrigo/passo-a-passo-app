import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class Passo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  idPapel: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
  })
  ordem: number;


  constructor(data?: Partial<Passo>) {
    super(data);
  }
}
