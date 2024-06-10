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
import { apiCourses } from '../api/apiCourses'
import { apiSeminars } from '../api/apiSeminars'
import type { CourseInfoInterface } from '../types/courses'
import type { SeminarInfoInterface } from '../types/seminars'
import { debugMessage } from '../utils/debugMessage'
import { useSessionStateContext } from './session'

type DashboardContextType = {
    courses: {
        studentCourses: Resource<CourseInfoInterface[] | null>
        actions: {
            mutateStudentCourses: () => Setter<CourseInfoInterface[]> | undefined
            refetchStudentCourses: () =>
                | CourseInfoInterface[]
                | Promise<CourseInfoInterface[] | undefined>
                | null
                | undefined
        }
    }
    seminars: {
        studentSeminars: Resource<SeminarInfoInterface[] | null>
        actions: {
            mutateStudentSeminars: () => Setter<SeminarInfoInterface[]> | undefined
            refetchStudentSeminars: () =>
                | SeminarInfoInterface[]
                | Promise<SeminarInfoInterface[] | undefined>
                | null
                | undefined
        }
    }
}

const DashboardStateContext = createContext<DashboardContextType>()

export const DashboardProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [studentCourses, { mutate: mutateStudentCourses, refetch: refetchStudentCourses }] =
        createResource<CourseInfoInterface[], boolean>(isAuthenticated, apiCourses.getCourses)
    const [studentSeminars, { mutate: mutateStudentSeminars, refetch: refetchStudentSeminars }] =
        createResource<SeminarInfoInterface[], boolean>(isAuthenticated, apiSeminars.getSeminars)
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
