export class User{
    userId!: number
    pseudo!: string
    role!: Role
    accountNonLocked!: boolean
    dateCreation!: Date
    dateLastConnection!: Date
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