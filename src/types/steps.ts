import type { EditorDataInterface } from './editor'

export interface StepInterface {
    id: number
    title: string | null
    stepType: 'textstep' | 'videostep' | 'questionstep' | 'singlechoicequestionstep' | 'problemstep'
    liked_by: number
    bookmarked_by: number
    viewed_by: number
    userEnroll: UserStepEnrollInterface | null
    userLike: {
        id: number
    } | null
    body:
        | TextStepBodyInterface
        | VideoStepBodyInterface
        | QuestionStepBodyInterface
        | ProblemStepBodyInterface
}

export interface UserStepEnrollInterface {
    id: number
    status: 'OK' | 'PR' | 'WA' | 'WT'
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

export interface UserAnserForSingleChoiceSuestionStepInterface {
    id: number
    answer: {
        id: number
        answer: string
        is_correct: boolean
    }
    created_at: Date
}

export interface SingleChoiceQuestionStepBodyInterface {
    id: number
    text: EditorDataInterface
    stepAnswers: {
        id: number
        answer: string
        is_correct: boolean
    }[]
    userAnswers: UserAnserForSingleChoiceSuestionStepInterface[]
}

export interface ProblemStepBodyInterface {
    id: number
    text: EditorDataInterface
    input: EditorDataInterface
    output: EditorDataInterface
    notes: EditorDataInterface
    cpuTime: number
    memody: number
    userAnswers: UserAnswerForProblemStepInterface[]
    stepTests: {
        id: number
        number: number
        input: string
        output: string
    }[]
}

export interface UserAnswerForQuestionStepInterface {
    id: number
    user: number
    question: number
    answer: string
    is_correct: boolean
}

export interface UserAnswerForProblemStepInterface {
    id: number
    language: string
    verdict: string
    cpuTime: number
    created_at: Date
}
