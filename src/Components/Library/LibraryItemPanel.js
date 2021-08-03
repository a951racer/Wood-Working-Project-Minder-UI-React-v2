import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { Chips } from 'primereact/chips'
import Chip from '../app/Chip/Chip'
import FileUploadDialog from '../app/dialogs/FileUploadDialog'

import useLibrary from '../../providers/library/hook'
import useFiles from '../../providers/files/hook'
import './Library.css'

const LibraryItem = ({item}) => {
  const [libraryItem, setLibraryItem] = useState(item)
  const [itemSnapshot, setItemSnapshot] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const { fetchItemDetails, saveItem } = useLibrary()
  const { uploadFile } = useFiles()

  let op = React.createRef()

  const startEditing = () => {
    setItemSnapshot(libraryItem)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setLibraryItem(itemSnapshot)
    setItemSnapshot(null)
  }

  const updateProperty = (property, value) => {
    const updatedLibraryItem = {...libraryItem, [property]: value}
    setLibraryItem(updatedLibraryItem)
  }

  const saveLibraryItem = async () => {
    setIsEditing(false)
    await saveItem(libraryItem)
    //this.growl.show({severity: 'success', summary: 'Saved', detail: 'LibraryItem has been updated'})
  }

  const onUpload = (path) => {
    updateProperty('path', path)
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
                <div className="project-data">
                  <div className="data-item">
                    <Rating value={item.rating} readOnly cancel={false} style={{marginBottom: '5px'}}></Rating>
                    <span className='label'>Title:</span>
                    <span> {libraryItem.title}</span>
                  </div>

                  <div className="data-item">
                    <span className='label'>Tags:</span>
                      {
                        libraryItem.tags.map((tag, index) => (
                            <Chip key={index} label={tag} />
                        ))
                      }
                  </div>

                  <div className="data-item">
                    <span className='label'>Description:</span>
                    <span> {libraryItem.description}</span>
                  </div>
                </div>
              </div>
            </Card>

          </>
      :
        <>
          <Card footer={footer}>
          <div className='edit-buttons'>
            <i className='pi pi-w pi-check' onClick={() => saveLibraryItem()} />
            &nbsp; &nbsp;
            <i className='pi pi-w pi-times' onClick={() => cancelEditing()} />
          </div>
          <div className="project-details-container">
            <div className="project-data">
              <Rating value={item.rating} cancel={false} style={{marginBottom: '5px'}}></Rating>
              <div className="data-item">
                <span className='label'>Title:  </span>
                <InputText value={libraryItem.title} onChange={(e) => updateProperty('title', e.target.value)} />
              </div>

              <div className="data-item">
                <span className='label'>Tags: </span>
                <Chips value={libraryItem.tags} onChange={(e) => updateProperty('tags', e.target.value) } />
              </div>

              <div className="data-item">
                <span className='label'>Description:</span>
                <InputText value={libraryItem.description} onChange={(e) => updateProperty('description', e.target.value)} />
              </div>

              <div className="project-image">
                <FileUploadDialog label='Library Item' mediaType='library' onUpload={(path) => onUpload(path)} />
              </div>

            </div>
          </div>
        </Card>
      </>
      }
    </>
  )
}

export default LibraryItem