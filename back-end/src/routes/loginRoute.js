import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'

export const loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body

    // Get a connection to the database
    const db = getDbConnection('react-auth-db')

    // Check if user exists
    const user = await db.collection('users').findOne({ email })

    // If user doesn't exist, return error to the client
    if (!user) return res.sendStatus(401)

    // Get the details from the user received from the database
    const { _id: id, isVerified, passwordHash, salt, info } = user
    const pepper = process.env.PEPPER_STRING

    // Compare the password from the request body with the password from the database
    const isCorrect = await bcrypt.compare(
      salt + password + pepper,
      passwordHash
    )

    if (isCorrect) {
      // Generate a token
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
            res.sendStatus(500)
          }
          res.status(200).json({ token })
        }
      )
    } else {
      // If password is incorrect, return error to the client
      res.sendStatus(401)
    }
  }
}
