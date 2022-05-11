import { getDbConnection } from '../db'
import jwt from 'jsonwebtoken'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { awsUserPool } from '../util/awsUserPool'

export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body

    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email })
    ]

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        // If there was an error, return it
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Unable to sign-up user' })
        }

        // If error didn't occur, then connect to the db
        const db = await getDbConnection('react-auth-db')

        const startingInfo = {
          hairColor: '',
          favoriteFood: '',
          bio: ''
        }

        // Insert  new user in the db
        const result = await db.collection('users').insertOne({
          email,
          info: startingInfo
        })

        /**
         * Amazon Cognito will be taking care of the rest like email is verified or storing the password hash etc.
         */

        // Now get the inserted id and then send all the data back to user in a JWT

        const { insertedId } = result
        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2d'
          },
          (err, token) => {
            // sendStatus() sets the status and sends it to the client
            if (err) return res.sendStatus(500)
            // status() sets a HTTP status on the response (as a Javascript object on the server side)
            res.status(200).json({ token })
          }
        )
      }
    )
  }
}
