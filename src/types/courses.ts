export interface Course {
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
