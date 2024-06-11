import clsx from 'clsx'
import { type Component, For } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { ProblemStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'
import styles from './ProblemStep.module.scss'

export const ProblemStep: Component = () => {
    const { currentStep } = useResourseStateContext()
    const stepBody = currentStep()?.body as ProblemStepBodyInterface

    return (
        <div class={clsx(styles.body)}>
            <div class={clsx(styles.block)}>
                <div class={clsx(styles.header)}>Условие задачи:</div>
                <div>
                    <For each={stepBody.text.blocks}>{(block) => <EditorBlock block={block} />}</For>
                </div>
            </div>
            <div class={clsx(styles.block)}>
                <div class={clsx(styles.header)}>Формат ввода:</div>
                <div>
                    <For each={stepBody.input.blocks}>{(block) => <EditorBlock block={block} />}</For>
                </div>
            </div>
            <div class={clsx(styles.block)}>
                <div class={clsx(styles.header)}>Формат вывода:</div>
                <div>
                    <For each={stepBody.output.blocks}>{(block) => <EditorBlock block={block} />}</For>
                </div>
            </div>
            <div class={clsx(styles.block)}>
                <div class={clsx(styles.header)}>Примечания:</div>
                <div>
                    <For each={stepBody.notes.blocks}>{(block) => <EditorBlock block={block} />}</For>
                </div>
            </div>
        </div>
    )
}
