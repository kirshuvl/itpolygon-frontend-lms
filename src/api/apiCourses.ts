import type { CourseInterface, LessonInterface, UserStepEnrollInterface } from '../types/courses'
import type { CourseDashboardInterface } from '../types/dashboard'
import { createFormData } from '../utils/createFormData'
import { debugMessage } from '../utils/debugMessage'
import { axiosPrivate } from './api'

export const apiCourses = {
    getCourses: async (): Promise<CourseDashboardInterface[]> => {
        try {
            const response = await axiosPrivate.get('lms/courses/')

            return response.data
        } catch (error) {
            debugMessage(`[getCourses] ${error}`)
            throw error
        }
    },
    getCourse: async ({ courseId }: { courseId: string }): Promise<CourseInterface> => {
        try {
            const response = await axiosPrivate.get(`lms/courses/${courseId}/curriculum/`)

            return response.data
        } catch (error) {
            debugMessage(`[getCourse] ${error}`)
            throw error
        }
    },
    getLesson: async ({ lessonId }: { lessonId: string }): Promise<LessonInterface> => {
        try {
            const response = await axiosPrivate.get(`lms/lessons/${lessonId}/steps/`)

            return response.data
        } catch (error) {
            debugMessage(`[getLesson] ${error}`)
            throw error
        }
    },
    createUserStepEnroll: async ({ stepId }: { stepId: number }): Promise<UserStepEnrollInterface> => {
        try {
            const response = await axiosPrivate.post(
                'lms/steps/enrolls/',
                createFormData({
                    step: stepId,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[getStep] ${error}`)
            throw error
        }
    },
    updateUserStepEnroll: async ({
        enrollId,
        status,
    }: { enrollId: number; status: string }): Promise<UserStepEnrollInterface> => {
        try {
            const response = await axiosPrivate.patch(
                `lms/steps/enrolls/${enrollId}/`,
                createFormData({
                    status: status,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[updateUserStepEnroll] ${error}`)
            throw error
        }
    },
}
