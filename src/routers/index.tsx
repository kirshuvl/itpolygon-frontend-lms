import { Route, Router } from '@solidjs/router'
import { CourseScreen } from '../screens/course/Course.Screen'
import { DashboardScreen } from '../screens/dashboard/Dashboard.Screen'
import { HomeworkScreen } from '../screens/homework/Homework.Screen'
import { LessonScreen } from '../screens/lesson/Lesson.Screen'
import { LoginScreen } from '../screens/loginScreen/Login.Screen'
import { SeminarScreen } from '../screens/seminar/Seminar.Screen'
import { AuthLayout } from './layouts/authLayout/authLayout'
import { MainLayout } from './layouts/mainLayout/MainLayout'

export const AppRouters = () => {
    return (
        <Router>
            <Route path="/" component={AuthLayout}>
                <Route path="/" component={LoginScreen} />
            </Route>
            <Route path="/" component={MainLayout}>
                <Route path="/dashboard" component={DashboardScreen} />
                <Route path="/course/:courseId/" component={CourseScreen} />
                <Route
                    path={['/lesson/:resourceId', '/lesson/:resourceId/step/:stepId/']}
                    component={LessonScreen}
                />
                <Route
                    path={['/homework/:resourceId', '/homework/:resourceId/step/:stepId/']}
                    component={HomeworkScreen}
                />
                <Route
                    path={['/seminar/:resourceId', '/seminar/:resourceId/step/:stepId/']}
                    component={SeminarScreen}
                />
            </Route>
        </Router>
    )
}
