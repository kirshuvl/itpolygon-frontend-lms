import clsx from 'clsx'
import { ActionButton, IconHeart, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { QuestionStepBodyInterface, UserAnswerForQuestionStepInterface } from '../../../types/steps'
import styles from './UserAnswerForQuestionStep.module.scss'

export const UserAnswerQuestionStep: Component = () => {
    const { currentStep } = useResourseStateContext()

    const stepBody = () => currentStep()?.body as QuestionStepBodyInterface

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
    answer: UserAnswerForQuestionStepInterface
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
                <div class={clsx(styles.icon, props.answer.is_correct ? styles.correct : styles.error)}>
                    <div class={clsx(styles.outerCircle)}>
                        <div class={clsx(styles.innerCircle)} />
                    </div>
                </div>
                <div class={clsx(styles.primary)}>{props.answer.answer}</div>
                <div class={clsx(styles.date)}>
                    {day}.{month}.{year} {hours}:{minutes}:{seconds}
                </div>
                <ActionButton icon={IconHeart} size="medium" />
            </div>
        </>
    )
}
