export class AuthResponse {
    pseudo!: string
    token!: string;
    expDateToken!: number
    refreshToken!: string;
    expDateRefreshToken!: number
}