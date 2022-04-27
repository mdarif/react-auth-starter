import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = props => {
  const user = null

  console.log('user', user)

  if (!user) return <Redirect to='/login' />

  return <Route {...props} />
}
