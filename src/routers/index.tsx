import { Route, Router } from '@solidjs/router'
import { LessonScreen } from '../screens/Lesson/Lesson.Screen'
import { CourseScreen } from '../screens/course/Course.Screen'
import { DashboardScreen } from '../screens/dashboard/Dashboard.Screen'
import { LoginScreen } from '../screens/loginScreen/Login.Screen'
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
                <Route path="/course/:courseId" component={CourseScreen} />
                <Route path="/lesson/:lessonId" component={LessonScreen} />
            </Route>
        </Router>
    )
}
