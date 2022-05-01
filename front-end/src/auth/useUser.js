import { useState, useEffect } from 'react'
import { useToken } from './useToken'

export const useUser = () => {
  const [token] = useToken()

  const getPayloadFromToken = token => {
    // Get the payload from the token
    const encodedPayload = token.split('.')[1]
    /**
     * The atob() function decodes a string of data which has been encoded using Base64 encoding.
     */
    return JSON.parse(atob(encodedPayload))
  }

  // Define a state for the user
  const [user, setUser] = useState(() => {
    // Initialize the user state
    // If token does not exist, return null
    if (!token) return null

    // If token does exist, get the payload from the token
    return getPayloadFromToken(token)
  })

  // Update the user state when the token changes
  useEffect(() => {
    // If token does not exist, set the user state to null otherwise get the payload from the token and set the user state to the payload
    if (!token) {
      return setUser(null)
    } else {
      setUser(getPayloadFromToken(token))
    }
  }, [token])

  return user
}
