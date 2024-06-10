import { type Component, Match, Show, Switch, createEffect, createSignal } from 'solid-js'
import type { StepInterface } from '../../types/courses'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { IconCode, IconQuestion, IconText, IconVideo } from 'itpolygon-ui-dev'
import { useLessonStateContext } from '../../context/lesson'
import styles from './StepCard.module.scss'

import { IconLoading } from 'itpolygon-ui-dev'

type Props = {
    step: StepInterface
}

export const StepCard: Component<Props> = (props) => {
    const step = props.step
    const {
        lesson,
        currentStep,
        setCurrentStep,
        actions: { createUserStepEnroll },
    } = useLessonStateContext()
    const [isUpdating, setIsUpdating] = createSignal<boolean>(false)

    const navigate = useNavigate()

    const statusMap = {
        PR: 'просмотрено',
        OK: 'решено',
        WA: 'неправильный ответ',
    }

    function getStatusDescription(status: keyof typeof statusMap | undefined): string {
        return status ? statusMap[status] : 'не просмотрено'
    }

    const stylesMap = {
        PR: 'process',
        OK: 'ok',
        WA: 'wa',
    }

    function getStyles(status: keyof typeof statusMap | undefined): string {
        return status ? stylesMap[status] : 'none'
    }

    createEffect(() => {
        if (currentStep() && currentStep()?.id === step.id) {
            if (currentStep() && currentStep()?.userEnroll === null) {
                setIsUpdating(true)
                createUserStepEnroll({ stepId: step.id })
                setIsUpdating(false)
            }
        }
    })

    const buttonClick = () => {
        setCurrentStep(step)
        navigate(`/lesson/${lesson()?.id}/step/${step.id}`)
    }

    return (
        <>
            <div
                class={clsx(styles.card, { [styles.active]: currentStep()?.id === step.id })}
                onClick={buttonClick}
            >
                <div class={clsx(styles.icon)}>
                    <Switch>
                        <Match when={step.stepType === 'textstep'}>
                            <IconText class={clsx(styles.svg)} />
                        </Match>
                        <Match when={step.stepType === 'videostep'}>
                            <IconVideo class={clsx(styles.svg)} />
                        </Match>
                        <Match when={step.stepType === 'questionstep'}>
                            <IconQuestion class={clsx(styles.svg)} />
                        </Match>
                        <Match when={step.stepType === 'problemstep'}>
                            <IconCode class={clsx(styles.svg)} />
                        </Match>
                    </Switch>
                </div>
                <div class={clsx(styles.content)}>
                    <div class={clsx(styles.line)}>
                        <Show
                            when={step.title}
                            fallback={
                                <Switch>
                                    <Match when={step.stepType === 'textstep'}>
                                        Текстовый материал № {step.id}
                                    </Match>
                                    <Match when={step.stepType === 'videostep'}>
                                        Видео материал № {step.id}
                                    </Match>
                                    <Match when={step.stepType === 'questionstep'}>
                                        Вопрос № {step.id}
                                    </Match>
                                    <Match when={step.stepType === 'problemstep'}>Задача № {step.id}</Match>
                                </Switch>
                            }
                        >
                            {step.title}
                        </Show>
                    </div>
                    <div
                        class={clsx(
                            styles.line,
                            styles.enrollInfo,
                            styles[getStyles(step.userEnroll?.status)],
                        )}
                    >
                        {getStatusDescription(step.userEnroll?.status)}
                    </div>
                </div>
                <Show when={isUpdating()}>
                    <IconLoading class={clsx(styles.loading)} />
                </Show>
            </div>
        </>
    )
}
