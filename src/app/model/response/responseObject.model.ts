import { Response } from "./response.model";

export class ResponseObject<T>{
    response!: Response
    object!: T
}