import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PasswordResetSuccess } from './PasswordResetSuccess'
import { PasswordResetFail } from './PasswordResetFail'
import { useQueryParams } from '../util/useQueryParams'

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordResetCode, setPasswordResetCode] = useState('')
  const { email } = useQueryParams()

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        email,
        newPassword: password
      })
      setIsSuccess(true)
    } catch (e) {
      setIsFailure(true)
    }
  }

  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />

  return (
    <div className='content-container'>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        value={passwordResetCode}
        placeholder='Password Reset Code'
        onChange={e => setPasswordResetCode(e.target.value)}
      />
      <input
        type='password'
        value={password}
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type='password'
        value={confirmPassword}
        placeholder='Confirm Password'
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button
        disabled={!password || !confirmPassword || password !== confirmPassword}
        onClick={onResetClicked}
      >
        Reset Password
      </button>
    </div>
  )
}
