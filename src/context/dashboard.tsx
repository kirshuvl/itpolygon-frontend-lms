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
import type { CourseDashboardInterface, SeminarDashboardInterface } from '../types/dashboard'
import { debugMessage } from '../utils/debugMessage'
import { useSessionStateContext } from './session'

type DashboardContextType = {
    courses: {
        studentCourses: Resource<CourseDashboardInterface[] | null>
        actions: {
            mutateStudentCourses: () => Setter<CourseDashboardInterface[]> | undefined
            refetchStudentCourses: () =>
                | CourseDashboardInterface[]
                | Promise<CourseDashboardInterface[] | undefined>
                | null
                | undefined
        }
    }
    seminars: {
        studentSeminars: Resource<SeminarDashboardInterface[] | null>
        actions: {
            mutateStudentSeminars: () => Setter<SeminarDashboardInterface[]> | undefined
            refetchStudentSeminars: () =>
                | SeminarDashboardInterface[]
                | Promise<SeminarDashboardInterface[] | undefined>
                | null
                | undefined
        }
    }
}

const DashboardStateContext = createContext<DashboardContextType>()

export const DashboardProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [studentCourses, { mutate: mutateStudentCourses, refetch: refetchStudentCourses }] =
        createResource<CourseDashboardInterface[], boolean>(isAuthenticated, apiCourses.getCourses)
    const [studentSeminars, { mutate: mutateStudentSeminars, refetch: refetchStudentSeminars }] =
        createResource<SeminarDashboardInterface[], boolean>(isAuthenticated, apiSeminars.getSeminars)

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
