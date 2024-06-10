interface Teacher {
    id: number
    firstName: string
    lastName: string
    icon?: string
}

export interface Seminar {
    id: number
    date: Date
    teachers: Teacher[]
    course: {
        id: number
        title: string
        icon?: string
    }
}
