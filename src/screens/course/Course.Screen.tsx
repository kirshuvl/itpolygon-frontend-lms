import clsx from 'clsx'
import type { Component } from 'solid-js'
import { CourseProvider } from '../../context/course'
import { TopicsBlock } from '../../widgets/TopicsBlock/TopicsBlock'
import styles from './Course.Screen.module.scss'

export const CourseScreen: Component = () => {
    return (
        <CourseProvider>
            <div class={clsx(styles.dashboard)}>
                <div class={clsx(styles.column, styles.left)}>
                    <div class={clsx(styles.card)}>
                        <TopicsBlock />
                    </div>
                </div>
                <div class={clsx(styles.column, styles.right)}>
                    <div class={clsx(styles.card)}>
                        <div class={clsx(styles.skeleton)}>Временный блок</div>
                    </div>
                    <div class={clsx(styles.card)}>
                        <div class={clsx(styles.skeleton)}>Временный блок</div>
                    </div>
                    <div class={clsx(styles.card)}>
                        <div class={clsx(styles.skeleton)}>Временный блок</div>
                    </div>
                </div>
            </div>
        </CourseProvider>
    )
}
