import React, { useState } from 'react'
import PropTypes from 'prop-types'
import JobsContext from './context'
import useFetch from '../fetch/hook'

const JobsProvider = ({children}) => {
  const [jobs, setJobs] = useState([])
  const [currentJob, setCurrentJob] = useState(null)
  const [profile, setProfile] = useState(null)
  const { fetchViaApi } = useFetch()

  async function fetchJobs() {
    let result = await fetchViaApi('GET', '/job')
    setJobs(result)
  }

  async function fetchJobDetails(id) {
    let result = await fetchViaApi('GET', '/job/' + id)
    setCurrentJob(result)
  }

  async function resetCurrentJob() {
    setCurrentJob(null)
  }

  async function saveJob(updatedJob) {
    const result = await fetchViaApi('PUT', `/job/${updatedJob._id}`, updatedJob)
    //update state jobs
  }

  async function createJob(newJob) {
    const result = await fetchViaApi('POST', '/job', newJob)
    //update state list of jobs
    setJobs([...jobs, newJob])
  }

  async function importBoards() {
    const result = await fetchViaApi('POST', `/job/import-boards/${currentJob._id}`)
    setCurrentJob(result)
  }

  return (
    <JobsContext.Provider value={{
      jobs,
      currentJob,
      fetchJobs,
      fetchJobDetails,
      resetCurrentJob,
      saveJob,
      createJob,
      importBoards,
    }}>
      {children}
    </JobsContext.Provider>
  )
}

JobsProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default JobsProvider
