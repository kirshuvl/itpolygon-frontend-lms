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
import { apiSeminars } from '../api/seminars/apiSeminars'
import type { Course } from '../types/courses'
import type { Seminar } from '../types/seminars'
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
    seminars: {
        studentSeminars: Resource<Seminar[] | null>
        actions: {
            mutateStudentSeminars: () => Setter<Seminar[]> | undefined
            refetchStudentSeminars: () => Seminar[] | Promise<Seminar[] | undefined> | null | undefined
        }
    }
}

const DashboardStateContext = createContext<DashboardContextType>()

export const DashboardProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [studentCourses, { mutate: mutateStudentCourses, refetch: refetchStudentCourses }] =
        createResource<Course[], boolean>(isAuthenticated, apiCourses.getCourses)
    const [studentSeminars, { mutate: mutateStudentSeminars, refetch: refetchStudentSeminars }] =
        createResource<Seminar[], boolean>(isAuthenticated, apiSeminars.getSeminars)
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
    const seminars = {
        studentSeminars,
        actions: {
            mutateStudentSeminars,
            refetchStudentSeminars,
        },
    }
    const value = {
        courses,
        seminars,
    }

    return <DashboardStateContext.Provider value={value}>{props.children}</DashboardStateContext.Provider>
}

export function useDashboardStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(DashboardStateContext)!
}
