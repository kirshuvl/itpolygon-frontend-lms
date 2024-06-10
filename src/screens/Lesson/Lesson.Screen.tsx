import type { Component } from 'solid-js'

import clsx from 'clsx'

import styles from './Lesson.Screen.module.scss'

export const LessonScreen: Component = () => {
    return (
        <div class={clsx(styles.dashboard)}>
            <div class={clsx(styles.column, styles.left)}>
                <div class={clsx(styles.card)}>Временный блок</div>
            </div>
            <div class={clsx(styles.column, styles.right)}>
                <div class={clsx(styles.card, styles.sticky)}>Временный блок</div>
            </div>
        </div>
    )
}
