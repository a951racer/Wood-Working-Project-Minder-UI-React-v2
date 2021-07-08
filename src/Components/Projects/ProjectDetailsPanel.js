import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import { OverlayPanel } from 'primereact/overlaypanel'

import useProjects from '../../providers/projects/hook'
import './Projects.css'

const ProjectDetails = ({project}) => {
  const [projectDetails, setProjectDetails] = useState(project)
  const [projectSnapshot, setProjectSnapshot] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const { saveProject } = useProjects()

  let op = React.createRef()

  const startEditing = () => {
    setProjectSnapshot(projectDetails)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setProjectDetails(projectSnapshot)
    setProjectSnapshot(null)
  }

  const updateProperty = (property, value) => {
    const updatedProjectDetails = {...projectDetails, [property]: value}
    setProjectDetails(updatedProjectDetails)
  }

  const saveProjectDetails = async () => {
    setIsEditing(false)
    await saveProject(projectDetails)
    //this.growl.show({severity: 'success', summary: 'Saved', detail: 'ProjectDetails has been updated'})
  }

  const footer = 
    <div style={{marginBottom: '.5em', width: '100px', margin: 'auto'}} ></div>

  return (
    <>
        {!isEditing ? 
          <>
            <Card footer={footer}>
              <div className='edit-buttons'>
                <i className='pi pi-w pi-pencil' onClick={() => startEditing()} />
              </div>
              <div className="project-details-container">
                <div className="project-image">
                  <img className="cover-image" src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + projectDetails._id + '.png'} alt="pic here" onClick={(e) => op.toggle(e)} ></img>
                </div>
                <div className="project-data">
                  <div className="data-item">
                    <span className='label'>Project Name:</span>
                    <span> {projectDetails.name}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Type:</span>
                    <span> {projectDetails.type}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Sub Type:</span>
                    <span> {projectDetails.subType}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Description:</span>
                    <span> {projectDetails.description}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Google Sheets Id:</span> 
                    <span> {projectDetails.sheetsId}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Fusion Model URL:</span>
                    <span> {projectDetails.model}</span>
                  </div>
                </div>
              </div>
            </Card>

            <OverlayPanel ref={el => op = el} showCloseIcon={true}>
              <img src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt={projectDetails.name} />
            </OverlayPanel>
          </>
      :
        <>
          <Card footer={footer}>
          <div className='edit-buttons'>
            <i className='pi pi-w pi-check' onClick={() => saveProjectDetails()} />
            &nbsp; &nbsp;
            <i className='pi pi-w pi-times' onClick={() => cancelEditing()} />
          </div>
          <div className="project-details-container">
            <div className="project-image">
              <img className="cover-image" src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt="pic here" onClick={(e) => op.toggle(e)} ></img>
            </div>
            <div className="project-data">
              <div className="data-item">
                <span className='label'>Project Name:  </span>
                <InputText value={projectDetails.name} onChange={(e) => updateProperty('name', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Type: </span>
                <InputText value={projectDetails.type} onChange={(e) => updateProperty('type', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Sub Type:</span>
                <InputText value={projectDetails.subType} onChange={(e) => updateProperty('subType', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Description:</span>
                <InputText value={projectDetails.description} onChange={(e) => updateProperty('description', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Google Sheets Id:</span>
                <InputText value={projectDetails.sheetsId} onChange={(e) => updateProperty('sheetsId', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Editable Fusion Model URL:</span>
                <InputText value={projectDetails.model} onChange={(e) => updateProperty('model', e.target.value)} />
              </div>
            </div>
          </div>
        </Card>

        <OverlayPanel ref={el => op = el} showCloseIcon={true}>
          <img src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt={projectDetails.name} />
        </OverlayPanel>
      </>
      }
    </>
  )
}

export default ProjectDetails