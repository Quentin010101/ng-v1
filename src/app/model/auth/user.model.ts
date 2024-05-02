import { Config } from "../admin/config.model"

export class User{
    userId!: number
    pseudo!: string
    role!: Role
    accountNonLocked!: boolean
    dateCreation!: Date
    dateLastConnection!: Date
    config!: Config
}

export class UserCreate{
    pseudo!: string
    password!: string
}

export enum Role {
    ADMIN = 'ADMIN',
    DEMO = 'DEMO',
    USER = 'USER'
}

