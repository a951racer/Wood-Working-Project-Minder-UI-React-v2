import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'

import useJobs from '../../providers/jobs/hook'

import PageLayout from '../../Components/app/PageLayout'
import JobList from '../../Components/Jobs/JobList'
import NewJobDialog from '../../Components/app/dialogs/NewJobDialog'

const JobPage = () => {
  const [editingJob, setEditingJob] = useState()
  const { jobs, fetchJobs, resetCurrentJob } = useJobs()

    useEffect(() => {
      fetchJobs()
      resetCurrentJob()
      return () => {
      }
    }, [])
  
    useEffect(() => {
    }, [jobs])

  return (
    <PageLayout title="Jobs">
      <NewJobDialog />
      <JobList jobs={jobs}/>
    </PageLayout>
  )
}

export default JobPage
