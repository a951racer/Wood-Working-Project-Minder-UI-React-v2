import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Chips } from 'primereact/chips'
import FileUploadDialog from './FileUploadDialog';


const NewLibraryItemDialog = ({mediaType, id, onSave}) => {
  const itemDefault = {
    title: '',
    path: '',
    tags: [],
    description: ''
  }
  const [showDialog, setShowDialog] = useState(false)
  const [item, setItem] = useState(itemDefault)

  const updateProperty = (property, value) => {
    const updatedItem = {...item, [property]: value}
    setItem(updatedItem)
  }

  const cancel = () => {
    setItem(itemDefault)
    setShowDialog(false)
  }

  const save = async () => {
    setItem(itemDefault)
    setShowDialog(false)
    onSave(item)
  }

  const onUpload = (path) => {
    updateProperty('path', path)
  }
  
////////////////////////

  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={cancel}/>
                      <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={save}/>
                    </div>;

  return (
    <>
      <Button className='p-shadow-3' type="button" label="New" icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'New Item'} modal={true} footer={dialogFooter} onHide={cancel}>
        {
          <div className="p-grid p-fluid">
          <div className="p-col-4 "><label htmlFor="title">Item Title</label></div>
          <div className="p-col-8">
            <InputText id="title" onChange={(e) => {updateProperty('title', e.target.value)}} value={item.title}/>
          </div>

          <div className="p-col-4 "><label htmlFor="tags">Tags</label></div>
          <div className="p-col-8">
            <Chips id="tags" onChange={(e) => {updateProperty('tags', e.target.value)}} value={item.tags}/>
          </div>

          <div className="p-col-4 "><label htmlFor="description">Description</label></div>
          <div className="p-col-8">
            <InputText id="description" onChange={(e) => {updateProperty('description', e.target.value)}} value={item.description}/>
          </div>

          <FileUploadDialog label='Library Item' mediaType={mediaType} id={id} onUpload={(path) => onUpload(path)} />

          <div className="p-col-4 "><label htmlFor="path">Path</label></div>
          <div className="p-col-8">
            <InputText id="path" onChange={(e) => {updateProperty('path', e.target.value)}} value={item.path}/>
          </div>

      </div>
        }
      </Dialog>
    </>
  )
}

export default NewLibraryItemDialog