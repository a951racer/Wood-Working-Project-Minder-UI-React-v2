import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TokenContext from './context'

const TokenProvider = ({children}) => {
  
  const [ token, setToken ] = useState(null)
  const [hasLocalToken, setHasLocalToken] = useState(localStorage.getItem('WWPM_AUTH_TOKEN') && localStorage.getItem('WWPM_AUTH_TOKEN') !== 'null')

  function getToken() {
    return localStorage.getItem('WWPM_AUTH_TOKEN')
  }

  async function setLocalToken(userToken) {
    await localStorage.setItem('WWPM_AUTH_TOKEN', userToken)
    await setToken(userToken)
    await setHasLocalToken(true)
  }

  async function deleteToken() {
    localStorage.setItem('WWPM_AUTH_TOKEN', null)
    await setToken(null)
    await hasLocalToken(false)
  }

  return (
    <TokenContext.Provider value={{
      getToken,
      setLocalToken,
      deleteToken,
      hasLocalToken
    }}>
      {children}
    </TokenContext.Provider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TokenProvider
