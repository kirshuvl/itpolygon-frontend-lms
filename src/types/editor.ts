interface EditorBaseBlock {
    id: string
}

export interface EditorTextBlock extends EditorBaseBlock {
    type: 'paragraph'
    data: {
        text: string
    }
}

export interface EditorImageBlock extends EditorBaseBlock {
    type: 'image'
    data: {
        file: {
            url: string
        }
    }
}

export interface EditorData {
    time: number
    blocks: (EditorTextBlock | EditorImageBlock)[]
}
