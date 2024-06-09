import type { Component } from 'solid-js'
import { SessionProvider } from './context/session'
import { AppRouters } from './routers'

export const App: Component = () => {
    return (
        <>
            <SessionProvider>
                <AppRouters />
            </SessionProvider>
        </>
    )
}
