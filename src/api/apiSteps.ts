import type {
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
}
