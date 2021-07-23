import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'

import useProfile from '../../providers/profile/hook'
import './Profile.css'

const ProfilePanel = ({profile}) => {
  const [currentProfile, setProfile] = useState(profile)
  const [profileSnapshot, setProfileSnapshot] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const { saveProfile } = useProfile()

  const startEditing = () => {
    setProfileSnapshot(currentProfile)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setProfile(profileSnapshot)
    setProfileSnapshot(null)
  }

  const updateProperty = (property, value) => {
    const updatedProfile = {...currentProfile, [property]: value}
    setProfile(updatedProfile)
  }

  const save = async () => {
    setIsEditing(false)
    await saveProfile(currentProfile)
    //this.growl.show({severity: 'success', summary: 'Saved', detail: 'ProjectDetails has been updated'})
  }

  const footer = 
    <div style={{marginBottom: '.5em', width: '100px', margin: 'auto'}} ></div>

  return (
    <>
        {!isEditing ? 
          <>
            <Card footer={footer}>
              <div className='edit-buttons'>
                <i className='pi pi-w pi-pencil' onClick={() => startEditing()} />
              </div>
              <div className="project-details-container">
                <div className="project-data">
                  <div className="data-item">
                    <span className='label'>First Name:</span>
                    <span> {currentProfile.firstName}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Last Name:</span>
                    <span> {currentProfile.lastName}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>DBA:</span>
                    <span> {currentProfile.dba}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Units:</span> 
                    <span> {currentProfile.units}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Rough Length:</span>
                    <span> {currentProfile.roughLength}</span>
                  </div>
                  <div className="data-item">
                    <span className='label'>Rough Width:</span>
                    <span> {currentProfile.roughWidth}</span>
                  </div>
                  <div className="data-item">
                    <span className='label'>Rough Thickness:</span>
                    <span> {currentProfile.roughThickness}</span>
                  </div>
                </div>
              </div>
            </Card>
          </>
      :
        <>
          <Card footer={footer}>
          <div className='edit-buttons'>
            <i className='pi pi-w pi-check' onClick={() => save()} />
            &nbsp; &nbsp;
            <i className='pi pi-w pi-times' onClick={() => cancelEditing()} />
          </div>
          <div className="project-details-container">
            <div className="project-data">
              <div className="data-item">
                <span className='label'>First Name:  </span>
                <InputText value={currentProfile.firstName} onChange={(e) => updateProperty('firstName', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Last Name:  </span>
                <InputText value={currentProfile.lastName} onChange={(e) => updateProperty('lastName', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>DBA:</span>
                <InputText value={currentProfile.dba} onChange={(e) => updateProperty('dba', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Units:</span>
                <InputText value={currentProfile.units} onChange={(e) => updateProperty('units', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Rough Length:</span>
                <InputText value={currentProfile.roughLength} onChange={(e) => updateProperty('roughLength', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Rough Width:</span>
                <InputText value={currentProfile.roughWidth} onChange={(e) => updateProperty('roughWidth', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Rough Thickness:</span>
                <InputText value={currentProfile.roughThickness} onChange={(e) => updateProperty('roughThickness', e.target.value)} />
              </div>

            </div>
          </div>
        </Card>
      </>
      }
    </>
  )
}

export default ProfilePanel