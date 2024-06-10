import type { Course, CourseCurriculum, Lesson } from '../../types/courses'
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
    getCourse: async ({ courseId }: { courseId: string }): Promise<CourseCurriculum> => {
        try {
            const response = await axiosPrivate.get(`lms/courses/${courseId}/curriculum/`)

            return response.data
        } catch (error) {
            debugMessage(`[getCourse] ${error}`)
            throw error
        }
    },
    getLesson: async ({ lessonId }: { lessonId: string }): Promise<Lesson> => {
        try {
            const response = await axiosPrivate.get(`lms/lessons/${lessonId}/steps/`)

            return response.data
        } catch (error) {
            debugMessage(`[getLesson] ${error}`)
            throw error
        }
    },
}
