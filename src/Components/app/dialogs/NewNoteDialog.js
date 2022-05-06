import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Chips } from 'primereact/chips'

const NewNoteDialog = ({createNote}) => {
  const noteDefault = {
    created: new Date(),
    title: '',
    tags: [],
    type: '',
    body: ''
  }
  const [showDialog, setShowDialog] = useState(false)
  const [note, setNote] = useState(noteDefault)

  const updateProperty = (property, value) => {
    const updatedNote = {...note, [property]: value}
    setNote(updatedNote)
  }

  const cancel = () => {
    setNote(noteDefault)
    setShowDialog(false)
  }

  const save = async () => {
    createNote(note)
    setNote(noteDefault)
    setShowDialog(false)
  }

////////////////////////

  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-notes" className="scotchy-button" onClick={cancel}/>
                      <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={save}/>
                    </div>;

  return (
    <>
      <Button className='p-shadow-3' type="button" label="Add" icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'Add Note'} modal={true} footer={dialogFooter} onHide={cancel}>
        {
          <div className="p-grid p-fluid">
          <div className="p-col-4 "><label htmlFor="created">Date:</label></div>
          <div className="p-col-8">
            <InputText id="created" onChange={(e) => {updateProperty('created', e.target.value)}} value={note.created}/>
          </div>

          <div className="p-col-4 "><label htmlFor="type">Type:</label></div>
          <div className="p-col-8">
            <InputText id="type" onChange={(e) => {updateProperty('type', e.target.value)}} value={note.type}/>
          </div>

          <div className="p-col-4 "><label htmlFor="hours">Title:</label></div>
          <div className="p-col-8">
            <InputText id="title" onChange={(e) => {updateProperty('title', e.target.value)}} value={note.title}/>
          </div>

          <div className="p-col-4 "><label htmlFor="tags">Tags</label></div>
          <div className="p-col-8">
            <Chips id="tags" onChange={(e) => {updateProperty('tags', e.target.value)}} value={note.tags}/>
          </div>

          <div className="p-col-4 "><label htmlFor="body">Note:</label></div>
          <div className="p-col-8">
            <InputText id="body" onChange={(e) => {updateProperty('body', e.target.value)}} value={note.body}/>
          </div>
      </div>
        }
      </Dialog>
    </>
  )
}

export default NewNoteDialog