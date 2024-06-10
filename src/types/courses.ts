import type { TextStepBody, VideoStepBody } from './steps'

export interface CourseInfoInterface {
    id: number
    title: string
    icon?: string
    userStatistics: {
        totalSteps: number
        completedSteps: number
        theoreticalSteps: {
            total: number
            completed: number
        }
        practicalSteps: {
            total: number
            completed: number
        }
    }
}

export interface Course {
    id: number
    title: string
    icon?: string
    topics: Topic[]
}

export interface Topic {
    id: number
    title: string
    number: number
    lessons: Lesson[]
}

export interface Lesson {
    id: number
    title: string
    number: number
    steps: Step[]
}

export interface Step {
    id: number
    title: string | null
    stepType: 'textstep' | 'videostep' | 'questionstep' | 'problemstep'
    userEnroll: UserEnroll | null
    body: TextStepBody | VideoStepBody
}

export interface UserEnroll {
    id: number
    status: 'OK' | 'PR' | 'WA'
}
