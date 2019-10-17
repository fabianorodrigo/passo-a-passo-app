// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/context";
import * as nodemailer from "nodemailer";
import { Email } from "../models";

import { post, requestBody, Request, RestBindings, ResponseObject } from "@loopback/rest";

/**
 * OpenAPI response for ping()
 */
const EMAIL_RESPONSE: ResponseObject = {
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

export class EmailController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @post("/email", {
    responses: {
      "200": EMAIL_RESPONSE
    }
  })
  async email(@requestBody() email: Email): Promise<Email> {
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
}
