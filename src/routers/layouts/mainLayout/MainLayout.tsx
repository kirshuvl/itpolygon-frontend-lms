import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { type ParentComponent, createEffect, onCleanup, onMount } from 'solid-js'

import { useSessionStateContext } from '../../../context/session'
import { debugMessage } from '../../../utils/debugMessage'

import { Footer } from '../../../widgets/Footer/Footer'
import { Header } from '../../../widgets/Header/Header'
import styles from './MainLayout.module.scss'

export const MainLayout: ParentComponent = (props) => {
    const { isAuthenticated, isUpdating } = useSessionStateContext()
    const navigate = useNavigate()

    createEffect(() => {
        if (!(isAuthenticated() || isUpdating())) {
            navigate('/')
        }
    })
    onMount(() => {
        debugMessage('[onMount][Layout] MainLayout')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Layout] MainLayout')
    })
    return (
        <div class="container">
            <div class={clsx(styles.content)}>
                <Header />
                <div class={clsx(styles.main)}>{props.children}</div>
                <Footer />
            </div>
        </div>
    )
}
