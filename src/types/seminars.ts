import type { CourseCommonInterface } from './dashboard'
import type { StepInterface } from './steps'
import type { UserCommonInterface } from './users'

export interface SeminarInterface {
    id: number
    date: Date
    teacher: UserCommonInterface
    course: CourseCommonInterface
    steps: StepInterface[]
}
