import { type Component, For } from 'solid-js'

import clsx from 'clsx'
import { Button, InputField } from 'itpolygon-ui-dev'
import { useResourseStateContext } from '../../../context/universal'
import type { QuestionStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import styles from './QuestionStep.module.scss'

export const QuestionStep: Component = () => {
    const { currentStep } = useResourseStateContext()
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
