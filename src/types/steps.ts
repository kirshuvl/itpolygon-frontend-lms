import type { EditorData } from './editor'

export interface TextStepBodyInterface {
    id: number
    text: EditorData
}

export interface VideoStepBodyInterface {
    id: number
    video_url: string
}

export interface QuestionStepBodyInterface {
    id: number
    text: EditorData
}

export interface ProblemStepBodyInterface {
    id: number
    text: EditorData
    input: EditorData
    output: EditorData
    notes: EditorData
}
