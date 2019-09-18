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
let ProcedimentoControllerController = class ProcedimentoControllerController {
    constructor(procedimentoRepository) {
        this.procedimentoRepository = procedimentoRepository;
    }
    async create(procedimento) {
        return await this.procedimentoRepository.create(procedimento);
    }
    async count(where) {
        return await this.procedimentoRepository.count(where);
    }
    async find(filter) {
        return await this.procedimentoRepository.find(filter);
    }
    async updateAll(procedimento, where) {
        return await this.procedimentoRepository.updateAll(procedimento, where);
    }
    async findById(id) {
        return await this.procedimentoRepository.findById(id);
    }
    async updateById(id, procedimento) {
        await this.procedimentoRepository.updateById(id, procedimento);
    }
    async replaceById(id, procedimento) {
        await this.procedimentoRepository.replaceById(id, procedimento);
    }
    async deleteById(id) {
        await this.procedimentoRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/procedimentos', {
        responses: {
            '200': {
                description: 'Procedimento model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Procedimento } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Procedimento]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "create", null);
__decorate([
    rest_1.get('/procedimentos/count', {
        responses: {
            '200': {
                description: 'Procedimento model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Procedimento))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "count", null);
__decorate([
    rest_1.get('/procedimentos', {
        responses: {
            '200': {
                description: 'Array of Procedimento model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Procedimento } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Procedimento))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "find", null);
__decorate([
    rest_1.patch('/procedimentos', {
        responses: {
            '200': {
                description: 'Procedimento PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Procedimento))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Procedimento, Object]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/procedimentos/{id}', {
        responses: {
            '200': {
                description: 'Procedimento model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Procedimento } } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "findById", null);
__decorate([
    rest_1.patch('/procedimentos/{id}', {
        responses: {
            '204': {
                description: 'Procedimento PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Procedimento]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "updateById", null);
__decorate([
    rest_1.put('/procedimentos/{id}', {
        responses: {
            '204': {
                description: 'Procedimento PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Procedimento]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/procedimentos/{id}', {
        responses: {
            '204': {
                description: 'Procedimento DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcedimentoControllerController.prototype, "deleteById", null);
ProcedimentoControllerController = __decorate([
    __param(0, repository_1.repository(repositories_1.ProcedimentoRepository)),
    __metadata("design:paramtypes", [repositories_1.ProcedimentoRepository])
], ProcedimentoControllerController);
exports.ProcedimentoControllerController = ProcedimentoControllerController;
//# sourceMappingURL=procedimento-controller.controller.js.map