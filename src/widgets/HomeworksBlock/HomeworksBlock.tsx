import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, onMount } from 'solid-js'

import { EmptyData } from '../../components/EmptyData/EmptyData'
import { HomeworkCard } from '../../components/HomeworkCard/HomeworkCard'
import { HomeworkCardSkeleton } from '../../components/HomeworkCard/Skeleton/HomeworkCard.Skeleton'
import { useDashboardStateContext } from '../../context/dashboard'

export const HomeworksBlock: Component = () => {
    const {
        homeworks: {
            studentHomeworks,
            actions: { refetchStudentHomeworks },
        },
    } = useDashboardStateContext()

    onMount(() => {
        if (studentHomeworks() && !studentHomeworks.loading) {
            refetchStudentHomeworks()
        }
    })

    return (
        <>
            <TitleBlock title="Домашние задания" />
            <Show when={!studentHomeworks() && studentHomeworks.loading}>
                <HomeworkCardSkeleton />
                <HomeworkCardSkeleton />
                <HomeworkCardSkeleton />
            </Show>
            <Show when={studentHomeworks() && studentHomeworks()?.length === 0}>
                <EmptyData text="Ура! Все домашки выполнены" />
            </Show>
            <Show when={studentHomeworks() && studentHomeworks()?.length !== 0}>
                <For each={studentHomeworks()}>{(homework) => <HomeworkCard homework={homework} />}</For>
            </Show>
        </>
    )
}
