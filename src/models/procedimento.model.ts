import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Procedimento extends Entity {
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
    required: true,
  })
  quando: string;

  @property({
    type: 'string',
    required: true,
  })
  idGrupo: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  entradas?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  saidas?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  procedimentosRelacionados?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  passos: string[];

  constructor(data?: Partial<Procedimento>) {
    super(data);
  }
}
