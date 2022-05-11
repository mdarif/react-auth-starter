import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToken } from '../auth/useToken'
import { useQueryParams } from '../util/useQueryParams'

export const LoginPage = () => {
  const [, setToken] = useToken()

  const [errorMessage, setErrorMessage] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [googleOauthUrl, setGoogleOauthUrl] = useState('')
  const { token: oauthToken } = useQueryParams()

  const history = useHistory()

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken)
      history.push('/')
    }
  }, [oauthToken, setToken, history])

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get('/auth/google/url')
        const { url } = response.data
        setGoogleOauthUrl(url)
      } catch (e) {
        console.log(e)
      }
    }

    loadOauthUrl()
  }, [])

  const onLoginClicked = async () => {
    try {
      // Send the data to the server with required values
      const response = await axios.post('/api/login', {
        email: emailValue,
        password: passwordValue
      })

      // Save the data from the server in the token
      const { token } = response.data

      // Set the token in local storage
      setToken(token)

      // Redirect to the home page
      history.push('/')
    } catch (e) {
      // If the login is incorrect, set the error message
      setErrorMessage(e.message)
    }
  }

  return (
    <div className='content-container'>
      <h1>Log In</h1>
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
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onLoginClicked}>
        Log In
      </button>
      <button onClick={() => history.push('/forgot-password')}>
        Forgot your password?
      </button>
      <button onClick={() => history.push('/signup')}>
        Don't have an account? Sign Up
      </button>
      <button
        disabled={!googleOauthUrl}
        onClick={() => (window.location.href = googleOauthUrl)}
      >
        Sign-in with Google
      </button>
    </div>
  )
}
