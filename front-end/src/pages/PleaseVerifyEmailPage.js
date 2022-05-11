import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from '../util/useQueryParams'

export const PleaseVerifyEmailPage = () => {
  const history = useHistory()
  const { email } = useQueryParams()

  useEffect(() => {
    setTimeout(() => {
      history.push(`/verify-email?email=${encodeURIComponent(email)}`)
    }, 5000)
  }, [history, email])

  return (
    <div className='content-container'>
      <h1>Thanks for Signing Up!</h1>
      <p>
        A verification email has been sent to your email address. Please click
        the link in the email to verify your email address.
      </p>
    </div>
  )
}
