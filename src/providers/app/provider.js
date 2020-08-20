import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppContext from './context'
import useFetch from '../fetch/hook'

const AppProvider = ({children}) => {
  const [projects, setProjects] = useState()
  const [profile, setProfile] = useState()
  const { fetchViaApi } = useFetch()

/**** PROJECTS ************************/

  async function fetchProjects() {
    //setBusy('projects', true)
    let result = await fetchViaApi('GET', '/project')
    setProjects(result)
    //setBusy('projects', false)
  }

  async function saveProject(updatedProject) {
    //write to API
    //update state projects
    console.log('saved: ', updatedProject)
  }

  async function createProject(newProject) {
    //setBusy('projects', true)
    //call to API
    //update state list of projects
    projects.push(newProject)
    console.log('projects: ', projects)
    //setBusy('projects', false)
    console.log('created: ', newProject)
  }
  
  /**** PROFILE **********************/

  function getProfile() {
    return profile
  }

  function updateProfile(updatedProfile) {
    setProfile(updateProfile)
    //save to API
  }

  /**********************************/

  return (
    <AppContext.Provider value={{
      projects,
      fetchProjects,
      saveProject,
      createProject,
      profile,
      updateProfile
    }}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AppProvider
