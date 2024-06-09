import clsx from 'clsx'
import type { Component } from 'solid-js'
import styles from './Dashboard.Screen.module.scss'

export const DashboardScreen: Component = () => {
    return (
        <div class={clsx(styles.dashboard)}>
            <div class={clsx(styles.column, styles.left)}>
                <div class={clsx(styles.card)}>CoursesBlock</div>
            </div>
            <div class={clsx(styles.column, styles.right)}>
                <div class={clsx(styles.card)}>SeminarsBlock</div>
                <div class={clsx(styles.card)}>HomeworksBlock</div>
            </div>
        </div>
    )
}
