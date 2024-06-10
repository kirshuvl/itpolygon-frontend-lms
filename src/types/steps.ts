import type { EditorData } from './editor'

export interface TextStepBody {
    id: number
    text: EditorData
}

export interface VideoStepBody {
    id: number
    video_url: string
}
