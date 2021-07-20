import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProfileContext from './context'
import useFetch from '../fetch/hook'
import useAuth from '../auth/hook'

const ProfileProvider = ({children}) => {
  const { userId, profile } = useAuth()
  const { fetchViaApi } = useFetch()
  const [ currentProfile, setCurrentProfile] = useState(profile)

  const fetchProfile = async () => {
    await setCurrentProfile(profile)
  }

  async function saveProfile(updatedProfile) {
    console.log('in save function')
    const result = await fetchViaApi('PUT', `/user/${updatedProfile._id}`, updatedProfile)
    setCurrentProfile(updatedProfile)
  }

  async function createProfile(newProfile) {
    const result = await fetchViaApi('POST', '/profile', newProfile)
    //update state list of profiles
    setCurrentProfile(newProfile)
  }
  
  return (
    <ProfileContext.Provider value={{
      currentProfile,
      fetchProfile,
      saveProfile,
      createProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

ProfileProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProfileProvider
