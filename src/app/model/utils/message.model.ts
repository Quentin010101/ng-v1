export class Message{
    constructor(error: boolean, m: string){
        this.error = error;
        this.message = m
    }
    error!: boolean
    message!: string
}