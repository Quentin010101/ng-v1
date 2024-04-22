export class User{
    userId!: number
    pseudo!: string
    role!: Role
    accountNonLocked!: boolean
}

export enum Role {
    ADMIN = 'ADMIN',
    DEMO = 'DEMO',
    USER = 'USER'
  }