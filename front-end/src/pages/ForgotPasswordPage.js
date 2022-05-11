import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [emailValue, setEmailValue] = useState('')

  const history = useHistory()

  const onForgotPasswordClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`)
      setIsSuccess(true)
      setTimeout(() => {
        history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`)
      }, 3000)
    } catch (e) {
      setErrorMessage('Uh oh... something went wrong')
    }
  }

  return isSuccess ? (
    <div className='content-container'>
      <h1>Success!</h1>
      <p>Check your email for a reset link</p>
    </div>
  ) : (
    <div className='content-container'>
      <h1>Forgot Password</h1>
      <p>Enter your email and we'll send you a reset link</p>
      {errorMessage && <div>{errorMessage}</div>}
      <input
        value={emailValue}
        placeholder='someone@gmail.com'
        onChange={e => setEmailValue(e.target.value)}
      />
      <button disabled={!emailValue} onClick={onForgotPasswordClicked}>
        Send Reset Link
      </button>
    </div>
  )
}
