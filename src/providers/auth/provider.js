import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import useFetch from '../../providers/fetch/hook'
import useToken from '../../providers/token/hook'
//import {useBusy} from '@freightview/client-react/providers/busy'

import AuthContext from './context'

const AuthProvider = ({children}) => {
  const [userStatus, setUserStatus] = useState('loggedOut')
  const [userId, setUserId] = useState(null)
  const [profile, setProfile] = useState(null)
  const history = useHistory()
  const { setLocalToken, deleteToken } = useToken()
  const { fetchViaApi } = useFetch()

  async function login(email, password) {
    //setBusy('login', true)
    let result = await fetchViaApi('POST', '/auth/login', {email, password})
    await setLocalToken(result.token)
    setProfile(result)
    setUserId(result._id)
    setUserStatus('loggedIn')
    //setProfile????
    //setBusy('login', false)
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
      profile,
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
