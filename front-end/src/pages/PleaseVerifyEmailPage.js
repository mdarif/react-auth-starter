import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const PleaseVerifyEmailPage = () => {
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      history.push('/')
    }, 5000)
  }, [history])

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
