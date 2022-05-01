import { useState } from 'react'

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    // Get the token from local storage if it exists
    return localStorage.getItem('token')
  })

  // Set the token in local storage
  const setToken = newToken => {
    localStorage.setItem('token', newToken)
    setTokenInternal(newToken)
  }

  return [token, setToken]
}
