import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FilesContext from './context'
import useFetch from '../fetch/hook'

const FilesProvider = ({children}) => {
  const [files, setFiles] = useState([])
  const [currentFile, setCurrentFile] = useState(null)
  const [profile, setProfile] = useState(null)
  const { fetchViaApi } = useFetch()

  async function fetchFiles() {
    let result = await fetchViaApi('GET', '/file')
    setFiles(result)
  }

  async function uploadFile(newFile) {
    const result = await fetchViaApi('POST', '/file', newFile)
    return result.data
    //update state list of projects
    //setProjects([...projects, newProject])
  }
  
  return (
    <FilesContext.Provider value={{
      files,
      currentFile,
      fetchFiles,
      uploadFile,
    }}>
      {children}
    </FilesContext.Provider>
  )
}

FilesProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default FilesProvider
