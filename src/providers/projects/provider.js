import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProjectsContext from './context'
import useFetch from '../fetch/hook'

const ProjectsProvider = ({children}) => {
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [profile, setProfile] = useState(null)
  const { fetchViaApi } = useFetch()

  async function fetchProjects() {
    let result = await fetchViaApi('GET', '/project')
    setProjects(result)
  }

  async function fetchProjectDetails(id) {
    let result = await fetchViaApi('GET', '/project/' + id)
    setCurrentProject(result)
  }

  async function resetCurrentProject() {
    setCurrentProject(null)
  }

  async function saveProject(updatedProject) {
    const result = await fetchViaApi('PUT', `/project/${updatedProject._id}`, updatedProject)
    //update state projects
  }

  async function createProject(newProject) {
    //call to API
    //update state list of projects
    projects.push(newProject)
  }
  
  return (
    <ProjectsContext.Provider value={{
      projects,
      currentProject,
      fetchProjects,
      fetchProjectDetails,
      resetCurrentProject,
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
