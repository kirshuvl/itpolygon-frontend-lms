import { TitleBlock } from 'itpolygon-ui-dev'
import { For, type ParentComponent, Show } from 'solid-js'

import clsx from 'clsx'

import { EmptyData } from '../../components/EmptyData/EmptyData'
import { TopicCard } from '../../components/TopicCard/TopicCard'
import { useCourseStateContext } from '../../context/course'
import { TopicBlockHeaderSkeleton, TopicsBlockBodySkeleton } from './Skeleton/TopicsBlock.Skeleton'
import styles from './TopicsBlock.module.scss'

export const TopicsBlock: ParentComponent = () => {
    const { courseCurriculum } = useCourseStateContext()
    return (
        <div class={clsx(styles.body)}>
            <TitleBlock
                title={courseCurriculum()?.title ?? 'Название курса куда-то потерялось'}
                loading={courseCurriculum.loading}
                fallback={<TopicBlockHeaderSkeleton />}
            />
            <Show when={!courseCurriculum() && courseCurriculum.loading}>
                <TopicsBlockBodySkeleton />
            </Show>
            <Show when={courseCurriculum() && courseCurriculum()?.topics.length === 0}>
                <EmptyData text="У вас нет ни одного курса" />
            </Show>
            <Show when={courseCurriculum() && courseCurriculum()?.topics.length !== 0}>
                <For each={courseCurriculum()?.topics}>
                    {(topic, index) => <TopicCard index={index() + 1} topic={topic} />}
                </For>
            </Show>
        </div>
    )
}
