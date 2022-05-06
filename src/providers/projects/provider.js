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
    await fetchProjects()
  }

  async function createProject(newProject) {
    const result = await fetchViaApi('POST', '/project', newProject)
    setProjects([...projects, result])
  }

  async function importBoards() {
    const result = await fetchViaApi('POST', `/project/import-boards/${currentProject._id}`)
    setCurrentProject(result)
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
      importBoards,
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

ProjectsProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProjectsProvider
