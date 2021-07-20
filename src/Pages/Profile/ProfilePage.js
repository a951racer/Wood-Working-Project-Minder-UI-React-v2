import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'

import PageLayout from '../../Components/app/PageLayout'
import ProfilePanel from '../../Components/Profile/ProfilePanel'

import useProfile from '../../providers/profile/hook'

const ProfilePage = () => {
  const { fetchProfile, currentProfile  } = useProfile()

  useEffect(() => {
    fetchProfile()
    return () => {
    }
  }, [])

  return (
      <PageLayout title={currentProfile ? 'User Profile' : 'Loading...'}>
        {currentProfile &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <ProfilePanel profile={currentProfile}/>
            <br />
          </div>
        }
      </PageLayout>
  )
}

export default ProfilePage
