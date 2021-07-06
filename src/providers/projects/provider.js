import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProjectsContext from './context'
import useFetch from '../fetch/hook'

const ProjectsProvider = ({children}) => {
  const [projects, setProjects] = useState()
  const [currentProject, setCurrentProject] = useState()
  const [profile, setProfile] = useState()
  const { fetchViaApi } = useFetch()

  async function fetchProjects() {
    //setBusy('projects', true)
    let result = await fetchViaApi('GET', '/project')
    setProjects(result)
    //setBusy('projects', false)
  }

  async function fetchProjectDetails(id) {
    //setBusy('projects', true)
    let result = await fetchViaApi('GET', '/project/' + id)
    setCurrentProject(result)
    //setBusy('projects', false)
  }

  async function saveProject(updatedProject) {
    //write to API
    //update state projects
  }

  async function createProject(newProject) {
    //setBusy('projects', true)
    //call to API
    //update state list of projects
    projects.push(newProject)
    //setBusy('projects', false)
  }
  
  return (
    <ProjectsContext.Provider value={{
      projects,
      currentProject,
      fetchProjects,
      fetchProjectDetails,
      saveProject,
      createProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

ProjectsProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProjectsProvider
