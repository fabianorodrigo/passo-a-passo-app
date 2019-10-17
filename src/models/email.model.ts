import {Model, model, property} from '@loopback/repository';

@model()
export class Email extends Model {
  @property({
    type: 'string',
    required: true,
  })
  tituloProcedimento: string;

  @property({
    type: 'string',
    required: true,
  })
  mensagem: string;


  constructor(data?: Partial<Email>) {
    super(data);
  }
}

export interface EmailRelations {
  // describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
