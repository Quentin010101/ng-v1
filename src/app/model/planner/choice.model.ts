import { MapNumberString } from "../utils.model"

export class Choices {
    constructor(title: string){
        this.title = title
    }
    title!: string
    data!: MapNumberString[]
}

export class Choice {
    constructor(title: string){
        this.title = title
    }
    title!: string
    data!: MapNumberString
}