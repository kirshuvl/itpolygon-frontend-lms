import { ActionButton, IconChevronLeft, IconChevronRight, IconLock, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, createEffect, createSignal, on } from 'solid-js'
import { StepCardSkeleton } from '../../components/StepCard/Skeleton/StepCard.Skeleton'
import { StepCard } from '../../components/StepCard/StepCard'
import { useResourseStateContext } from '../../context/universal'

export const StepsBlock: Component = () => {
    const size = 6
    const { resource, currentStep } = useResourseStateContext()
    const [left, setLeft] = createSignal(0)
    const [right, setRight] = createSignal(size)
    const [isHide, setIsHide] = createSignal(false)

    createEffect(on(currentStep, () => {
        const index = resource()?.steps.findIndex((step) => step.id === currentStep()?.id)
        if (index !== undefined) {
            setLeft(Math.floor(index / size) * size)
            setRight(Math.floor(index / size) * size + size)
        }
    }))

    const steps = () =>
        resource()
            ?.steps.filter((step) => {
                if (isHide()) {
                    return step.userEnroll?.status !== 'OK'
                }
                return true
            })
            .filter((_step, index) => index >= left() && index < right())

    const leftCheck = () => {
        const res = resource()
        return res?.steps && res.steps.length > size
    }

    const rightCheck = () => {
        const res = resource()
        return res?.steps && right() < res.steps.length
    }

    return (
        <>
            <TitleBlock
                title="Шаги"
                buttons={
                    <>
                        <Show when={leftCheck()}>
                            <ActionButton
                                icon={IconChevronLeft}
                                onClick={() => {
                                    if (steps() && left() > 0) {
                                        setLeft(() => left() - size)
                                        setRight(() => right() - size)
                                    }
                                }}
                                disabled={left() <= 0}
                            />
                            <ActionButton
                                icon={IconChevronRight}
                                onClick={() => {
                                    if (rightCheck()) {
                                        setLeft(() => left() + size)
                                        setRight(() => right() + size)
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
