import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string;
  
  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'number',
    required: false,
  })
  ordem: number;

  @property({
    type: 'string',
  })
  grupoPai?: string;


  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}
