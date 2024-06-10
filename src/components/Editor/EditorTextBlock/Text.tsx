import type { Component } from 'solid-js'
import type { EditorTextBlockInterface } from '../../../types/editor'

type Props = {
    block: EditorTextBlockInterface
}
export const EditorTextBlock: Component<Props> = (props) => {
    const block = props.block

    return <div innerHTML={block.data.text} />
}
