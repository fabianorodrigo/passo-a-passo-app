/// <reference types="express" />
import { Email } from "../models";
import { Request } from "@loopback/rest";
export declare class EmailController {
    private req;
    constructor(req: Request);
    email(email: Email): Promise<Email>;
}
