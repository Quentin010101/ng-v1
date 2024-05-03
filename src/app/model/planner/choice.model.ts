import { MapNumberString } from "../utils/utils.model"

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