import { A } from '@solidjs/router'
import clsx from 'clsx'
import type { Component } from 'solid-js'
import styles from './Footer.module.scss'

export const Footer: Component = () => {
    return (
        <footer class={clsx(styles.footer)}>
            <A href="/" class={styles.logo}>
                <img src="/public/icons/logo.png" alt="" /> 2020 - 2024© ИТ Полигон
            </A>
        </footer>
    )
}
