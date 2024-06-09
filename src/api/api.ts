import axios from 'axios'
import type { Tokens } from '../types/session'
import {
    apiSession,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from './session/apiSession'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const axiosCommon = axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
})

let refreshTokenPromise: Promise<Tokens> | null = null

axiosPrivate.interceptors.request.use(
    async (config) => {
        let accessToken = getAccessToken()
        const refreshToken = getRefreshToken() ?? false

        if (accessToken && apiSession.isTokenNeedUpdate(accessToken)) {
            if (!refreshTokenPromise && refreshToken) {
                refreshTokenPromise = apiSession.refreshToken({ refreshToken })
            }
            const newTokens = await refreshTokenPromise

            if (newTokens) {
                accessToken = newTokens.access
                setAccessToken(newTokens.access)
                setRefreshToken(newTokens.refresh)
            }
            refreshTokenPromise = null
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },
    (error) => Promise.reject(error),
)
