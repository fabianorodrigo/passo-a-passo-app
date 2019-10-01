import { Model, model, property } from '@loopback/repository';
import { Procedimento } from '.';

@model({ settings: {} })
export class Passo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  idPapel: string;

  @property({
    type: 'string',
    required: false,
  })
  descricao: string;

  @property({
    type: 'object',
    required: false,
  })
  executarProcedimento: Procedimento;

  @property({
    type: 'number',
    required: true,
  })
  ordem: number;

  @property({
    type: 'string',
    required: false,
  })
  dica: string;

  constructor(data?: Partial<Passo>) {
    super(data);
  }
}
