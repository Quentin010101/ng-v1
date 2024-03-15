import { ResponseDto } from "./responseDto.model";

export class ResponseObject<T>{
  constructor(response: ResponseDto, object: T){
    this.object = object
    this.responseDto = response
  }
    responseDto!: ResponseDto
    object!: T
}