import type { UserCommonInterface } from './users'

export interface userStatistics {
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

export interface CourseCommonInterface {
    id: number
    title: string
    icon?: string
}

export interface CourseDashboardInterface {
    id: number
    title: string
    icon?: string
    userStatistics: userStatistics
}

export interface HomeworkDashboardInterface {
    id: number
    date: Date
    teacher: UserCommonInterface
    course: CourseCommonInterface
    userStatistics: userStatistics
}

export interface SeminarDashboardInterface extends HomeworkDashboardInterface {}
