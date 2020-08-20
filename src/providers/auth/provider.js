import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import useFetch from '../../providers/fetch/hook'
import useToken from '../../providers/token/hook'
//import {useBusy} from '@freightview/client-react/providers/busy'

import AuthContext from './context'

const AuthProvider = ({children}) => {
  const [userStatus, setUserStatus] = useState('logedOut')
  const [userId, setUserId] = useState(null)
  const history = useHistory()
  const { setToken, deleteToken } = useToken()
  const { fetchViaApi } = useFetch()

  async function login(email, password) {
    //setBusy('login', true)
    let result = await fetchViaApi('POST', '/auth/login', {email, password})
    setUserStatus('loggedIn')
    setUserId(result.userId)
    await setToken(result.token)
    //setProfile????
    //setBusy('login', false)
    history.push('/')
  }

  async function logout() {
    setUserStatus('loggedOut')
    setUserId(null)
    deleteToken(null)
    history.push('/')
  }

  return (
    <AuthContext.Provider value={{
      userStatus,
      userId,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AuthProvider
