import type { userStatistics } from './dashboard'
import type { LessonInterface } from './lessons'

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
    userStatistics: userStatistics
    lessons: LessonInterface[]
}
