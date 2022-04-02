import { Validator } from "@/application/contracts";
import { badRequest, HttpResponse, serverError } from "@/application/helpers";

export abstract class Controller {

    constructor(private readonly validator: Validator) { }

    abstract perform(httpRequest: any): Promise<HttpResponse>;

    async handle(httpRequest: any): Promise<HttpResponse> {
        const error = this.validator.validate(httpRequest);
        if (error) return badRequest(error);
        return this.perform(httpRequest).catch(serverError);
    }
}
