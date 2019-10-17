"use strict";
// Uncomment these imports to begin using these cool features!
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
const context_1 = require("@loopback/context");
const nodemailer = require("nodemailer");
const models_1 = require("../models");
const rest_1 = require("@loopback/rest");
/**
 * OpenAPI response for ping()
 */
const EMAIL_RESPONSE = {
    description: "Email Response",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    sucess: { type: "boolean" },
                    date: { type: "string" },
                    url: { type: "string" },
                    headers: {
                        type: "object",
                        properties: {
                            "Content-Type": { type: "string" }
                        },
                        additionalProperties: true
                    }
                }
            }
        }
    }
};
let EmailController = class EmailController {
    constructor(req) {
        this.req = req;
    }
    // Map to `GET /ping`
    async email(email) {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
        });
        return await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: process.env.EMAIL_SUBJECT || `Passo a Passo: Comunicação sobre Procedimento`,
            html: `<h1>${email.tituloProcedimento}</h1><br>${email.mensagem}`
        });
    }
};
__decorate([
    rest_1.post("/email", {
        responses: {
            "200": EMAIL_RESPONSE
        }
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Email]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "email", null);
EmailController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [Object])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map