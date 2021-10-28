import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Chips } from 'primereact/chips'
import Chip from '../app/Chip/Chip'
import FileUploadDialog from '../app/dialogs/FileUploadDialog'

import useJobs from '../../providers/jobs/hook'
import useFiles from '../../providers/files/hook'
import './Jobs.css'

const JobDetails = ({job}) => {
  const [jobDetails, setJobDetails] = useState(job)
  const [jobSnapshot, setJobSnapshot] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [imagePath, setImagePath] = useState('https://wwpm-files.s3-us-west-2.amazonaws.com/' + job._id + '/Thumbnail.png')
  const { fetchJobDetails, saveJob } = useJobs()
  const { uploadFile } = useFiles()

  let op = React.createRef()

  const startEditing = () => {
    setJobSnapshot(jobDetails)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setJobDetails(jobSnapshot)
    setJobSnapshot(null)
  }

  const updateProperty = (property, value) => {
    const updatedJobDetails = {...jobDetails, [property]: value}
    setJobDetails(updatedJobDetails)
  }

  const saveJobDetails = async () => {
    setIsEditing(false)
    await saveJob(jobDetails)
    //this.growl.show({severity: 'success', summary: 'Saved', detail: 'JobDetails has been updated'})
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
              <div className="job-details-container">
                <div className="job-image">
                  <div className='image-card p-shadow-7'>
                    <img 
                      className="cover-image"
                      src={imagePath}
                      onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'}
                      alt="pic here"
                      onClick={(e) => op.toggle(e)}
                    />
                  </div>
                  <FileUploadDialog label='Thumbnail' mediaType='thumbnail' jobId={jobDetails._id}/>
                </div>
                <div className="job-data">
                  <div className="data-item">
                    <span className='label'>Job Name:</span>
                    <span> {jobDetails.name}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Tags:</span>
                      {
                        jobDetails.tags.map((tag, index) => (
                            <Chip key={index} label={tag} />
                        ))
                      }
                  </div>

                  <div className="data-item">
                    <span className='label'>Description:</span>
                    <span> {jobDetails.description}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Google Sheets Id:</span> 
                    <span> {jobDetails.sheetsId}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Fusion Model URL:</span>
                    <span> {jobDetails.model}</span>
                  </div>
                </div>
              </div>
            </Card>

            <OverlayPanel ref={el => op = el} showCloseIcon={true}>
              <img
                src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + job._id + '.png'}
                onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'}
                alt={jobDetails.name}
              />
            </OverlayPanel>
          </>
      :
        <>
          <Card footer={footer}>
          <div className='edit-buttons'>
            <i className='pi pi-w pi-check' onClick={() => saveJobDetails()} />
            &nbsp; &nbsp;
            <i className='pi pi-w pi-times' onClick={() => cancelEditing()} />
          </div>
          <div className="job-details-container">
            <div className="job-image">
              <img className="cover-image"
                src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + job._id + '.png'}
                onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'}
                alt="pic here"
                onClick={(e) => op.toggle(e)}
              ></img>
            </div>
            <div className="job-data">
              <div className="data-item">
                <span className='label'>Job Name:  </span>
                <InputText value={jobDetails.name} onChange={(e) => updateProperty('name', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Tags: </span>
                <Chips value={jobDetails.tags} onChange={(e) => updateProperty('tags', e.target.value) } />
              </div>

              <div className="data-item">
                <span className='label'>Description:</span>
                <InputText value={jobDetails.description} onChange={(e) => updateProperty('description', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Google Sheets Id:</span>
                <InputText value={jobDetails.sheetsId} onChange={(e) => updateProperty('sheetsId', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Editable Fusion Model URL:</span>
                <InputText value={jobDetails.model} onChange={(e) => updateProperty('model', e.target.value)} />
              </div>
            </div>
          </div>
        </Card>

        <OverlayPanel ref={el => op = el} showCloseIcon={true}>
          <img
            src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + job._id + '.png'} alt={jobDetails.name}
            onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'}
          />
        </OverlayPanel>
      </>
      }
    </>
  )
}

export default JobDetails