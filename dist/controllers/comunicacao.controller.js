"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ComunicacaoController = class ComunicacaoController {
    constructor(comunicacaoRepository) {
        this.comunicacaoRepository = comunicacaoRepository;
    }
    async create(comunicacao) {
        return this.comunicacaoRepository.create(comunicacao);
    }
    async count(where) {
        return this.comunicacaoRepository.count(where);
    }
    async find(filter) {
        return this.comunicacaoRepository.find(filter);
    }
    async updateAll(comunicacao, where) {
        return this.comunicacaoRepository.updateAll(comunicacao, where);
    }
    async findById(id) {
        return this.comunicacaoRepository.findById(id);
    }
    async updateById(id, comunicacao) {
        await this.comunicacaoRepository.updateById(id, comunicacao);
    }
    async replaceById(id, comunicacao) {
        await this.comunicacaoRepository.replaceById(id, comunicacao);
    }
    async deleteById(id) {
        await this.comunicacaoRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/comunicacoes', {
        responses: {
            '200': {
                description: 'Comunicacao model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Comunicacao) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Comunicacao, {
                    title: 'NewComunicacao',
                    exclude: ['id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "create", null);
__decorate([
    rest_1.get('/comunicacoes/count', {
        responses: {
            '200': {
                description: 'Comunicacao model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Comunicacao))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "count", null);
__decorate([
    rest_1.get('/comunicacoes', {
        responses: {
            '200': {
                description: 'Array of Comunicacao model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Comunicacao) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Comunicacao))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "find", null);
__decorate([
    rest_1.patch('/comunicacoes', {
        responses: {
            '200': {
                description: 'Comunicacao PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Comunicacao, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Comunicacao))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Comunicacao, Object]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/comunicacoes/{id}', {
        responses: {
            '200': {
                description: 'Comunicacao model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Comunicacao) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "findById", null);
__decorate([
    rest_1.patch('/comunicacoes/{id}', {
        responses: {
            '204': {
                description: 'Comunicacao PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Comunicacao, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Comunicacao]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "updateById", null);
__decorate([
    rest_1.put('/comunicacoes/{id}', {
        responses: {
            '204': {
                description: 'Comunicacao PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Comunicacao]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/comunicacoes/{id}', {
        responses: {
            '204': {
                description: 'Comunicacao DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComunicacaoController.prototype, "deleteById", null);
ComunicacaoController = __decorate([
    __param(0, repository_1.repository(repositories_1.ComunicacaoRepository)),
    __metadata("design:paramtypes", [repositories_1.ComunicacaoRepository])
], ComunicacaoController);
exports.ComunicacaoController = ComunicacaoController;
//# sourceMappingURL=comunicacao.controller.js.map