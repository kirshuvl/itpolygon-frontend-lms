import type { SeminarInfoInterface } from '../types/seminars'
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
}
