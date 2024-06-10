import type { Component } from 'solid-js'

import clsx from 'clsx'
import styles from './SeminarCard.Skeleton.module.scss'

export const SeminarCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.title)} />
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.left)} />
                    <div class={clsx(styles.right)} />
                </div>
            </div>
        </div>
    )
}
