import { testRoute } from './testRoute'
// import { testEmailRoute } from './testEmailRoute'
import { signUpRoute } from './signUpRoute'
import { loginRoute } from './loginRoute'
import { updateUserInfoRoute } from './updateUserInfoRoute'
import { verifyEmailRoute } from './verifyEmailRoute'
import { forgotPasswordRoute } from './forgotPasswordRoute'
import { resetPasswordRoute } from './resetPasswordRoute'
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute'
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute'

export const routes = [
  updateUserInfoRoute,
  // testEmailRoute,
  loginRoute,
  signUpRoute,
  testRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute
]
