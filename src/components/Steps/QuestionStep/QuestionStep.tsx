import { type Component, For } from 'solid-js'
import { useLessonStateContext } from '../../../context/lesson'

import clsx from 'clsx'
import { Button, InputField } from 'itpolygon-ui-dev'
import type { QuestionStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import styles from './QuestionStep.module.scss'

export const QuestionStep: Component = () => {
    const { currentStep } = useLessonStateContext()
    const stepBody = currentStep()?.body as QuestionStepBodyInterface

    return (
        <>
            <div class={clsx(styles.body)}>
                <For each={stepBody.text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                <div class={clsx(styles.row)}>
                    <InputField placeholder="Введите ответ" />
                    <Button value="Ответить" />
                </div>
            </div>
        </>
    )
}
