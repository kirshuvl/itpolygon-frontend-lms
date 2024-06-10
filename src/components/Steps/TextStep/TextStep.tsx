import { type Component, For } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { TextStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'

export const TextStep: Component = () => {
    const { currentStep } = useResourseStateContext()
    const stepBody = currentStep()?.body as TextStepBodyInterface

    return (
        <>
            <For each={stepBody.text.blocks}>{(block) => <EditorBlock block={block} />}</For>
        </>
    )
}
