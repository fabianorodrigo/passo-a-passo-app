import {Entity, model, property} from '@loopback/repository';

@model()
export class Comunicacao extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string;

  @property({
    type: 'object',
    required: true,
  })
  procedimento: object;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'string',
    required: true,
  })
  mensagem: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  excluida: boolean;

  constructor(data?: Partial<Comunicacao>) {
    super(data);
  }
}

export interface ComunicacaoRelations {
  // describe navigational properties here
}

export type ComunicacaoWithRelations = Comunicacao & ComunicacaoRelations;
