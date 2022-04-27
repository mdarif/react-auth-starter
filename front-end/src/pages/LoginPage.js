import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const history = useHistory()

  const onLoginClicked = async () => {
    console.log('Log In not implemented yet')
  }

  return (
    <div className='content-container'>
      <h1>Log In</h1>
      {errorMessage && <div className='fail'>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={e => setEmailValue(e.tagrte.value)}
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
    </div>
  )
}
