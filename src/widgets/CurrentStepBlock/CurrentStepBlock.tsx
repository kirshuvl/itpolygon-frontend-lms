import { ActionButton, IconBookmark, IconHeart, IconHeartSolid, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, Match, Show, Switch, createEffect, createSignal, on } from 'solid-js'
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

    createEffect(
        on(currentStep, () => {
            setIsLikeUpdating(false)
        }),
    )

    const createLike = async () => {
        setIsLikeUpdating(true)
        const stepId = currentStep()?.id
        if (stepId !== undefined) {
            await createUserStepLike({ stepId: stepId })
        }
        setIsLikeUpdating(false)
    }

    const deleteLike = async () => {
        setIsLikeUpdating(true)
        const stepId = currentStep()?.id
        const userLikeId = currentStep()?.userLike?.id
        if (stepId !== undefined && userLikeId !== undefined) {
            await deleteUserStepLike({ stepId: stepId, userStepLikeId: userLikeId })
        }

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
