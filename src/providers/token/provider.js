import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TokenContext from './context'

const TokenProvider = ({children}) => {
  
  let token = null
  if (localStorage.getItem('WWPM_AUTH_TOKEN') && localStorage.getItem('WWPM_AUTH_TOKEN') !== 'undefined') {
    token = JSON.parse(localStorage.getItem('WWPM_AUTH_TOKEN'))
  }

  function getToken() {
    return token
  }

  function isLoggedIn() {
    return !!token
  }

  function setToken(userToken) {
    localStorage.setItem('WWPM_AUTH_TOKEN', JSON.stringify(userToken))
  }

  function deleteToken() {
    localStorage.setItem('WWPM_AUTH_TOKEN', null)
  }

  return (
    <TokenContext.Provider value={{
      getToken,
      isLoggedIn,
      setToken,
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
