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
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Procedimento} from '../models';
import {ProcedimentoRepository} from '../repositories';

export class ProcedimentoControllerController {
  constructor(
    @repository(ProcedimentoRepository)
    public procedimentoRepository : ProcedimentoRepository,
  ) {}

  @post('/procedimentos', {
    responses: {
      '200': {
        description: 'Procedimento model instance',
        content: {'application/json': {schema: {'x-ts-type': Procedimento}}},
      },
    },
  })
  async create(@requestBody() procedimento: Procedimento): Promise<Procedimento> {
    return await this.procedimentoRepository.create(procedimento);
  }

  @get('/procedimentos/count', {
    responses: {
      '200': {
        description: 'Procedimento model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Procedimento)) where?: Where,
  ): Promise<Count> {
    return await this.procedimentoRepository.count(where);
  }

  @get('/procedimentos', {
    responses: {
      '200': {
        description: 'Array of Procedimento model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Procedimento}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Procedimento)) filter?: Filter,
  ): Promise<Procedimento[]> {
    return await this.procedimentoRepository.find(filter);
  }

  @patch('/procedimentos', {
    responses: {
      '200': {
        description: 'Procedimento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() procedimento: Procedimento,
    @param.query.object('where', getWhereSchemaFor(Procedimento)) where?: Where,
  ): Promise<Count> {
    return await this.procedimentoRepository.updateAll(procedimento, where);
  }

  @get('/procedimentos/{id}', {
    responses: {
      '200': {
        description: 'Procedimento model instance',
        content: {'application/json': {schema: {'x-ts-type': Procedimento}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Procedimento> {
    return await this.procedimentoRepository.findById(id);
  }

  @patch('/procedimentos/{id}', {
    responses: {
      '204': {
        description: 'Procedimento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() procedimento: Procedimento,
  ): Promise<void> {
    await this.procedimentoRepository.updateById(id, procedimento);
  }

  @put('/procedimentos/{id}', {
    responses: {
      '204': {
        description: 'Procedimento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() procedimento: Procedimento,
  ): Promise<void> {
    await this.procedimentoRepository.replaceById(id, procedimento);
  }

  @del('/procedimentos/{id}', {
    responses: {
      '204': {
        description: 'Procedimento DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.procedimentoRepository.deleteById(id);
  }
}
