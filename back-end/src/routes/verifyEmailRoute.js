import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { awsUserPool } from '../util/awsUserPool'

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
    // Check and see the authorization header is included
    const { email, verificationString } = req.body

    console.log('req.body', req.body)

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async err => {
        if (err)
          return res
            .status(401)
            .json({ message: 'The email verification is incorrect' })

        const db = getDbConnection('react-auth-db')
        const result = await db.collection('users').findOneAndUpdate(
          { email },
          {
            $set: { isVerified: true }
          },
          {
            returnOriginal: false
          }
        )

        console.log('result.value', result.value)
        const { _id: id, info } = result.value

        // Send the user info to the client
        jwt.sign(
          { id, email, isVerified: true, info },
          process.env.JWT_SECRET,
          { expiresIn: '2d' },
          (err, token) => {
            console.log('token in jwt.sign', token)
            if (err) {
              console.log('err', err)
              console.log('res', res)
              return res.sendStatus(500)
            }
            res.status(200).json({ token })
          }
        )
      }
    )
  }
}
