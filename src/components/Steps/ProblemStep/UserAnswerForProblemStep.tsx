import { ActionButton, IconHeart, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { ProblemStepBodyInterface, UserAnswerForProblemStepInterface } from '../../../types/steps'

import clsx from 'clsx'
import styles from './UserAnswerForProblemStep.module.scss'

export const UserAnswerForProblemStep: Component = () => {
    const { currentStep } = useResourseStateContext()

    const stepBody = () => currentStep()?.body as ProblemStepBodyInterface
    return (
        <>
            <Show when={stepBody().userAnswers.length !== 0}>
                <div class={clsx(styles.card)}>
                    <TitleBlock title={'Мои ответы'} />
                    <For each={stepBody().userAnswers}>{(answer) => <UserAnswer answer={answer} />}</For>
                </div>
            </Show>
        </>
    )
}

type UserAnswerProps = {
    answer: UserAnswerForProblemStepInterface
}

const UserAnswer: Component<UserAnswerProps> = (props) => {
    const date = new Date(props.answer.created_at)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // добавляем 1, так как месяцы в JS начинаются с 0
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return (
        <>
            <div class={clsx(styles.answer)}>
                <div
                    class={clsx(
                        styles.icon,
                        props.answer.verdict !== 'OK' ? props.answer.verdict === 'PR' ? styles.loading : styles.error : styles.correct,
                    )}
                >
                    <div class={clsx(styles.outerCircle)}>
                        <div class={clsx(styles.innerCircle)} />
                    </div>
                </div>
                <div class={clsx(styles.primary)}>Решение № {props.answer.id}</div>
                <div class={clsx(styles.date)}>
                    {day}.{month}.{year} {hours}:{minutes}:{seconds}
                </div>
                <ActionButton icon={IconHeart} size="medium" />
            </div>
        </>
    )
}
