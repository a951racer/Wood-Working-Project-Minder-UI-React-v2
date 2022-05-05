import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'
import { TabView,TabPanel } from 'primereact/tabview';

import PageLayout from '../../Components/app/PageLayout'
import ProjectDetails from '../../Components/Projects/ProjectDetailsPanel'
import Boards from '../../Components/Boards/Boards'
import Reports from '../../Components/Reports/Reports'
import FilesTable from '../../Components/Files/FilesTable';

import useProjects from '../../providers/projects/hook'

const ProjectDetailsPage = (props) => {
  const [id, setId] = useState(props.match.params.id)
  const { fetchProjectDetails, currentProject, saveProject } = useProjects()

  useEffect(() => {
    fetchProjectDetails(id)
  }, [])

  const updateFiles = async (files) => {
    currentProject.files = files
    await saveProject(currentProject)
  }

  return (
      <PageLayout title={currentProject ? currentProject.name : 'Loading...'}>
        {currentProject &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <ProjectDetails project={currentProject} />
            <br />
            <TabView>
              <TabPanel header="Boards">
                <Boards boards={currentProject.boards} uploadButton={true} />
              </TabPanel>
              <TabPanel header="Library">
                <FilesTable files={currentProject.library} updateFiles={(fileList)=>updateFiles(fileList)} mediaType='project-media' id={id}/>
              </TabPanel>
              <TabPanel header="Reports">
                  <Reports reports={currentProject.reports} />
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

export default ProjectDetailsPage
