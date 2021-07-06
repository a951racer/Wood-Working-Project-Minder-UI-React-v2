import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TokenContext from './context'

const TokenProvider = ({children}) => {
  
  const [ token, setToken ] = useState(null)

  function getToken() {
    return token
  }

  async function setLocalToken(userToken) {
    await localStorage.setItem('WWPM_AUTH_TOKEN', userToken)
    await setToken(userToken)
  }

  async function deleteToken() {
    localStorage.setItem('WWPM_AUTH_TOKEN', null)
    await setToken(null)
  }

  return (
    <TokenContext.Provider value={{
      getToken,
      setLocalToken,
      deleteToken
    }}>
      {children}
    </TokenContext.Provider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TokenProvider
