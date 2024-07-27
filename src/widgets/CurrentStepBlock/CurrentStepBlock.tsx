import { ActionButton, IconBookmark, IconHeart, IconHeartSolid, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, Match, Show, Switch, createSignal } from 'solid-js'
import { ProblemStep } from '../../components/Steps/ProblemStep/ProblemStep'
import { QuestionStep } from '../../components/Steps/QuestionStep/QuestionStep'
import { TextStep } from '../../components/Steps/TextStep/TextStep'
import { VideoStep } from '../../components/Steps/VideoStep/VideoStep'
import { useResourseStateContext } from '../../context/universal'
import { LessonContentSkeleton } from '../../screens/lesson/LessonContentSkeleton/LessonContent.Skeleton'
import { TopicBlockHeaderSkeleton } from '../TopicsBlock/Skeleton/TopicsBlock.Skeleton'

import clsx from 'clsx'
import styles from './CurrentStepBlock.module.scss'

export const CurrentStepBlock: Component = () => {
    const {
        resource,
        currentStep,
        actions: { createUserStepLike, deleteUserStepLike },
    } = useResourseStateContext()

    const [isLikeUpdating, setIsLikeUpdating] = createSignal(false)

    const createLike = async () => {
        setIsLikeUpdating(true)
        await createUserStepLike({ stepId: currentStep()?.id })
        setIsLikeUpdating(false)
    }

    const deleteLike = async () => {
        setIsLikeUpdating(true)

        await deleteUserStepLike({ stepId: currentStep()?.id, userStepLikeId: currentStep()?.userLike?.id })
        setIsLikeUpdating(false)
    }

    return (
        <>
            <TitleBlock
                title={
                    <div class={clsx(styles.header)}>
                        <div>{currentStep()?.title ?? 'Нет заголовка'}</div>
                        <div class={clsx(styles.buttons)}>
                            {currentStep()?.liked_by}
                            <Show
                                when={currentStep()?.userLike !== null}
                                fallback={
                                    <ActionButton
                                        icon={IconHeart}
                                        iconLoading={IconHeart}
                                        loading={isLikeUpdating()}
                                        onClick={createLike}
                                        variant="danger"
                                    />
                                }
                            >
                                <ActionButton
                                    icon={IconHeartSolid}
                                    iconLoading={IconHeartSolid}
                                    loading={isLikeUpdating()}
                                    onClick={deleteLike}
                                    variant="danger"
                                />
                            </Show>
                            <ActionButton icon={IconBookmark} />
                        </div>
                    </div>
                }
                loading={resource.loading}
                fallback={<TopicBlockHeaderSkeleton />}
            />
            <Show when={resource.loading}>
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
