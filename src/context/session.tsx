import {
    type Accessor,
    type ParentComponent,
    createContext,
    createSignal,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'

import {
    getAccessToken,
    getRefreshToken,
    resetAccessToken,
    resetRefreshToken,
    resetTokens,
    setAccessToken,
    setRefreshToken,
} from '../api/apiSession'

import { apiSession } from '../api/apiSession'
import { debugMessage } from '../utils/debugMessage'

type SessionStateContextType = {
    isAuthenticated: Accessor<boolean>
    isSessionLoaded: Accessor<boolean>
    isUpdating: Accessor<boolean>
    actions: {
        signIn: ({ email, password }: { email: string; password: string }) => Promise<boolean>
        signOut: () => void
    }
}

const SessionStateContext = createContext<SessionStateContextType>()

export const SessionProvider: ParentComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false)
    const [isSessionLoaded, setIsSessionLoaded] = createSignal<boolean>(false)
    const [isUpdating, setIsUpdating] = createSignal<boolean>(false)

    onMount(async () => {
        debugMessage('[onMount][Provider] SessionProvider')
        await loadSession()
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] SessionProvider')
    })

    const loadSession = async () => {
        try {
            const accessToken = getAccessToken()
            const refreshToken = getRefreshToken()

            if (!refreshToken) {
                resetTokens()
                setIsAuthenticated(false)

                return null
            }

            if (apiSession.isTokenNeedUpdate(refreshToken)) {
                setIsUpdating(true)
                debugMessage('рефреш токен надо обовить')
                if (refreshToken && !apiSession.isTokenNeedUpdate(refreshToken)) {
                    debugMessage('обовляем рефреш токен')
                    const newTokens = await apiSession.refreshToken({ refreshToken })
                    setAccessToken(newTokens.access)
                    setRefreshToken(newTokens.refresh)
                    setIsAuthenticated(true)
                    setIsUpdating(false)

                    return null
                }
                debugMessage('не получилось обновить')
                resetTokens()
                setIsAuthenticated(false)
                setIsUpdating(false)

                return null
            }

            if (accessToken && !apiSession.isTokenNeedUpdate(accessToken)) {
                setIsAuthenticated(true)

                return null
            }

            setIsUpdating(true)
            const tokens = await apiSession.refreshToken({ refreshToken })
            setAccessToken(tokens.access)
            setRefreshToken(tokens.refresh)
            setIsAuthenticated(true)
            setIsUpdating(false)

            return null
        } catch (error) {
            debugMessage(`[loadSession] ${error}`)
            resetAccessToken()
            resetRefreshToken()
            setIsAuthenticated(false)
            throw error
        } finally {
            setTimeout(() => {
                setIsSessionLoaded(true)
            }, 0)
        }
    }

    const signIn = async ({ email, password }: { email: string; password: string }): Promise<boolean> => {
        try {
            const tokens = await apiSession.getTokens({ email, password })
            setIsAuthenticated(true)
            setAccessToken(tokens.access)
            setRefreshToken(tokens.refresh)

            return true
        } catch (error) {
            debugMessage(`[signIn] ${error}`)
            resetAccessToken()
            resetRefreshToken()
            setIsAuthenticated(false)
            throw error
        }
    }

    const signOut = () => {
        resetAccessToken()
        resetRefreshToken()
        setIsAuthenticated(false)
    }

    const value = {
        isAuthenticated,
        isSessionLoaded,
        isUpdating,
        actions: {
            signIn,
            signOut,
        },
    }
    return <SessionStateContext.Provider value={value}>{props.children}</SessionStateContext.Provider>
}

export function useSessionStateContext(): SessionStateContextType {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(SessionStateContext)!
}
