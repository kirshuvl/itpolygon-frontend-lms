import type { ParentComponent } from 'solid-js'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'
import type { LessonInterface } from '../../types/lessons'
import styles from './LessonCard.module.scss'

type Props = {
    lesson: LessonInterface
    index: number
}

export const LessonCard: ParentComponent<Props> = (props) => {
    const navigate = useNavigate()
    const lesson = props.lesson
    return (
        <div class={clsx(styles.card)} onclick={() => navigate(`/lesson/${lesson.id}/`)}>
            <div class={clsx(styles.index)}>{props.index}</div>
            <div class={clsx(styles.content)}>{lesson.title}</div>
            <div class={clsx(styles.info)}>10 / 12</div>
            <ProgressBarVertical percent={40} />
        </div>
    )
}
