import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'

import { awsUserPool } from '../util/awsUserPool'

export const loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async result => {
          // If the password is correct, get the user info from the database and send it back to them in the form of JWT

          // Get a connection to the database
          const db = getDbConnection('react-auth-db')

          // Check if user exists
          const user = await db.collection('users').findOne({ email })

          // Get the details from the user received from the database
          const { _id: id, isVerified, info } = user

          // Generate a JWT
          jwt.sign(
            {
              id,
              email,
              info,
              isVerified
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '2d'
            },
            (err, token) => {
              if (err) {
                return res.sendStatus(500)
              }
              res.status(200).json({ token })
            }
          )
        },
        onFailure: err => {
          console.log('err', err)
          res.sendStatus(401)
        }
      }
    )
  }
}
