import type { StepInterface } from './steps'

export interface LessonInterface {
    id: number
    title: string
    number: number
    steps: StepInterface[]
}
