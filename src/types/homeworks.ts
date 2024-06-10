import type { StepInterface } from './courses'

export interface HomeworkInterface {
    id: number
    author: {
        id: number
        firstName: string
        lastName: string
        icon?: string
    }
    seminar: {
        id: number
        date: Date
    }
    steps: StepInterface[]
}
