import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, onMount } from 'solid-js'

import { CourseCard } from '../../components/CourseCard/CourseCard'
import { CourseCardSkeleton } from '../../components/CourseCard/Skeleton/CourseCard.Skeleton'
import { EmptyData } from '../../components/EmptyData/EmptyData'
import { useDashboardStateContext } from '../../context/dashboard'

export const CoursesBlock: Component = () => {
    const {
        courses: {
            studentCourses,
            actions: { refetchStudentCourses },
        },
    } = useDashboardStateContext()

    onMount(() => {
        if (studentCourses() && !studentCourses.loading) {
            refetchStudentCourses()
        }
    })

    return (
        <>
            <TitleBlock title="Мои курсы" />
            <Show when={!studentCourses() && studentCourses.loading}>
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
            </Show>
            <Show when={studentCourses() && studentCourses()?.length === 0}>
                <EmptyData text="У вас нет ни одного курса" />
            </Show>
            <Show when={studentCourses() && studentCourses()?.length !== 0}>
                <For each={studentCourses()}>{(course) => <CourseCard course={course} />}</For>
            </Show>
        </>
    )
}
