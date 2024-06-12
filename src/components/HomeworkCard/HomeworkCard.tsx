import { type Component, Show } from 'solid-js'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'
import type { HomeworkDashboardInterface } from '../../types/dashboard'
import styles from './HomeworkCard.module.scss'

type Props = {
    homework: HomeworkDashboardInterface
}

export const HomeworkCard: Component<Props> = (props) => {
    const homework = props.homework

    const date = new Date(homework.date)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // добавляем 1, так как месяцы в JS начинаются с 0
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const navigate = useNavigate()

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`
    return (
        <div onClick={() => navigate(`/homework/${homework.id}/`)} class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <Show
                    when={homework.course.icon}
                    fallback={<div class={clsx(styles.title)}>{homework.course.title[0]}</div>}
                >
                    <img src={homework.course.icon} alt={`Картинка группы ${homework.course.title}`} />
                </Show>
            </div>
            <div class={clsx(styles.content)}>
                {homework.course.title}
                <div class={clsx(styles.line)}>{formattedDate}</div>
            </div>
            <ProgressBarVertical percent={50} />
        </div>
    )
}
