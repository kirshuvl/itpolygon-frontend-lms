import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show } from 'solid-js'
import { StepCardSkeleton } from '../../components/StepCard/Skeleton/StepCard.Skeleton'
import { StepCard } from '../../components/StepCard/StepCard'
import { useResourseStateContext } from '../../context/universal'

export const StepsBlock: Component = () => {
    const { resource } = useResourseStateContext()

    return (
        <>
            <TitleBlock title="Шаги" />
            <Show when={resource.loading}>
                <StepCardSkeleton />
                <StepCardSkeleton />
                <StepCardSkeleton />
            </Show>
            <For each={resource()?.steps}>{(step) => <StepCard step={step} />}</For>
        </>
    )
}
