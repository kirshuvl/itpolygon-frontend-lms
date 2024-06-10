import type { HomeworkInterface } from '../types/homeworks'
import { debugMessage } from '../utils/debugMessage'
import { axiosPrivate } from './api'

export const apiHomeworks = {
    getHomework: async ({ homeworkId }: { homeworkId: string }): Promise<HomeworkInterface> => {
        try {
            const response = await axiosPrivate.get(`lms/homeworks/${homeworkId}/steps/`)

            return response.data
        } catch (error) {
            debugMessage(`[getHomework] ${error}`)
            throw error
        }
    },
}
