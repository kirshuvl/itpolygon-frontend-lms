import { type Component, Match, Show, Switch, createEffect, createSignal } from 'solid-js'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { IconCode, IconQuestion, IconText, IconVideo } from 'itpolygon-ui-dev'
import styles from './StepCard.module.scss'

import { IconLoading } from 'itpolygon-ui-dev'
import { useResourseStateContext } from '../../context/universal'
import type { StepInterface } from '../../types/steps'

type Props = {
    step: StepInterface
}

export const StepCard: Component<Props> = (props) => {
    const step = props.step
    const {
        resource,
        url,
        currentStep,
        setCurrentStep,
        actions: { createUserStepEnroll },
    } = useResourseStateContext()
    const [isUpdating, setIsUpdating] = createSignal<boolean>(false)

    const navigate = useNavigate()

    const statusMap = {
        PR: 'просмотрено',
        OK: 'решено',
        WA: 'неправильный ответ',
        WT: 'на проверке',
    }

    function getStatusDescription(status: keyof typeof statusMap | undefined): string {
        return status ? statusMap[status] : 'не просмотрено'
    }

    const stylesMap = {
        PR: 'process',
        OK: 'ok',
        WA: 'wa',
        WT: 'wt',
    }

    function getStyles(status: keyof typeof statusMap | undefined): string {
        return status ? stylesMap[status] : 'none'
    }

    createEffect(async () => {
        if (currentStep() && currentStep()?.id === step.id) {
            if (currentStep() && currentStep()?.userEnroll === null) {
                setIsUpdating(true)
                createUserStepEnroll({ stepId: step.id })
                await new Promise((resolve) => setTimeout(resolve, 2000))
                setIsUpdating(false)
            }
        }
    })

    const buttonClick = () => {
        setCurrentStep(step)
        navigate(`/${url}/${resource()?.id}/step/${step.id}`)
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
                        <Match
                            when={
                                step.stepType === 'questionstep' ||
                                step.stepType === 'singlechoicequestionstep'
                            }
                        >
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
