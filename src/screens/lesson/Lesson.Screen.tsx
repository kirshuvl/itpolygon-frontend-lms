import type { Component } from 'solid-js'

import clsx from 'clsx'

import { ResourseProvider } from '../../context/universal'
import { CurrentStepBlock } from '../../widgets/CurrentStepBlock/CurrentStepBlock'
import { StepsBlock } from '../../widgets/StepsBlock/StepsBlock'
import styles from './Lesson.Screen.module.scss'

export const LessonScreen: Component = () => {
    return (
        <>
            <ResourseProvider pageType="lesson">
                <div class={clsx(styles.dashboard)}>
                    <div class={clsx(styles.column, styles.left)}>
                        <div class={clsx(styles.card)}>
                            <CurrentStepBlock />
                        </div>
                    </div>
                    <div class={clsx(styles.column, styles.right)}>
                        <div class={clsx(styles.card, styles.sticky)}>
                            <StepsBlock />
                        </div>
                    </div>
                </div>
            </ResourseProvider>
        </>
    )
}
