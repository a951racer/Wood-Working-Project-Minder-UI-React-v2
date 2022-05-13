import React, { useState } from 'react'
import moment from 'moment'
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

  const updateProperty = async (property, value) => {
    const updatedJobDetails = {...jobDetails, [property]: value}
    await setJobDetails(updatedJobDetails)
  }

  const saveJobDetails = async () => {
    setIsEditing(false)
    await saveJob(jobDetails)
  }

  const onUpload = async (path) => {
    await updateProperty('coverImage', path)
    await saveJob(jobDetails)
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
                      onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'}
                      alt="pic here"
                      onClick={(e) => op.toggle(e)}
                    />
                  </div>
                  <FileUploadDialog label='Thumbnail' mediaType='thumbnail' id={jobDetails._id} onUpload={(path) => onUpload(path)} />
                </div>
                <div className="job-data">
                  <div className="data-item">
                    <span className='job-name'> {jobDetails.name}</span>
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
                    <span className='label'>Customer:</span>
                    <span> {jobDetails.customer}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Start Date:</span>
                    <span> {moment(jobDetails.startDate).format('MM/DD/YYYY')}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>End Date:</span>
                    <span> {moment(jobDetails.endDate).format('MM/DD/YYYY')}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Fusion Model URL:</span>
                    <span> {jobDetails.model}</span>
                  </div>
                </div>
              </div>
            </Card>

            <OverlayPanel ref={el => op = el} showCloseIcon={true}>
              <div className='overlay-frame centered'>
                <img
                  className='overlay-image'
                  src={imagePath} 
                  alt={jobDetails.name}
                  onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'}
                />
              </div>
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
                src={imagePath}
                onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'}
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
                <span className='label'>Customer:</span>
                <InputText value={jobDetails.customer} onChange={(e) => updateProperty('customer', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Start Date:</span>
                <InputText value={jobDetails.startDate} onChange={(e) => updateProperty('startDate', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>End Date:</span>
                <InputText value={jobDetails.endDate} onChange={(e) => updateProperty('endDate', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Editable Fusion Model URL:</span>
                <InputText value={jobDetails.model} onChange={(e) => updateProperty('model', e.target.value)} />
              </div>
            </div>
          </div>
        </Card>

        <OverlayPanel ref={el => op = el} showCloseIcon={true}>
          <div className='overlay-frame centered'>
            <img
              className='overlay-image'
              src={imagePath} 
              alt={jobDetails.name}
              onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'}
            />
          </div>
        </OverlayPanel>
      </>
      }
    </>
  )
}

export default JobDetails