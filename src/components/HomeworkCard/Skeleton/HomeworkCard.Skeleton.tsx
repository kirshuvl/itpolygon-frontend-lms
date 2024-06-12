import clsx from 'clsx'
import type { Component } from 'solid-js'

import { ProgressBarVertical } from 'itpolygon-ui-dev'
import styles from './HomeworkCard.Skeleton.module.scss'
export const HomeworkCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.title)} />
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.left)} />
                </div>
            </div>
            <ProgressBarVertical percent={0} />
        </div>
    )
}
