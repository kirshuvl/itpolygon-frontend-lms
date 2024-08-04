import { ProgressBarHorizontal } from 'itpolygon-ui-dev'
import { type Component, createEffect, createSignal } from 'solid-js'
import { useResourseStateContext } from '../../context/universal'

export const LessonProgress: Component = () => {
    const { resource } = useResourseStateContext()
    const [percent, setPercent] = createSignal(0)

    createEffect(() => {
        const res = resource()
        if (res?.steps) {
            setPercent(
                (res.steps.filter((step) => step.userEnroll?.status === 'OK').length / res.steps.length) *
                    100,
            )
        }
    })
    return (
        <div>
            {}
            <ProgressBarHorizontal percent={percent()} />
        </div>
    )
}
