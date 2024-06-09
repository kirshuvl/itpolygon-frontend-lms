import { useNavigate } from '@solidjs/router'
import { type ParentComponent, createEffect, onCleanup, onMount } from 'solid-js'
import { useSessionStateContext } from '../../../context/session'
import { debugMessage } from '../../../utils/debugMessage'

export const AuthLayout: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()
    const navigate = useNavigate()

    createEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard')
        }
    })

    onMount(() => {
        debugMessage('[onMount][Layout] AuthLayout')
    })
    onCleanup(() => {
        debugMessage('[onCleanup][Layout] AuthLayout')
    })
    return <>{props.children}</>
}
