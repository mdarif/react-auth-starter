import { v4 as uuid } from 'uuid'
import { sendEmail } from '../util/sendEmail'
import { getDbConnection } from '../db'

export const forgotPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'put',
  handler: async (req, res) => {
    // Get the email from the request params
    const { email } = req.params

    // Get a connection to the database
    const db = getDbConnection('react-auth-db')

    // Generate password reset code
    const passwordResetCode = uuid() // random string

    // Update the user's password reset code
    const { result } = await db
      .collection('users')
      .updateOne({ email }, { $set: { passwordResetCode } })

    //
    if (result.nModified > 0) {
      try {
        await sendEmail({
          to: email,
          from: 'arif.mohammed@gmail.com',
          subject: 'Password reset',
          text: `
            To reset your password, please click the following link:
            http://localhost:4000/reset-password/${passwordResetCode}
          `
        })
      } catch (e) {
        console.log(e)
        res.sendStatus(500)
      }
    }

    res.sendStatus(200)
  }
}
