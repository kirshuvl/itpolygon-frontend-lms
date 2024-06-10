interface TeacherInterface {
    id: number
    firstName: string
    lastName: string
    icon?: string
}

export interface SeminarInfoInterface {
    id: number
    date: Date
    teachers: TeacherInterface[]
    course: {
        id: number
        title: string
        icon?: string
    }
}
