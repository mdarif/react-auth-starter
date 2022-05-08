import { testRoute } from './testRoute'
// import { testEmailRoute } from './testEmailRoute'
import { signUpRoute } from './signUpRoute'
import { loginRoute } from './loginRoute'
import { updateUserInfoRoute } from './updateUserInfoRoute'
import { verifyEmailRoute } from './verifyEmailRoute'
import { forgotPasswordRoute } from './forgotPasswordRoute'

export const routes = [
  updateUserInfoRoute,
  // testEmailRoute,
  loginRoute,
  signUpRoute,
  testRoute,
  verifyEmailRoute,
  forgotPasswordRoute
]
