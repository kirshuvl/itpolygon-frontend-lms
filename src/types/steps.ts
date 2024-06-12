import type { EditorDataInterface } from './editor'

export interface StepInterface {
    id: number
    title: string | null
    stepType: 'textstep' | 'videostep' | 'questionstep' | 'problemstep'
    userEnroll: UserStepEnrollInterface | null
    body:
        | TextStepBodyInterface
        | VideoStepBodyInterface
        | QuestionStepBodyInterface
        | ProblemStepBodyInterface
}

export interface UserStepEnrollInterface {
    id: number
    status: 'OK' | 'PR' | 'WA'
}

export interface TextStepBodyInterface {
    id: number
    text: EditorDataInterface
}

export interface VideoStepBodyInterface {
    id: number
    video_url: string
}

export interface QuestionStepBodyInterface {
    id: number
    text: EditorDataInterface
    userAnswers: UserAnswerForQuestionStepInterface[]
}

export interface ProblemStepBodyInterface {
    id: number
    text: EditorDataInterface
    input: EditorDataInterface
    output: EditorDataInterface
    notes: EditorDataInterface
}

export interface UserAnswerForQuestionStepInterface {
    id: number
    user: number
    question: number
    answer: string
    is_correct: boolean
}
