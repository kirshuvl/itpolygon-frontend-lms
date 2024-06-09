import { type Component, Show } from 'solid-js'
import type { Course } from '../../types/courses'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'
import styles from './CourseCard.module.scss'

type Props = {
    course: Course
}

export const CourseCard: Component<Props> = (props) => {
    const course = props.course
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(`/course/${course.id}/`)} class={clsx(styles.card)}>
                <div class={clsx(styles.icon)}>
                    <Show
                        when={course.icon}
                        fallback={<div class={clsx(styles.title)}>{course.title[0]}</div>}
                    >
                        <img src={course.icon} alt={`Картинка группы ${course.title}`} />
                    </Show>
                </div>
                <div class={clsx(styles.content)}>
                    <div class={clsx(styles.line)}>
                        <div class={clsx(styles.title)}>{course.title}</div>
                    </div>
                    <div class={clsx(styles.line)}>
                        {course.userStatistics.theoreticalSteps.completed} /{' '}
                        {course.userStatistics.theoreticalSteps.total} лекций |{' '}
                        {course.userStatistics.practicalSteps.completed} /{' '}
                        {course.userStatistics.practicalSteps.total} заданий
                    </div>
                </div>
                <ProgressBarVertical
                    percent={
                        (course.userStatistics.completedSteps / course.userStatistics.totalSteps) * 100
                    }
                />
            </div>
        </>
    )
}
