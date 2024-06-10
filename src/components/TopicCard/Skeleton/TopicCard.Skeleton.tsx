import type { Component } from 'solid-js'

import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'
import styles from './TopicCard.Skeleton.module.scss'

export const TopicCardSkeleton: Component = () => {
    return (
        <>
            <div class={clsx(styles.card)}>
                <div class={clsx(styles.index)} />
                <div class={clsx(styles.content)}>
                    <div class={clsx(styles.title)} />
                    <div class={clsx(styles.title)} />
                </div>
                <div class={clsx(styles.info)} />
                <ProgressBarVertical percent={0} />
            </div>
        </>
    )
}
