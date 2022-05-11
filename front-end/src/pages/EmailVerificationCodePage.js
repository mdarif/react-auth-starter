import axios from 'axios'
import { useState } from 'react'
import { EmailVerificationSuccess } from './EmailVerificationSuccess'
import { EmailVerificationFail } from './EmailVerificationFail'
import { useToken } from '../auth/useToken'
import { useQueryParams } from '../util/useQueryParams'

export const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  const [verificationString, setVerificationString] = useState('')
  const { email } = useQueryParams()
  const [, setToken] = useToken()

  const onSubmitVerificationString = () => {
    try {
      const response = axios.put('/api/verify-email', {
        email,
        verificationString
      })
      //TODO: Token is not being set, would fix it later
      const { token } = response.data
      setToken(token)
      setIsSuccess(true)
    } catch (e) {
      console.log(e)
      setIsFailure(true)
    }
  }

  if (isSuccess) return <EmailVerificationSuccess />
  if (isFailure) return <EmailVerificationFail />

  return (
    <div className='content-container'>
      <h1>Please Verify your Email</h1>
      <p>
        You should have received a verification code at the provided email
        address, please enter here
      </p>
      <input
        placeholder='123456'
        value={verificationString}
        onChange={e => setVerificationString(e.target.value)}
      />
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>
  )
}
