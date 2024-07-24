import { Button } from 'itpolygon-ui-dev'
import { type Component, For, Show, createSignal } from 'solid-js'
import { useResourseStateContext } from '../../../context/universal'
import type { TextStepBodyInterface } from '../../../types/steps'
import { EditorBlock } from '../../Editor/EditorBlock'

export const TextStep: Component = () => {
    const {
        currentStep,
        actions: { updateUserStepEnroll },
    } = useResourseStateContext()
    const stepBody = () => currentStep()?.body as TextStepBodyInterface
    const [isLoading, setIsLoading] = createSignal(false)
    const buttonClick = async () => {
        setIsLoading(true)
        await updateUserStepEnroll({
            status: 'OK',
        })
        setIsLoading(false)
    }
    return (
        <>
            <For each={stepBody().text.blocks}>{(block) => <EditorBlock block={block} />}</For>
            <Show when={currentStep()?.userEnroll?.status !== 'OK'}>
                <Button
                    onClick={() => buttonClick()}
                    value="Все понятно"
                    variant="success"
                    outline
                    loading={isLoading()}
                />
            </Show>
        </>
    )
}
