import { TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, onMount } from 'solid-js'

import { EmptyData } from '../../components/EmptyData/EmptyData'
import { SeminarCard } from '../../components/SeminarCard/SeminarCard'
import { SeminarCardSkeleton } from '../../components/SeminarCard/Skeleton/SeminarCard.Skeleton'
import { useDashboardStateContext } from '../../context/dashboard'

export const SeminarsBlock: Component = () => {
    const {
        seminars: {
            studentSeminars,
            actions: { refetchStudentSeminars },
        },
    } = useDashboardStateContext()

    onMount(() => {
        if (studentSeminars() && !studentSeminars.loading) {
            refetchStudentSeminars()
        }
    })

    return (
        <>
            <TitleBlock title="Ближайшие занятия" />
            <Show when={!studentSeminars() && studentSeminars.loading}>
                <SeminarCardSkeleton />
                <SeminarCardSkeleton />
                <SeminarCardSkeleton />
            </Show>
            <Show when={studentSeminars() && studentSeminars()?.length === 0}>
                <EmptyData text="У вас нет ни одного семинара" />
            </Show>
            <Show when={studentSeminars() && studentSeminars()?.length !== 0}>
                <For each={studentSeminars()}>{(seminar) => <SeminarCard seminar={seminar} />}</For>
            </Show>
        </>
    )
}
