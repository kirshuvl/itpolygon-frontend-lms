import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show } from 'solid-js'
import { StepCardSkeleton } from '../../components/StepCard/Skeleton/StepCard.Skeleton'
import { StepCard } from '../../components/StepCard/StepCard'
import { useLessonStateContext } from '../../context/lesson'

export const StepsBlock: Component = () => {
    const { lesson } = useLessonStateContext()

    return (
        <>
            <TitleBlock title="Шаги" />
            <Show when={lesson.loading}>
                <StepCardSkeleton />
                <StepCardSkeleton />
                <StepCardSkeleton />
            </Show>
            <For each={lesson()?.steps}>{(step) => <StepCard step={step} />}</For>
        </>
    )
}
