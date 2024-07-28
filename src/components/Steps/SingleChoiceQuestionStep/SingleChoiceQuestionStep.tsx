import { type Component, For, Show, createSignal } from 'solid-js'

import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import * as yup from 'yup'
import { useResourseStateContext } from '../../../context/universal'
import type { SingleChoiceQuestionStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import styles from './SingleChoiceQuestionStep.module.scss'

type UserAnswer = {
    answer: string
}

export const userSchema: yup.Schema<UserAnswer> = yup.object({
    answer: yup.string().required('Введите ответ'),
})

export const SingleChoiceQuestionStep: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema))
    const { formData } = formHandler

    const {
        currentStep,
        actions: { createUserAnswerForSingleChoiceQuestionStep },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as SingleChoiceQuestionStepBodyInterface

    const [isLoading, setIsLoading] = createSignal(false)
    const [userAnswer, setUserAnswer] = createSignal<number>()

    const buttonClick = async () => {
        setIsLoading(true)
        if (userAnswer() !== undefined) {
            await createUserAnswerForSingleChoiceQuestionStep({ answerId: userAnswer() })
        }
        setIsLoading(false)
    }

    const radioClick = (answerId: number) => {
        setUserAnswer(answerId)
    }
    return (
        <>
            <div class={clsx(styles.body)}>
                <For each={stepBody().text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                <Show when={currentStep()?.userEnroll?.status !== 'OK'}>
                    <For each={stepBody().stepAnswers}>
                        {(answer) => (
                            <div>
                                <input type="radio" name="question" onClick={() => radioClick(answer.id)} />
                                <label>{answer.answer}</label>
                            </div>
                        )}
                    </For>
                    <Button onClick={() => buttonClick()} />
                </Show>
                <For each={stepBody().userAnswers}>{(answer) => <div>{answer.answer.answer}</div>}</For>
            </div>
        </>
    )
}
