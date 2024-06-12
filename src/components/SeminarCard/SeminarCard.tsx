import { type Component, Show } from 'solid-js'

import { A, useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import type { SeminarDashboardInterface } from '../../types/dashboard'
import styles from './SeminarCard.module.scss'

type Props = {
    seminar: SeminarDashboardInterface
}

export const SeminarCard: Component<Props> = (props) => {
    const seminar = props.seminar
    const teacher = seminar.teacher

    const date = new Date(seminar.date)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // добавляем 1, так как месяцы в JS начинаются с 0
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const navigate = useNavigate()

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`
    return (
        <div onClick={() => navigate(`/seminar/${seminar.id}/`)} class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <Show
                    when={seminar.course.icon}
                    fallback={<div class={clsx(styles.title)}>{seminar.course.title[0]}</div>}
                >
                    <img src={seminar.course.icon} alt={`Картинка группы ${seminar.course.title}`} />
                </Show>
            </div>
            <div class={clsx(styles.content)}>
                {seminar.course.title}
                <div class={clsx(styles.line)}>
                    {formattedDate}
                    <A href="">
                        {teacher.firstName} {teacher.lastName}
                    </A>
                </div>
            </div>
        </div>
    )
}
