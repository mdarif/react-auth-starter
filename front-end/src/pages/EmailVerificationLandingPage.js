import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useToken } from '../auth/useToken'
import { EmailVerificationSuccess } from './EmailVerificationSuccess'
import { EmailVerificationFail } from './EmailVerificationFail'

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const { verificationString } = useParams()
  const [, setToken] = useToken()

  useEffect(() => {
    const loadVerification = async () => {
      try {
        // Send the data to the server with required values to update the user's info
        const response = await axios.put('/api/verify-email', {
          verificationString
        })

        // Get the token from the response
        const { token } = response.data
        // Set the token in local storage
        setToken(token)
        // Set the isSuccess state to true
        setIsSuccess(true)
        // Set the isLoading state to false
        setIsLoading(false)
      } catch (e) {
        console.log(e)
        setIsSuccess(false)
        setIsLoading(false)
      }
    }
    loadVerification()
  }, [setToken, verificationString])

  // Show the loading message
  if (isLoading) return <p>Loading...</p>

  // If email verification failed, show the fail page
  if (!isSuccess) return <EmailVerificationFail />

  //
  return <EmailVerificationSuccess />
}
