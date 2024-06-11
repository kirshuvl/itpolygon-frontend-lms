import type { HomeworkDashboardInterface } from '../types/dashboard'
import type { HomeworkInterface } from '../types/homeworks'
import { debugMessage } from '../utils/debugMessage'
import { axiosPrivate } from './api'

export const apiHomeworks = {
    getHomeworks: async (): Promise<HomeworkDashboardInterface[]> => {
        try {
            const response = await axiosPrivate.get('lms/homeworks/')

            return response.data
        } catch (error) {
            debugMessage(`[getHomeworks] ${error}`)
            throw error
        }
    },
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
