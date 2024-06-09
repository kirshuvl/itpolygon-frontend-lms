import type { Course } from '../../types/courses'
import { debugMessage } from '../../utils/debugMessage'
import { axiosPrivate } from '../api'

export const apiCourses = {
    getCourses: async (): Promise<Course[]> => {
        try {
            const response = await axiosPrivate.get('lms/courses/')

            return response.data
        } catch (error) {
            debugMessage(`[getCourses] ${error}`)
            throw error
        }
    },
}
