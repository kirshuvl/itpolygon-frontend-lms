import { useParams } from '@solidjs/router'
import {
    type Accessor,
    type ParentComponent,
    type Resource,
    type Setter,
    createContext,
    createEffect,
    createResource,
    createSignal,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'
import { apiCourses } from '../api/apiCourses'
import type { LessonInterface, StepInterface } from '../types/courses'
import { debugMessage } from '../utils/debugMessage'

type LessonContextType = {
    lesson: Resource<LessonInterface | null>
    currentStep: Accessor<StepInterface | undefined>
    setCurrentStep: Setter<StepInterface | undefined>
    actions: {
        mutateLesson: Setter<LessonInterface | undefined>
        refetchLesson: () => LessonInterface | Promise<LessonInterface | undefined> | null | undefined
    }
}

const LessonStateContext = createContext<LessonContextType>()

export const LessonProvider: ParentComponent = (props) => {
    const params = useParams<{ lessonId: string; stepId: string }>()

    const [lesson, { mutate: mutateLesson, refetch: refetchLesson }] = createResource<
        LessonInterface,
        { lessonId: string }
    >({ lessonId: params.lessonId }, apiCourses.getLesson)

    const [currentStep, setCurrentStep] = createSignal<StepInterface>()

    createEffect(() => {
        let step = null
        if (params.stepId === undefined) {
            step = lesson()?.steps.find(
                (step) => step.userEnroll === null || step.userEnroll.status !== 'OK',
            )

            if (step === undefined) {
                step = lesson()?.steps[0]
            }
        } else {
            step = lesson()?.steps.find((step) => step.id.toString() === params.stepId)
        }
        setCurrentStep(step)
    })

    const value = {
        lesson,
        currentStep,
        setCurrentStep,
        actions: {
            mutateLesson,
            refetchLesson,
        },
    }

    onMount(() => {
        debugMessage('[onMount][Provider] LessonProvider')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] LessonProvider')
    })

    return <LessonStateContext.Provider value={value}>{props.children}</LessonStateContext.Provider>
}

export function useLessonStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(LessonStateContext)!
}
