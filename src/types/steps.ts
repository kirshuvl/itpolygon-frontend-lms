import type { EditorData } from './editor'

export interface TextStepBodyInterface {
    id: number
    text: EditorData
}

export interface VideoStepBodyInterface {
    id: number
    video_url: string
}
