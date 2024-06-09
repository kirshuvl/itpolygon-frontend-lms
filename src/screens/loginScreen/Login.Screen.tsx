import { A } from '@solidjs/router'
import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { TitleBlock } from 'itpolygon-ui-dev'
import { InputField } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import { type Component, onCleanup, onMount } from 'solid-js'
import * as yup from 'yup'
import { useSessionStateContext } from '../../context/session'
import { debugMessage } from '../../utils/debugMessage'
import styles from './Login.Screen.module.scss'

type LoginForm = {
    email: string
    password: string
}

export const userSchema: yup.Schema<LoginForm> = yup.object({
    email: yup.string().required('Введите почту'),
    password: yup.string().required('Введите пароль'),
})

export const LoginScreen: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema))
    const { formData } = formHandler
    const {
        actions: { signIn },
    } = useSessionStateContext()

    onMount(() => {
        debugMessage('[LoginScreen] onMount')
    })
    onCleanup(() => {
        debugMessage('[LoginScreen] onCleanup')
    })

    const submit = async () => {
        await signIn({ email: formData().email.toString(), password: formData().password.toString() })
    }

    return (
        <div class={clsx('container', styles.login)}>
            <div class={clsx(styles.main)}>
                <div class={clsx(styles.card)}>
                    <A href="/" class={clsx(styles.cardHeader)}>
                        <img src="/public/icons/logo.png" alt="" /> ИТ Полигон
                    </A>
                </div>
                <div class={clsx(styles.card)}>
                    <TitleBlock title="Войти в аккаунт" />
                    <InputField
                        type="text"
                        placeholder="Введите Email"
                        name="email"
                        formHandler={formHandler}
                    />
                    <InputField
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                        formHandler={formHandler}
                    />
                    <Button value="Войти" size="F" onClick={() => submit()} />
                </div>
            </div>
        </div>
    )
}
