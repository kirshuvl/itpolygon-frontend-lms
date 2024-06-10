import { useParams } from '@solidjs/router'
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
import type { CourseCurriculum } from '../types/courses'
import { debugMessage } from '../utils/debugMessage'

type CourseContextType = {
    courseCurriculum: Resource<CourseCurriculum | null>
    actions: {
        mutateCourse: Setter<CourseCurriculum | undefined>
        refetchCourse: () => CourseCurriculum | Promise<CourseCurriculum | undefined> | null | undefined
    }
}

const CourseStateContext = createContext<CourseContextType>()

export const CourseProvider: ParentComponent = (props) => {
    const { courseId } = useParams<{ courseId: string }>()

    const [courseCurriculum, { mutate: mutateCourse, refetch: refetchCourse }] = createResource<
        CourseCurriculum,
        { courseId: string }
    >({ courseId: courseId }, apiCourses.getCourse)

    const value = {
        courseCurriculum,
        actions: {
            mutateCourse,
            refetchCourse,
        },
    }

    onMount(() => {
        debugMessage('[onMount][Provider] CourseProvider')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] CourseProvider')
    })

    return <CourseStateContext.Provider value={value}>{props.children}</CourseStateContext.Provider>
}

export function useCourseStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(CourseStateContext)!
}
