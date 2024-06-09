export interface refreshToken {
    refresh: string
}

export interface accessToken {
    access: string
}

export interface infoToken {
    detail?: string
}

export interface Tokens extends refreshToken, accessToken, infoToken {}
