import React from 'react'

import ProjectListItem from './ProjectListItem'

const ProjectList = ({projects}) => {

  return (
    <>
      {projects &&
        projects.map(project => <ProjectListItem key={project._id} project={project} />)
      }
    </>
  )
}

export default ProjectList