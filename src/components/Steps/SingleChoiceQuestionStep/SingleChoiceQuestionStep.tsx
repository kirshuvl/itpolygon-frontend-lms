import { type Component, For, Show, createSignal } from 'solid-js'

import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { Radios } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import * as yup from 'yup'
import { useResourseStateContext } from '../../../context/universal'
import type { SingleChoiceQuestionStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import styles from './SingleChoiceQuestionStep.module.scss'

type UserAnswer = {
    answer: number
}

export const userAnswerSchema: yup.Schema<UserAnswer> = yup.object({
    answer: yup.number().required('Введите ответ'),
})

export const SingleChoiceQuestionStep: Component = () => {
    const formHandler = useFormHandler(yupSchema(userAnswerSchema))
    const { formData } = formHandler

    const {
        currentStep,
        actions: { createUserAnswerForSingleChoiceQuestionStep },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as SingleChoiceQuestionStepBodyInterface

    const [isLoading, setIsLoading] = createSignal(false)

    const buttonClick = async () => {
        setIsLoading(true)
        await createUserAnswerForSingleChoiceQuestionStep({ answerId: formData().answer })
        setIsLoading(false)
        formHandler.resetForm()
    }

    const transformedData = stepBody().stepAnswers.map((answer) => ({
        value: answer.id,
        label: answer.answer,
    }))

    return (
        <>
            <div class={clsx(styles.body)}>
                <For each={stepBody().text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                <Show when={currentStep()?.userEnroll?.status !== 'OK'}>
                    <Radios options={transformedData} name="answer" formHandler={formHandler} />
                    <Button
                        value="Ответить"
                        valueLoading="Мы проверяем твой ответ"
                        onClick={() => buttonClick()}
                        loading={isLoading()}
                    />
                </Show>
            </div>
        </>
    )
}
