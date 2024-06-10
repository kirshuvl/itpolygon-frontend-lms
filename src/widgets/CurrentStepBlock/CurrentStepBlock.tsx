import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, Match, Show, Switch } from 'solid-js'
import { ProblemStep } from '../../components/Steps/ProblemStep/ProblemStep'
import { QuestionStep } from '../../components/Steps/QuestionStep/QuestionStep'
import { TextStep } from '../../components/Steps/TextStep/TextStep'
import { VideoStep } from '../../components/Steps/VideoStep/VideoStep'
import { useLessonStateContext } from '../../context/lesson'
import { LessonContentSkeleton } from '../../screens/lesson/LessonContentSkeleton/LessonContent.Skeleton'
import { TopicBlockHeaderSkeleton } from '../TopicsBlock/Skeleton/TopicsBlock.Skeleton'

export const CurrentStepBlock: Component = () => {
    const { lesson, currentStep } = useLessonStateContext()

    return (
        <>
            <TitleBlock
                title={currentStep()?.title ?? 'Нет заголовка'}
                loading={lesson.loading}
                fallback={<TopicBlockHeaderSkeleton />}
            />
            <Show when={lesson.loading}>
                <LessonContentSkeleton />
            </Show>
            <Switch>
                <Match when={currentStep()?.stepType === 'textstep'}>
                    <TextStep />
                </Match>
                <Match when={currentStep()?.stepType === 'videostep'}>
                    <VideoStep />
                </Match>
                <Match when={currentStep()?.stepType === 'questionstep'}>
                    <QuestionStep />
                </Match>
                <Match when={currentStep()?.stepType === 'problemstep'}>
                    <ProblemStep />
                </Match>
            </Switch>
        </>
    )
}
