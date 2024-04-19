export class User{
    userId!: number
    pseudo!: string
    role!: Role
    isAccountNonLocked!: boolean
}

export enum Role {
    ADMIN = 'ADMIN',
    DEMO = 'DEMO',
    USER = 'USER'
  }