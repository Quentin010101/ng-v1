export class Score{
    scoreId!: number
    type!: GameTypeEnum
    score!: number
}

export class NewScore{
    type!: GameTypeEnum
    score!: number 
}

export enum GameTypeEnum{
    SNAKE = "SNAKE", MASTERMIND = "MASTERMIND"
}

