import type { Component } from 'solid-js'

import clsx from 'clsx'
import styles from './LessonContent.Skeleton.module.scss'

export const LessonContentSkeleton: Component = () => {
    return <div class={clsx(styles.skeleton)} />
}
