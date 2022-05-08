import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useToken } from '../auth/useToken'
import axios from 'axios'

export const SignUpPage = () => {
  const [token, setToken] = useToken()

  const [errorMessage, setErrorMessage] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  const history = useHistory()

  const onSignUpClicked = async () => {
    // Send the data to the server with required values
    const response = await axios.post('/api/signup', {
      email: emailValue,
      password: passwordValue
    })

    const { token } = response.data
    // Set the token in local storage
    setToken(token)

    // Redirect to the home page
    history.push('/please-verify')
  }

  return (
    <div className='content-container'>
      <h1>Sign Up</h1>
      {errorMessage && <div className='fail'>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        type='text'
        placeholder='someone@gmail.com'
      />
      <input
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        type='password'
        placeholder='password'
      />
      <input
        value={confirmPasswordValue}
        onChange={e => setConfirmPasswordValue(e.target.value)}
        type='password'
        placeholder='password'
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => history.push('/login')}>
        Already have an account? Log In
      </button>
    </div>
  )
}
