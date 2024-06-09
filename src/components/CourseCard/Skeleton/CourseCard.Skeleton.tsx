import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'
import type { Component } from 'solid-js'
import styles from './CourseCard.Skeleton.module.scss'

export const CourseCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.title)} />
                    <div class={clsx(styles.title)} />
                </div>
                <div class={clsx(styles.line)}>
                    <div class={clsx(styles.subtitle)} />
                    <div class={clsx(styles.subtitle)} />
                </div>
            </div>
            <ProgressBarVertical percent={0} />
        </div>
    )
}
