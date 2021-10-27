import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'
import { TabView,TabPanel } from 'primereact/tabview';

import PageLayout from '../../Components/app/PageLayout'
import ProjectDetails from '../../Components/Projects/ProjectDetailsPanel'
import Boards from '../../Components/Boards/Boards'
import Reports from '../../Components/Reports/Reports'

import useProjects from '../../providers/projects/hook'

const ProjectDetailsPage = (props) => {
  const [id, setId] = useState(props.match.params.id)
  const { fetchProjectDetails, currentProject } = useProjects()

  useEffect(() => {
    fetchProjectDetails(id)
  }, [])

  return (
      <PageLayout title={currentProject ? currentProject.name : 'Loading...'}>
        {currentProject &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <ProjectDetails project={currentProject} />
            <br />
            <TabView>
              <TabPanel header="Boards">
                <Boards boards={currentProject.boards} />
              </TabPanel>
              <TabPanel header="Library">
                  Files Component
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
