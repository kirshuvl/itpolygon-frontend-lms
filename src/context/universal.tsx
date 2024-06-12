import { useParams } from '@solidjs/router'
import { produce } from 'immer'
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
import { apiHomeworks } from '../api/apiHomeworks'
import { apiSeminars } from '../api/apiSeminars'
import { apiSteps } from '../api/apiSteps'
import type { HomeworkInterface } from '../types/homeworks'
import type { LessonInterface } from '../types/lessons'
import type { SeminarInterface } from '../types/seminars'
import type { ProblemStepBodyInterface, QuestionStepBodyInterface, StepInterface } from '../types/steps'
import { debugMessage } from '../utils/debugMessage'

type ResourseContextType<T> = {
    resource: Resource<T | null>
    url: string
    currentStep: Accessor<StepInterface | undefined>
    setCurrentStep: Setter<StepInterface | undefined>
    actions: {
        mutateResource: Setter<T | undefined>
        refetchResource: () => T | Promise<T | undefined> | null | undefined
        createUserStepEnroll: ({ stepId }: { stepId: number }) => void
        updateUserStepEnroll: ({ status }: { status: string }) => void
        createUserAnswerForQuestionStep: ({ answer }: { answer: string }) => void
        createUserAnswerForProblemStep: ({ code }: { code: string }) => void
    }
}

const ResourseStateContext =
    createContext<ResourseContextType<LessonInterface | HomeworkInterface | SeminarInterface>>()

type ResourseProviderType = {
    pageType: 'lesson' | 'homework' | 'seminar'
}

export const ResourseProvider: ParentComponent<ResourseProviderType> = (props) => {
    const params = useParams<{ resourceId: string; stepId?: string }>()

    const fetchResource = ({
        resourseId,
    }: { resourseId: string }): Promise<LessonInterface | HomeworkInterface | SeminarInterface> => {
        if (props.pageType === 'lesson') {
            return apiCourses.getLesson({ lessonId: resourseId })
        }
        if (props.pageType === 'seminar') {
            return apiSeminars.getSeminar({ seminarId: resourseId })
        }
        return apiHomeworks.getHomework({ homeworkId: resourseId })
    }

    const [resource, { mutate: mutateResource, refetch: refetchResource }] = createResource<
        LessonInterface | HomeworkInterface | SeminarInterface,
        { resourseId: string }
    >({ resourseId: params.resourceId }, fetchResource)

    const [currentStep, setCurrentStep] = createSignal<StepInterface>()

    createEffect(() => {
        let step = null
        if (params.stepId === undefined) {
            step = resource()?.steps.find(
                (step) => step.userEnroll === null || step.userEnroll.status !== 'OK',
            )

            if (step === undefined) {
                step = resource()?.steps[0]
            }
        } else {
            step = resource()?.steps.find((step) => step.id.toString() === params.stepId)
        }
        setCurrentStep(step)
    })

    const createUserStepEnroll = async ({ stepId }: { stepId: number }) => {
        const enroll = await apiCourses.createUserStepEnroll({ stepId: stepId })
        const newResourse = produce(resource(), (draftState) => {
            const step = draftState?.steps.find((step) => step.id === stepId)

            if (step) {
                step.userEnroll = enroll
            }
        })
        mutateResource(newResourse)
    }

    const updateUserStepEnroll = async ({ status }: { status: string }) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const enrollId = currentStep()?.userEnroll?.id!

        const stepId = currentStep()?.id
        const enroll = await apiCourses.updateUserStepEnroll({ enrollId: enrollId, status: status })

        const newResourse = produce(resource(), (draftState) => {
            const step = draftState?.steps.find((step) => step.id === stepId)

            if (step) {
                step.userEnroll = enroll
            }
        })
        mutateResource(newResourse)
    }

    const createUserAnswerForQuestionStep = async ({ answer }: { answer: string }) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const stepId = currentStep()?.id!
        const serverAnswer = await apiSteps.createUserAnswerForQuestionStep({
            questionId: stepId,
            answer: answer,
        })
        const userAnswerForQuesitonStep = serverAnswer.answer
        const userEnroll = serverAnswer.userEnroll

        const newResourse = produce(resource(), (draftState) => {
            const step = draftState?.steps.find((step) => step.id === stepId)

            if (step) {
                const stepBody = step?.body as QuestionStepBodyInterface
                if (stepBody.userAnswers) {
                    stepBody.userAnswers.push(userAnswerForQuesitonStep)
                } else {
                    stepBody.userAnswers = [userAnswerForQuesitonStep]
                }

                step.userEnroll = userEnroll
                step.body = stepBody
            }
        })
        mutateResource(newResourse)
    }

    const createUserAnswerForProblemStep = async ({ code }: { code: string }) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const stepId = currentStep()?.id!
        const serverAnswer = await apiSteps.createUserAnswerForProblemStep({
            problemId: stepId,
            code: code,
        })
        const userAnswerForProblemStep = serverAnswer.answer
        const userEnroll = serverAnswer.userEnroll

        const newResourse = produce(resource(), (draftState) => {
            const step = draftState?.steps.find((step) => step.id === stepId)

            if (step) {
                const stepBody = step?.body as ProblemStepBodyInterface
                if (stepBody.userProblems) {
                    stepBody.userProblems.push(userAnswerForProblemStep)
                } else {
                    stepBody.userProblems = [userAnswerForProblemStep]
                }

                step.userEnroll = userEnroll
                step.body = stepBody
            }
        })
        mutateResource(newResourse)
    }

    const findRefetch = async () => {
        console.log('SSSSSSS')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const steps = resource()?.steps.find(
            (step) => step.stepType === 'problemstep' && step.userEnroll?.status === 'WT',
        )
        if (steps) {
            console.log('!!!')
            await refetchResource()
        }
    }

    createEffect(() => {
        if (resource()) {
            findRefetch()
        }
    })

    const url = props.pageType
    const value = {
        resource,
        url,
        currentStep,
        setCurrentStep,
        actions: {
            mutateResource,
            refetchResource,
            createUserStepEnroll,
            updateUserStepEnroll,
            createUserAnswerForQuestionStep,
            createUserAnswerForProblemStep,
        },
    }

    onMount(() => {
        debugMessage('[onMount][Provider] LessonProvider')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] LessonProvider')
    })
    return <ResourseStateContext.Provider value={value}>{props.children}</ResourseStateContext.Provider>
}

export function useResourseStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(ResourseStateContext)!
}
