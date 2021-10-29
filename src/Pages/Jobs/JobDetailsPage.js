import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'
import { TabView,TabPanel } from 'primereact/tabview';

import PageLayout from '../../Components/app/PageLayout'
import JobDetails from '../../Components/Jobs/JobDetailsPanel'
import Boards from '../../Components/Boards/Boards'
import Reports from '../../Components/Reports/Reports'

import useJobs from '../../providers/jobs/hook'

const JobDetailsPage = (props) => {
  const [id, setId] = useState(props.match.params.id)
  const { fetchJobDetails, currentJob } = useJobs()

  useEffect(() => {
    fetchJobDetails(id)
  }, [])

  return (
      <PageLayout title={currentJob ? currentJob.name : 'Loading...'}>
        {currentJob &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <JobDetails job={currentJob} />
            <br />
            <TabView>
              <TabPanel header="Boards">
                <Boards boards={currentJob.boards} />
              </TabPanel>
              <TabPanel header="Library">
                  Files Component
              </TabPanel>
              <TabPanel header="Reports">
                  <Reports reports={currentJob.reports} />
              </TabPanel>
              <TabPanel header="Notes">
                  Notes Component
              </TabPanel>
            </TabView>
          </div>
        }
      </PageLayout>
  )
}

export default JobDetailsPage
