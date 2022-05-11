import { getDbConnection } from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../util/sendEmail'

export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    // TODO: Implement sign up logic
    const { email, password } = req.body

    // Get a connection to the database
    const db = getDbConnection('react-auth-db') // name of the db is 'react-auth-db'

    // Check if user already exists in 'users' collection
    const user = await db.collection('users').findOne({ email })

    // if user exists, return error to the client
    if (user) res.sendStatus(409) // 409: conflict

    // Salt and Pepper the password
    const salt = uuid()
    const pepper = process.env.PEPPER_STRING

    // Encrypt password
    const passwordHash = await bcrypt.hash(salt + password + pepper, 10) // 10 is the number of rounds

    const verificationString = uuid()

    // Create a new user
    const startingInfo = {
      hairColor: '',
      favoriteFood: '',
      bio: ''
    }

    const result = await db.collection('users').insertOne({
      email,
      passwordHash,
      salt,
      verificationString,
      info: startingInfo,
      isVerified: false
    })

    // Get the id of the new user
    const { insertedId } = result

    // Send the verification email
    try {
      await sendEmail({
        to: email,
        from: 'arif.mohammed@gmail.com',
        subject: 'Please verify your email',
        text: `
          Thanks for signing up! To verify your email, please click the following link:
          http://localhost:4000/verify-email/${verificationString}
        `
      })
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }

    // Generate a token
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d'
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err)
        }
        res.status(200).json({ token })
      }
    )
  }
}
