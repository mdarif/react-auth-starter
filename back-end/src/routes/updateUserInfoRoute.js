import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { getDbConnection } from '../db'

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put', // update user info
  handler: async (req, res) => {
    const { authorization } = req.headers
    const { userId } = req.params

    // Check and see the authorization header is included
    if (!authorization) {
      return res.status(401).json({ message: 'No authorization header sent' })
    }

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio
    }))(req.body)

    const token = authorization.split(' ')[1]

    /**
     * jwt.verify(token, secretOrPublicKey, [options, callback])
     */
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      // If there is an error, return error to the client
      if (err)
        return res.status(401).json({ message: 'Unable to verify token' })

      const { id, isVerified } = decoded

      // In case id don't match with the userId from the request param, return error to the client
      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data." })

      if (!isVerified)
        return res.status(403).json({
          message: 'Please verify your email before you update the data.'
        })

      // Get a connection to the database
      const db = getDbConnection('react-auth-db')
      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { _id: ObjectId(userId) },
          { $set: { info: updates } },
          { returnOriginal: false }
        )

      // If the user info is updated, return the updated user info to the client
      const { email, info } = result.value

      /**
       * jwt.sign(payload, secretOrPrivateKey, [options, callback])
       */
      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          // If there was an error, return an error to the client
          if (err) {
            return res.sendStatus(500)
          }

          // Otherwise, return the token to the client
          res.status(200).json({ token })
        }
      )
    })
  }
}
