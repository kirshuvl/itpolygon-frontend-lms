import { type Component, Match, Switch } from 'solid-js'
import type { EditorImageBlockInterface, EditorTextBlockInterface } from '../../types/editor'
import { EditorImageBlock } from './EditorImageBlock/Image'
import { EditorTextBlock } from './EditorTextBlock/Text'

type Props = {
    block: EditorTextBlockInterface | EditorImageBlockInterface
}

export const EditorBlock: Component<Props> = (props) => {
    const block = props.block
    return (
        <Switch>
            <Match when={block.type === 'paragraph'}>
                <EditorTextBlock block={block as EditorTextBlockInterface} />
            </Match>
            <Match when={block.type === 'image'}>
                <EditorImageBlock block={block as EditorImageBlockInterface} />
            </Match>
        </Switch>
    )
}
