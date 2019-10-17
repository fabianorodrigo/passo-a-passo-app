import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Comunicacao} from '../models';
import {ComunicacaoRepository} from '../repositories';

export class ComunicacaoController {
  constructor(
    @repository(ComunicacaoRepository)
    public comunicacaoRepository : ComunicacaoRepository,
  ) {}

  @post('/comunicacoes', {
    responses: {
      '200': {
        description: 'Comunicacao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comunicacao)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunicacao, {
            title: 'NewComunicacao',
            exclude: ['id'],
          }),
        },
      },
    })
    comunicacao: Omit<Comunicacao, 'id'>,
  ): Promise<Comunicacao> {
    return this.comunicacaoRepository.create(comunicacao);
  }

  @get('/comunicacoes/count', {
    responses: {
      '200': {
        description: 'Comunicacao model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Comunicacao)) where?: Where<Comunicacao>,
  ): Promise<Count> {
    return this.comunicacaoRepository.count(where);
  }

  @get('/comunicacoes', {
    responses: {
      '200': {
        description: 'Array of Comunicacao model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comunicacao)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Comunicacao)) filter?: Filter<Comunicacao>,
  ): Promise<Comunicacao[]> {
    return this.comunicacaoRepository.find(filter);
  }

  @patch('/comunicacoes', {
    responses: {
      '200': {
        description: 'Comunicacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunicacao, {partial: true}),
        },
      },
    })
    comunicacao: Comunicacao,
    @param.query.object('where', getWhereSchemaFor(Comunicacao)) where?: Where<Comunicacao>,
  ): Promise<Count> {
    return this.comunicacaoRepository.updateAll(comunicacao, where);
  }

  @get('/comunicacoes/{id}', {
    responses: {
      '200': {
        description: 'Comunicacao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comunicacao)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Comunicacao> {
    return this.comunicacaoRepository.findById(id);
  }

  @patch('/comunicacoes/{id}', {
    responses: {
      '204': {
        description: 'Comunicacao PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunicacao, {partial: true}),
        },
      },
    })
    comunicacao: Comunicacao,
  ): Promise<void> {
    await this.comunicacaoRepository.updateById(id, comunicacao);
  }

  @put('/comunicacoes/{id}', {
    responses: {
      '204': {
        description: 'Comunicacao PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comunicacao: Comunicacao,
  ): Promise<void> {
    await this.comunicacaoRepository.replaceById(id, comunicacao);
  }

  @del('/comunicacoes/{id}', {
    responses: {
      '204': {
        description: 'Comunicacao DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comunicacaoRepository.deleteById(id);
  }
}
