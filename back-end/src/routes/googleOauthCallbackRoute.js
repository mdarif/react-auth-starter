import jwt from 'jsonwebtoken'
import { getGoogleUser } from '../util/getGoogleUser'
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth'

export const googleOauthCallbackRoute = {
  path: '/auth/google/callback',
  method: 'get',
  handler: async (req, res) => {
    const { code } = req.query

    const oauthUserInfo = await getGoogleUser({ code })
    const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo })
    const { _id: id, isVerified, email, info } = updatedUser

    // Create a token
    jwt.sign(
      { id, isVerified, email, info },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) return res.sendStatus(500)

        res.redirect(`http://localhost:4000/login?token=${token}`)
      }
    )
  }
}
