import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
    // Check and see the authorization header is included
    const { verificationString } = req.body
    // DB connection
    const db = getDbConnection('react-auth-db')
    // Find the user with the verification string
    const result = await db.collection('users').findOne({
      verificationString
    })

    // If there is no user with the verification string, return error to the client
    if (!result)
      return res
        .status(401)
        .json({ message: 'Email verification code is incorrect' })

    const { _id: id, email, info } = result

    await db.collection('users').updateOne(
      { _id: ObjectID(id) },
      {
        $set: { isVerified: true }
      }
    )

    // Send the user info to the client
    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) return res.sendStatus(500)
        res.status(200).json({ token })
      }
    )
  }
}
