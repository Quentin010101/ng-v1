export class Response{
  constructor(m: string, b: boolean){
    this.executionStatus = b
    this.message = m
  }
    message!: string
    executionStatus!: boolean
}