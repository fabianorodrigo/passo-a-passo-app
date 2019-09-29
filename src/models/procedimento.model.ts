import { Entity, model, property } from '@loopback/repository';
import { Passo } from './passo.model';

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

  @property.array(Passo,{
    required: true
  })
  passos: Passo[];

  constructor(data?: Partial<Procedimento>) {
    super(data);
  }
}
