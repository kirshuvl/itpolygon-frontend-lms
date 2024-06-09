import clsx from 'clsx'
import type { Component } from 'solid-js'
import styles from './EmptyData.module.scss'

type Props = {
    text: string
    onClick?: () => void
}

export const EmptyData: Component<Props> = (props) => {
    return (
        <div onClick={props.onClick} class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                    />
                </svg>
            </div>
            <div>{props.text}</div>
        </div>
    )
}
