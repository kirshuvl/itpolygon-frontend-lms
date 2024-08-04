import type {
    UserAnserForSingleChoiceSuestionStepInterface,
    UserAnswerForProblemStepInterface,
    UserAnswerForQuestionStepInterface,
    UserStepEnrollInterface,
} from '../types/steps'
import { createFormData } from '../utils/createFormData'
import { debugMessage } from '../utils/debugMessage'
import { axiosPrivate } from './api'

export const apiSteps = {
    createUserAnswerForQuestionStep: async ({
        questionId,
        answer,
    }: { questionId: number; answer: string }): Promise<{
        answer: UserAnswerForQuestionStepInterface
        userEnroll: UserStepEnrollInterface
    }> => {
        try {
            const response = await axiosPrivate.post(
                '/lms/steps/answers/',
                createFormData({ question: questionId, answer: answer }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createUserAnswerForQuestionStep] ${error}`)
            throw error
        }
    },
    createUserAnswerForProblemStep: async ({
        problemId,
        code,
    }: { problemId: number; code: string }): Promise<{
        answer: UserAnswerForProblemStepInterface
        userEnroll: UserStepEnrollInterface
    }> => {
        try {
            const response = await axiosPrivate.post(
                '/lms/steps/codes/',
                createFormData({ problem: problemId, code: code }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createUserAnswerForQuestionStep] ${error}`)
            throw error
        }
    },
    createUserAnswerForSingleChoiceQuestionStep: async ({
        questionId,
        answerId,
    }: { questionId: number; answerId: number }): Promise<{
        answer: UserAnserForSingleChoiceSuestionStepInterface
        userEnroll: UserStepEnrollInterface
    }> => {
        try {
            const response = await axiosPrivate.post(
                '/lms/steps/answers/single/',
                createFormData({ question: questionId, answer: answerId }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createUserAnswerForSingleChoiceQuestionStep] ${error}`)
            throw error
        }
    },
    createUserStepView: async ({ stepId }: { stepId: number }): Promise<{ viewed_by: number }> => {
        try {
            const response = await axiosPrivate.post(
                '/lms/steps/views/',
                createFormData({ step: stepId, source: 'LMS' }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createUserStepView] ${error}`)
            throw error
        }
    },
    createUserStepLike: async ({
        stepId,
    }: { stepId: number }): Promise<{ userLike: { id: number }; liked_by: number }> => {
        try {
            const response = await axiosPrivate.post(
                '/lms/steps/likes/',
                createFormData({ step: stepId, source: 'LMS' }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createUserStepLike] ${error}`)
            throw error
        }
    },
    deleteUserStepLike: async ({
        userStepLikeId,
    }: { userStepLikeId: number }): Promise<{ liked_by: number }> => {
        try {
            const response = await axiosPrivate.delete(`/lms/steps/likes/${userStepLikeId}/`)

            return response.data
        } catch (error) {
            debugMessage(`[deleteUserStepLike] ${error}`)
            throw error
        }
    },
}
