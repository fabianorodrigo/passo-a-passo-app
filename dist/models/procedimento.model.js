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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const passo_model_1 = require("./passo.model");
let Procedimento = class Procedimento extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
    }),
    __metadata("design:type", String)
], Procedimento.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Procedimento.prototype, "titulo", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Procedimento.prototype, "quando", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Procedimento.prototype, "idGrupo", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], Procedimento.prototype, "entradas", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], Procedimento.prototype, "saidas", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], Procedimento.prototype, "procedimentosRelacionados", void 0);
__decorate([
    repository_1.property.array(passo_model_1.Passo, {
        required: true
    }),
    __metadata("design:type", Array)
], Procedimento.prototype, "passos", void 0);
Procedimento = __decorate([
    repository_1.model({ settings: {} }),
    __metadata("design:paramtypes", [Object])
], Procedimento);
exports.Procedimento = Procedimento;
//# sourceMappingURL=procedimento.model.js.map