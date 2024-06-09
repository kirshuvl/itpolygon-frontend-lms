import {
    type ParentComponent,
    type Resource,
    type Setter,
    createContext,
    createResource,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'
import { apiCourses } from '../api/courses/apiCourses'
import type { Course } from '../types/courses'
import { debugMessage } from '../utils/debugMessage'
import { useSessionStateContext } from './session'

type DashboardContextType = {
    courses: {
        studentCourses: Resource<Course[] | null>
        actions: {
            mutateStudentCourses: () => Setter<Course[]> | undefined
            refetchStudentCourses: () => Course[] | Promise<Course[] | undefined> | null | undefined
        }
    }
}

const DashboardStateContext = createContext<DashboardContextType>()

export const DashboardProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [studentCourses, { mutate: mutateStudentCourses, refetch: refetchStudentCourses }] =
        createResource<Course[], boolean>(isAuthenticated, apiCourses.getCourses)

    onMount(() => {
        debugMessage('[onMount][Provider] DashboardProvider')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] DashboardProvider')
    })

    const courses = {
        studentCourses,
        actions: {
            mutateStudentCourses,
            refetchStudentCourses,
        },
    }

    const value = {
        courses,
    }

    return <DashboardStateContext.Provider value={value}>{props.children}</DashboardStateContext.Provider>
}

export function useDashboardStateContext() {
    if (DashboardStateContext) {
        return useContext(DashboardStateContext)
    }
}
