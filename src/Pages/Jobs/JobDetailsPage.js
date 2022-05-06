import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'
import { TabView, TabPanel } from 'primereact/tabview';

import PageLayout from '../../Components/app/PageLayout'
import JobDetails from '../../Components/Jobs/JobDetailsPanel'
import Boards from '../../Components/Boards/Boards'
import Reports from '../../Components/Reports/Reports'
import TimeTable from '../../Components/Time/TimeTable'
import MaterialTable from '../../Components/Material/MaterialTable'
import FilesTable from '../../Components/Files/FilesTable'
import NoteTable from '../../Components/Notes/NotesTable';

import useJobs from '../../providers/jobs/hook'

const JobDetailsPage = (props) => {
  const [id, setId] = useState(props.match.params.id)
  const { fetchJobDetails, currentJob, saveJob } = useJobs()

  useEffect(() => {
    fetchJobDetails(id)
  }, [])

  const updateTime = async (timeSlips) => {
    currentJob.time = timeSlips
    await saveJob(currentJob)
  }

  const updateMaterial = async (material) => {
    currentJob.material = material
    await saveJob(currentJob)
  }

  const updateFiles = async (files) => {
    currentJob.files = files
    await saveJob(currentJob)
  }

  const updateNotes = async (notes) => {
    currentJob.notes = notes
    await saveJob(currentJob)
  }

  return (
      <PageLayout title={currentJob ? currentJob.name : 'Loading...'}>
        {currentJob &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <JobDetails job={currentJob} />
            <br />
            <TabView>
              <TabPanel header="Boards">
                <Boards boards={currentJob.boards} uploadButton={false} />
              </TabPanel>
              <TabPanel header="Time">
                <TimeTable timeSlips={currentJob.timeSlips} updateTime={updateTime} />
              </TabPanel>
              <TabPanel header="Materials">
                  <MaterialTable material={currentJob.materials} updateMaterial={updateMaterial}/>
              </TabPanel>
              <TabPanel header="Library">
                  <FilesTable files={currentJob.library} updateFiles={(fileList)=>updateFiles(fileList)} mediaType='job-media' id={id}/>
              </TabPanel>
              <TabPanel header="Reports">
                  <Reports reports={currentJob.reports} />
              </TabPanel>
              <TabPanel header="Notes">
                  <NoteTable notes={currentJob.notes} updateNotes={(notes)=>updateNotes(notes)} />
              </TabPanel>
            </TabView>
          </div>
        }
      </PageLayout>
  )
}

export default JobDetailsPage
