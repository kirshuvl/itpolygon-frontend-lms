export interface refreshTokenInterface {
    refresh: string
}

export interface accessTokenInterface {
    access: string
}

export interface infoTokenInterface {
    detail?: string
}

export interface TokensInterface extends refreshTokenInterface, accessTokenInterface, infoTokenInterface {}
