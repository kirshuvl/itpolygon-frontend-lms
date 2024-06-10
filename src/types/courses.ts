import type { TextStepBodyInterface, VideoStepBodyInterface } from './steps'

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

export interface CourseInterface {
    id: number
    title: string
    icon?: string
    topics: TopicInterface[]
}

export interface TopicInterface {
    id: number
    title: string
    number: number
    lessons: LessonInterface[]
}

export interface LessonInterface {
    id: number
    title: string
    number: number
    steps: StepInterface[]
}

export interface StepInterface {
    id: number
    title: string | null
    stepType: 'textstep' | 'videostep' | 'questionstep' | 'problemstep'
    userEnroll: UserEnrollInterface | null
    body: TextStepBodyInterface | VideoStepBodyInterface
}

export interface UserEnrollInterface {
    id: number
    status: 'OK' | 'PR' | 'WA'
}
