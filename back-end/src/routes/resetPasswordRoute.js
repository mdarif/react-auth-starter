import bcrypt from 'bcrypt'
import { getDbConnection } from '../db'

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
    // Get the password reset code from the request params
    const { passwordResetCode } = req.params
    const { newPassword } = req.body

    const db = getDbConnection('react-auth-db')

    // Salt and Pepper the password
    const newSalt = uuid()
    const pepper = process.env.PEPPER_STRING

    const newPasswordHash = await bcrypt.hash(salt + newPassword + pepper, 10)

    const result = await db.collection('users').findOneAndUpdate(
      { passwordResetCode },
      {
        $set: { passwordHash: newPasswordHash, salt: newSalt },
        $unset: { passwordResetCode: '' }
      }
    )

    // There is no user with the password reset code
    if (result.lastErrorObject.n === 0) return res.sendStatus(404)

    // Otherwise, return success to the client
    res.sendStatus(200)
  }
}
