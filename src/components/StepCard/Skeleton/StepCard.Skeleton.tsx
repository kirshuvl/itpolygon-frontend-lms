import type { Component } from 'solid-js'

import clsx from 'clsx'
import styles from './StepCard.Skeleton.module.scss'

export const StepCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.first)} />
                    <div class={clsx(styles.second)} />
                </div>
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.third)} />
                </div>
            </div>
        </div>
    )
}
