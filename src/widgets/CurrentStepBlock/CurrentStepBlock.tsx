import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, Show } from 'solid-js'
import { useLessonStateContext } from '../../context/lesson'
import { LessonContentSkeleton } from '../../screens/lesson/LessonContentSkeleton/LessonContent.Skeleton'
import { TopicBlockHeaderSkeleton } from '../TopicsBlock/Skeleton/TopicsBlock.Skeleton'

export const CurrentStepBlock: Component = () => {
    const { lesson, currentStep } = useLessonStateContext()

    return (
        <>
            <TitleBlock
                title={lesson()?.title ?? 'Название курса куда-то потерялось'}
                loading={lesson.loading}
                fallback={<TopicBlockHeaderSkeleton />}
            />
            <Show when={lesson.loading}>
                <LessonContentSkeleton />
            </Show>
            {JSON.stringify(currentStep())}
        </>
    )
}
