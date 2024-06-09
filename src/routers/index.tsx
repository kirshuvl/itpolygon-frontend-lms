import { Route, Router } from '@solidjs/router'
import { LoginScreen } from '../screens/loginScreen/Login.Screen'
import { AuthLayout } from './layouts/authLayout/authLayout'

export const AppRouters = () => {
    return (
        <Router>
            <Route path="/" component={AuthLayout}>
                <Route path="/" component={LoginScreen} />
            </Route>
        </Router>
    )
}
