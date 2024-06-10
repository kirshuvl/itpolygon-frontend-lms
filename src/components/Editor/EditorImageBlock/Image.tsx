import clsx from 'clsx'
import type { Component } from 'solid-js'
import type { EditorImageBlockInterface } from '../../../types/editor'
import styles from './Image.module.scss'

type Props = {
    block: EditorImageBlockInterface
}

export const EditorImageBlock: Component<Props> = (props) => {
    const block = props.block
    return <img src={block.data.file.url} class={clsx(styles.image)} />
}
