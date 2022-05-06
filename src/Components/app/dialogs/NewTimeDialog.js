import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

const NewTimeDialog = ({createTime}) => {
  const timeDefault = {
    date: new Date(),
    type: '',
    hours: ''
  }
  const [showDialog, setShowDialog] = useState(false)
  const [time, setTime] = useState(timeDefault)

  const updateProperty = (property, value) => {
    const updatedTime = {...time, [property]: value}
    setTime(updatedTime)
  }

  const cancel = () => {
    setTime(timeDefault)
    setShowDialog(false)
  }

  const save = async () => {
    createTime(time)
    setTime(timeDefault)
    setShowDialog(false)
  }

////////////////////////

  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={cancel}/>
                      <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={save}/>
                    </div>;

  return (
    <>
      <Button className='p-shadow-3' type="button" label="Add" icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'Add Time'} modal={true} footer={dialogFooter} onHide={cancel}>
        {
          <div className="p-grid p-fluid">
          <div className="p-col-4 "><label htmlFor="date">Date:</label></div>
          <div className="p-col-8">
            <InputText id="date" onChange={(e) => {updateProperty('date', e.target.value)}} value={time.date}/>
          </div>

          <div className="p-col-4 "><label htmlFor="type">Type:</label></div>
          <div className="p-col-8">
            <InputText id="type" onChange={(e) => {updateProperty('type', e.target.value)}} value={time.type}/>
          </div>

          <div className="p-col-4 "><label htmlFor="hours">Hours:</label></div>
          <div className="p-col-8">
            <InputText id="hours" onChange={(e) => {updateProperty('hours', e.target.value)}} value={time.hours}/>
          </div>

      </div>
        }
      </Dialog>
    </>
  )
}

export default NewTimeDialog