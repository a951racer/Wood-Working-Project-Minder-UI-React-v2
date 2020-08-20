import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'

import useProjects from '../../providers/projects/hook'

import PageLayout from '../../Components/app/PageLayout'
import ProjectList from '../../Components/Projects/ProjectList'
import NewProjectDialog from '../../Components/app/NewProjectDialog'

const ProjectPage = () => {
  const [editingProject, setEditingProject] = useState()
  const { projects, fetchProjects } = useProjects()
  //busy

    // on create
    useEffect(() => {
      fetchProjects()
      return () => {
        //clear()
      }
    }, [])
  
    useEffect(() => {
    }, [projects])

  return (
    <PageLayout title="Projects">
      <NewProjectDialog />
      <ProjectList projects={projects}/>
    </PageLayout>
  )
}

export default ProjectPage
