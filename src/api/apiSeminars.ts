import type { SeminarInfoInterface, SeminarInterface } from '../types/seminars'
import { debugMessage } from '../utils/debugMessage'
import { axiosPrivate } from './api'

export const apiSeminars = {
    getSeminars: async (): Promise<SeminarInfoInterface[]> => {
        try {
            const response = await axiosPrivate.get('lms/seminars/')

            return response.data
        } catch (error) {
            debugMessage(`[getSeminars] ${error}`)
            throw error
        }
    },
    getSeminar: async ({ seminarId }: { seminarId: string }): Promise<SeminarInterface> => {
        try {
            const response = await axiosPrivate.get(`lms/seminars/${seminarId}/steps/`)

            return response.data
        } catch (error) {
            debugMessage(`[getHomework] ${error}`)
            throw error
        }
    },
}
