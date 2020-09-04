import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace'
import { Card } from 'primereact/card'
import { OverlayPanel } from 'primereact/overlaypanel'

import './Projects.css'

const ProjectDetails = ({project}) => {
  const [projectDetails, setProjectDetails] = useState(project)

  let op = React.createRef()

  const updateProperty = (property, value) => {
    const updatedProjectDetails = {...projectDetails, [property]: value}
    setProjectDetails(updatedProjectDetails)
  }

  const saveProjectDetails = async () => {
    await saveProject(projectDetails)
    //this.growl.show({severity: 'success', summary: 'Saved', detail: 'ProjectDetails has been updated'})
  }

  const footer = 
    <div style={{marginBottom: '.5em', width: '100px', margin: 'auto'}} ></div>

  return (
    <>
      <Card footer={footer}>
        <div className="project-details-container">
          <div className="project-image">
            <img className="cover-image" src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt="pic here" onClick={(e) => op.toggle(e)} ></img>
          </div>

          <div className="project-data">
            <div className="data-item">
              <span className='label'>Project Name:</span>
              <span> {project.name}</span>
            </div>

            <div className="data-item">
              <span className='label'>Type:</span>
              <span> {project.type}</span>
            </div>

            <div className="data-item">
              <span className='label'>Sub Type:</span> {projectDetails.subType}
              <span> {project.subType}</span>
            </div>

            <div className="data-item">
              <span className='label'>Description:</span> {projectDetails.description}
              <span> {project.description}</span>
            </div>

            <div className="data-item">
              <span className='label'>Google Sheets Id:</span> {projectDetails.sheetsId}
              <span> {project.sheetsId}</span>
            </div>

            <div className="data-item">
              <span className='label'>Fusion Model URL:</span> {projectDetails.model}
              <span> {project.model}</span>
            </div>
          </div>
        </div>
      </Card>

      <OverlayPanel ref={el => op = el} showCloseIcon={true}>
        <img src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt={projectDetails.name} />
      </OverlayPanel>
    </>
  )
}

export default ProjectDetails