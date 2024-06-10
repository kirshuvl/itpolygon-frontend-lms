import type { Component } from 'solid-js'
import { TopicCardSkeleton } from '../../../components/TopicCard/Skeleton/TopicCard.Skeleton'

import clsx from 'clsx'
import styles from './TopicBlock.Skeleton.module.scss'

export const TopicBlockHeaderSkeleton: Component = () => {
    return (
        <div class={clsx(styles.header)}>
            <div class={clsx(styles.title)} />
            <div class={clsx(styles.title)} />
        </div>
    )
}

export const TopicsBlockBodySkeleton: Component = () => {
    return (
        <>
            <TopicCardSkeleton />
            <div class={clsx(styles.lessons)}>
                <TopicCardSkeleton />
                <TopicCardSkeleton />
                <TopicCardSkeleton />
            </div>
            <TopicCardSkeleton />
            <div class={clsx(styles.lessons)}>
                <TopicCardSkeleton />
                <TopicCardSkeleton />
            </div>
            <TopicCardSkeleton />
            <div class={clsx(styles.lessons)}>
                <TopicCardSkeleton />
            </div>
        </>
    )
}
