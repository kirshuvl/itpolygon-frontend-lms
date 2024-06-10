interface EditorBaseBlockInterface {
    id: string
}

export interface EditorTextBlockInterface extends EditorBaseBlockInterface {
    type: 'paragraph'
    data: {
        text: string
    }
}

export interface EditorImageBlockInterface extends EditorBaseBlockInterface {
    type: 'image'
    data: {
        file: {
            url: string
        }
    }
}

export interface EditorData {
    time: number
    blocks: (EditorTextBlockInterface | EditorImageBlockInterface)[]
}
