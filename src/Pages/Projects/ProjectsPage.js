import React, { useState, useEffect } from 'react'
import { ScrollPanel } from 'primereact/scrollpanel'
//import { Growl } from 'primereact/growl'

import useProjects from '../../providers/projects/hook'

import PageLayout from '../../Components/app/PageLayout'
import ProjectList from '../../Components/Projects/ProjectList'
import NewProjectDialog from '../../Components/app/dialogs/NewProjectDialog'

const ProjectPage = () => {
  const [editingProject, setEditingProject] = useState()
  const { projects, fetchProjects, resetCurrentProject } = useProjects()

    useEffect(() => {
      fetchProjects()
      resetCurrentProject()
      return () => {
      }
    }, [])
  
    useEffect(() => {
    }, [projects])

  return (
    <PageLayout title="Projects">
      <ScrollPanel style={{width: '88vw', height: '92vh'}} >
        <NewProjectDialog />
        <ProjectList projects={projects}/>
      </ScrollPanel>
    </PageLayout>
  )
}

export default ProjectPage
