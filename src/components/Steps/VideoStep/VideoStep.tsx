import clsx from 'clsx'
import type { Component } from 'solid-js'
import { useLessonStateContext } from '../../../context/lesson'
import type { VideoStepBodyInterface } from '../../../types/steps'
import styles from './VideoStep.module.scss'
export const VideoStep: Component = () => {
    const { currentStep } = useLessonStateContext()
    const stepBody = currentStep()?.body as VideoStepBodyInterface

    return (
        <>
            <iframe class={clsx(styles.video)} src={stepBody.video_url} title="rounded" allowfullscreen />
        </>
    )
}
