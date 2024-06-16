import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import { For, createSignal } from 'solid-js'
import type { Component } from 'solid-js'
import * as yup from 'yup'
import { useResourseStateContext } from '../../../context/universal'
import type { ProblemStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import { FileInput } from '../../FileInput/FileInput'
import styles from './ProblemStep.module.scss'

const isRequired = (value?: File) => (value ? true : false)
const fileSize = (value?: File) => {
    const size = value?.size || 0
    return size <= 200000 ? true : false
}

type UserAnswer = {
    answer: File
}

const userSchema: yup.Schema<UserAnswer> = yup.object({
    answer: yup
        .mixed<File>()
        .test({
            name: 'fileSize',
            message: 'File exceeds 200kb',
            test: fileSize,
        })
        .test({ name: 'isRequired', message: 'File is required', test: isRequired })
        .required(),
})

export const ProblemStep: Component = () => {
    const {
        currentStep,
        actions: { createUserAnswerForProblemStep },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as ProblemStepBodyInterface
    const [isLoading, setIsLoading] = createSignal(false)

    const formHandler = useFormHandler<UserAnswer>(yupSchema(userSchema))
    const { formData } = formHandler

    const printFile = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsText(file)
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    resolve(event.target.result)
                } else {
                    reject(new Error('Failed to read file'))
                }
            }

            reader.onerror = () => {
                reject(new Error('Error reading file'))
            }
        })
    }

    const buttonClick = async () => {
        setIsLoading(true)
        const userCode = await printFile(formData().answer)

        await createUserAnswerForProblemStep({ code: userCode as string })

        setIsLoading(false)
    }

    return (
        <>
            <div class={clsx(styles.body)}>
                <div class={clsx(styles.block)}>
                    <div class={clsx(styles.header)}>Условие задачи:</div>
                    <div>
                        <For each={stepBody().text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                    </div>
                </div>
                <div class={clsx(styles.block)}>
                    <div class={clsx(styles.header)}>Формат ввода:</div>
                    <div>
                        <For each={stepBody().input.blocks}>{(block) => <EditorBlock block={block} />}</For>
                    </div>
                </div>
                <div class={clsx(styles.block)}>
                    <div class={clsx(styles.header)}>Формат вывода:</div>
                    <div>
                        <For each={stepBody().output.blocks}>
                            {(block) => <EditorBlock block={block} />}
                        </For>
                    </div>
                </div>
                <div class={clsx(styles.block)}>
                    <div class={clsx(styles.header)}>Примечания:</div>
                    <div>
                        <For each={stepBody().notes.blocks}>{(block) => <EditorBlock block={block} />}</For>
                    </div>
                </div>
            </div>
            <FileInput name="answer" formHandler={formHandler} />
            <Button
                value="Ответить"
                onClick={() => buttonClick()}
                disabled={formHandler.isFormInvalid()}
                loading={isLoading()}
            />
            <p>{JSON.stringify(stepBody().userAnswers)}</p>
        </>
    )
}
