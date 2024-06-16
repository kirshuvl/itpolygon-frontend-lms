import { type Component, For, Show, createSignal } from 'solid-js'

import clsx from 'clsx'
import { Button, InputField } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import * as yup from 'yup'
import { useResourseStateContext } from '../../../context/universal'
import type { QuestionStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import { UserAnswerCard } from '../../UserAnswerCard/UserAnswerCard'
import styles from './QuestionStep.module.scss'

type UserAnswer = {
    answer: string
}

export const userSchema: yup.Schema<UserAnswer> = yup.object({
    answer: yup.string().required('Введите ответ'),
})

export const QuestionStep: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema))
    const { formData } = formHandler

    const {
        currentStep,
        actions: { createUserAnswerForQuestionStep },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as QuestionStepBodyInterface

    const [isLoading, setIsLoading] = createSignal(false)

    const buttonClick = async () => {
        setIsLoading(true)
        await createUserAnswerForQuestionStep({ answer: formData().answer })
        setIsLoading(false)
    }
    return (
        <>
            <div class={clsx(styles.body)}>
                <For each={stepBody().text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                <Show when={currentStep()?.userEnroll?.status !== 'OK'}>
                    <div class={clsx(styles.row)}>
                        <InputField
                            type="text"
                            placeholder="Введите пароль"
                            name="answer"
                            formHandler={formHandler}
                        />
                        <Button
                            value="Ответить"
                            onClick={() => buttonClick()}
                            disabled={formHandler.isFormInvalid()}
                            loading={isLoading()}
                        />
                    </div>
                </Show>
            </div>
            <div>
                <For each={stepBody()?.userAnswers}>{(answer) => <UserAnswerCard answer={answer} />}</For>
            </div>
        </>
    )
}
