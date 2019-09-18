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
import {Grupo} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoControllerController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository : GrupoRepository,
  ) {}

  @post('/grupos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: {'x-ts-type': Grupo}}},
      },
    },
  })
  async create(@requestBody() grupo: Grupo): Promise<Grupo> {
    return await this.grupoRepository.create(grupo);
  }

  @get('/grupos/count', {
    responses: {
      '200': {
        description: 'Grupo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where,
  ): Promise<Count> {
    return await this.grupoRepository.count(where);
  }

  @get('/grupos', {
    responses: {
      '200': {
        description: 'Array of Grupo model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Grupo}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Grupo)) filter?: Filter,
  ): Promise<Grupo[]> {
    return await this.grupoRepository.find(filter);
  }

  @patch('/grupos', {
    responses: {
      '200': {
        description: 'Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() grupo: Grupo,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where,
  ): Promise<Count> {
    return await this.grupoRepository.updateAll(grupo, where);
  }

  @get('/grupos/{id}', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: {'x-ts-type': Grupo}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Grupo> {
    return await this.grupoRepository.findById(id);
  }

  @patch('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.updateById(id, grupo);
  }

  @put('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.replaceById(id, grupo);
  }

  @del('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.grupoRepository.deleteById(id);
  }
}
