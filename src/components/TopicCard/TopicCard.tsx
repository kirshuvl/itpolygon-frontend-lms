import { For, type ParentComponent, Show, createSignal } from 'solid-js'
import type { TopicInterface } from '../../types/courses'

import clsx from 'clsx'
import { ProgressBarVertical } from 'itpolygon-ui-dev'

import { EmptyData } from '../EmptyData/EmptyData'
import { LessonCard } from '../LessonCard/LessonCard'
import styles from './TopicCard.module.scss'

type Props = {
    topic: TopicInterface
    index: number
}

export const TopicCard: ParentComponent<Props> = (props) => {
    const topic = props.topic
    const [isOpen, setIsOpen] = createSignal<boolean>(true)
    return (
        <>
            <div class={clsx(styles.card)} onclick={() => setIsOpen(!isOpen())}>
                <div class={clsx(styles.index)}>{props.index}</div>
                <div class={clsx(styles.content)}>{topic.title}</div>
                <div class={clsx(styles.info)}>10 / 12</div>
                <ProgressBarVertical percent={40} />
            </div>
            <Show when={isOpen()}>
                <div class={clsx(styles.lessons)}>
                    <Show when={topic.lessons.length !== 0} fallback={<EmptyData text="Уроков нет" />}>
                        <For each={topic.lessons}>
                            {(lesson, index) => <LessonCard index={index() + 1} lesson={lesson} />}
                        </For>
                    </Show>
                </div>
            </Show>
        </>
    )
}
