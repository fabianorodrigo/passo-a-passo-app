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
let GrupoControllerController = class GrupoControllerController {
    constructor(grupoRepository) {
        this.grupoRepository = grupoRepository;
    }
    async create(grupo) {
        return await this.grupoRepository.create(grupo);
    }
    async count(where) {
        return await this.grupoRepository.count(where);
    }
    async find(filter) {
        return await this.grupoRepository.find(filter);
    }
    async updateAll(grupo, where) {
        return await this.grupoRepository.updateAll(grupo, where);
    }
    async findById(id) {
        return await this.grupoRepository.findById(id);
    }
    async updateById(id, grupo) {
        await this.grupoRepository.updateById(id, grupo);
    }
    async replaceById(id, grupo) {
        await this.grupoRepository.replaceById(id, grupo);
    }
    async deleteById(id) {
        await this.grupoRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/grupos', {
        responses: {
            '200': {
                description: 'Grupo model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Grupo } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Grupo]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "create", null);
__decorate([
    rest_1.get('/grupos/count', {
        responses: {
            '200': {
                description: 'Grupo model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Grupo))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "count", null);
__decorate([
    rest_1.get('/grupos', {
        responses: {
            '200': {
                description: 'Array of Grupo model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Grupo } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Grupo))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "find", null);
__decorate([
    rest_1.patch('/grupos', {
        responses: {
            '200': {
                description: 'Grupo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Grupo))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Grupo, Object]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/grupos/{id}', {
        responses: {
            '200': {
                description: 'Grupo model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Grupo } } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "findById", null);
__decorate([
    rest_1.patch('/grupos/{id}', {
        responses: {
            '204': {
                description: 'Grupo PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Grupo]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "updateById", null);
__decorate([
    rest_1.put('/grupos/{id}', {
        responses: {
            '204': {
                description: 'Grupo PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Grupo]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/grupos/{id}', {
        responses: {
            '204': {
                description: 'Grupo DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrupoControllerController.prototype, "deleteById", null);
GrupoControllerController = __decorate([
    __param(0, repository_1.repository(repositories_1.GrupoRepository)),
    __metadata("design:paramtypes", [repositories_1.GrupoRepository])
], GrupoControllerController);
exports.GrupoControllerController = GrupoControllerController;
//# sourceMappingURL=grupo-controller.controller.js.map