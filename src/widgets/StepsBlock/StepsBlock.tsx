import { ActionButton, IconChevronLeft, IconChevronRight, IconLock, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, createSignal } from 'solid-js'
import { StepCardSkeleton } from '../../components/StepCard/Skeleton/StepCard.Skeleton'
import { StepCard } from '../../components/StepCard/StepCard'
import { useResourseStateContext } from '../../context/universal'

export const StepsBlock: Component = () => {
    const { resource } = useResourseStateContext()
    const [left, setLeft] = createSignal(0)
    const [right, setRight] = createSignal(5)
    const [isHide, setIsHide] = createSignal(false)

    const steps = () =>
        resource()
            ?.steps.filter((step) => {
                if (isHide()) {
                    return step.userEnroll?.status !== 'OK'
                }
                return true
            })
            .filter((_step, index) => index >= left() && index <= right())

    return (
        <>
            <TitleBlock
                title="Шаги"
                buttons={
                    <>
                        <Show when={resource()?.steps.length > 6}>
                            <ActionButton
                                icon={IconChevronLeft}
                                onClick={() => {
                                    if (steps() && left() > 0) {
                                        setLeft(() => left() - 6)
                                        setRight(() => right() - 6)
                                    }
                                }}
                                disabled={left() <= 0}
                            />
                            <ActionButton
                                icon={IconChevronRight}
                                onClick={() => {
                                    if (right() < resource()?.steps.length) {
                                        setLeft(() => left() + 6)
                                        setRight(() => right() + 6)
                                    }
                                }}
                            />
                        </Show>
                        <ActionButton icon={IconLock} onClick={() => setIsHide(() => !isHide())} />
                    </>
                }
            />
            <Show when={resource.loading}>
                <StepCardSkeleton />
                <StepCardSkeleton />
                <StepCardSkeleton />
            </Show>
            <For each={steps()}>{(step) => <StepCard step={step} />}</For>
        </>
    )
}
