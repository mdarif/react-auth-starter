import { CognitoUser } from 'amazon-cognito-identity-js'
import { awsUserPool } from '../util/awsUserPool'

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
    // Get the password reset code from the request params
    const { passwordResetCode } = req.params
    const { email, newPassword } = req.body

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmPassword(
      passwordResetCode,
      newPassword,
      {
        onSuccess: () => {
          res.sendStatus(200)
        },
        onFailure: err => {
          res.sendStatus(401) // TODO: send a better error message
        }
      }
    )
  }
}
