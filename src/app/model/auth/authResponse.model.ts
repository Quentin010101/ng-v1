export class AuthResponse {
    pseudo!: string
    token!: string;
    expDateToken!: Date
    refreshToken!: string;
    expDateRefreshToken!: Date
}