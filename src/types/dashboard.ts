interface userStatistics {
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

interface Teacher {
    id: number
    firstName: string
    lastName: string
    icon?: string
}

interface Course {
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
    teacher: Teacher
    course: Course
}

export interface SeminarDashboardInterface extends HomeworkDashboardInterface {}
