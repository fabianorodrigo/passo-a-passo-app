import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Papel extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  descricao: string;

  constructor(data?: Partial<Papel>) {
    super(data);
  }
}
