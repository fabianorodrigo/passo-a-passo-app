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
import { Papel } from '../models';
import { PapelRepository } from '../repositories';

export class PapelControllerController {
  constructor(
    @repository(PapelRepository)
    public papelRepository: PapelRepository,
  ) {}

  @post('/papeis', {
    responses: {
      '200': {
        description: 'Papel model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Papel } } },
      },
    },
  })
  async create(@requestBody() papel: Papel): Promise<Papel> {
    return await this.papelRepository.create(papel);
  }

  @get('/papeis/count', {
    responses: {
      '200': {
        description: 'Papel model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Papel)) where?: Where,
  ): Promise<Count> {
    return await this.papelRepository.count(where);
  }

  @get('/papeis', {
    responses: {
      '200': {
        description: 'Array of Papel model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Papel } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Papel)) filter?: Filter,
  ): Promise<Papel[]> {
    return await this.papelRepository.find(filter);
  }

  @patch('/papeis', {
    responses: {
      '200': {
        description: 'Papel PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() papel: Papel,
    @param.query.object('where', getWhereSchemaFor(Papel)) where?: Where,
  ): Promise<Count> {
    return await this.papelRepository.updateAll(papel, where);
  }

  @get('/papeis/{id}', {
    responses: {
      '200': {
        description: 'Papel model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Papel } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Papel> {
    return await this.papelRepository.findById(id);
  }

  @patch('/papeis/{id}', {
    responses: {
      '204': {
        description: 'Papel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() papel: Papel,
  ): Promise<void> {
    await this.papelRepository.updateById(id, papel);
  }

  @put('/papeis/{id}', {
    responses: {
      '204': {
        description: 'Papel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() papel: Papel,
  ): Promise<void> {
    await this.papelRepository.replaceById(id, papel);
  }

  @del('/papeis/{id}', {
    responses: {
      '204': {
        description: 'Papel DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.papelRepository.deleteById(id);
  }
}
