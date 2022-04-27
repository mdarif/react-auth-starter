import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './auth/PrivateRoute'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { UserInfoPage } from './pages/UserInfoPage'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact>
          <UserInfoPage />
        </PrivateRoute>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  )
}
