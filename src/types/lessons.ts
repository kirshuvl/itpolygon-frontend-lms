import type { userStatistics } from './dashboard'
import type { StepInterface } from './steps'

export interface LessonInterface {
    id: number
    title: string
    number: number
    userStatistics: userStatistics
    steps: StepInterface[]
}
