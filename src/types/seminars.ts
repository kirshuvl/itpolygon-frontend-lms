import type { StepInterface } from './courses'

interface TeacherInterface {
    id: number
    firstName: string
    lastName: string
    icon?: string
}

export interface SeminarInterface {
    id: number
    steps: StepInterface[]
    teachers: TeacherInterface[]
}
