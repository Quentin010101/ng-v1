import { Response } from "./response.model";

export class ResponseObject<T>{
  constructor(response: Response, object: T){
    this.object = object
    this.response = response
  }
    response!: Response
    object!: T
}