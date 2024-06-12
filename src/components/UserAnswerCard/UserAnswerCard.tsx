import { type Component, Show } from 'solid-js'
import type { UserAnswerForQuestionStepInterface } from '../../types/steps'

import clsx from 'clsx'
import styles from './UserAnswerCard.module.scss'

type Props = {
    answer: UserAnswerForQuestionStepInterface
}

export const UserAnswerCard: Component<Props> = (props) => {
    const answer = props.answer

    return (
        <div class={clsx(styles.card)}>
            {answer.answer} |{' '}
            <Show when={answer.is_correct} fallback={'Неверно'}>
                Верно
            </Show>
        </div>
    )
}
