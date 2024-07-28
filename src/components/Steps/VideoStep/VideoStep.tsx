import { Button } from 'itpolygon-ui-dev'
import { type Component, Show, createSignal } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { VideoStepBodyInterface } from '../../../types/steps'
import styles from './VideoStep.module.scss'

import clsx from 'clsx'

export const VideoStep: Component = () => {
    const {
        currentStep,
        actions: { updateUserStepEnroll },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as VideoStepBodyInterface

    const [isLoading, setIsLoading] = createSignal(false)
    const buttonClick = async () => {
        setIsLoading(true)
        await updateUserStepEnroll({
            status: 'OK',
        })
        setIsLoading(false)
    }
    return (
        <>
            <iframe class={clsx(styles.video)} src={stepBody().video_url} title="rounded" allowfullscreen />
            <Show when={currentStep()?.userEnroll?.status !== 'OK'}>
                <Button
                    onClick={() => buttonClick()}
                    value="Все понятно"
                    variant="success"
                    outline
                    loading={isLoading()}
                />
            </Show>
        </>
    )
}
