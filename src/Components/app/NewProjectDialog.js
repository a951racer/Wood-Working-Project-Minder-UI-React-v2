import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

import useProjects from '../../providers/projects/hook'

const NewProjectDialog = () => {
  const projectDefault = {
    name: '',
    type: '',
    subType: '',
    description: ''
  }
  const [showDialog, setShowDialog] = useState(false)
  const [project, setProject] = useState(projectDefault)
  const { createProject } = useProjects()

  const updateProperty = (property, value) => {
    const updatedProject = {...project, [property]: value}
    setProject(updatedProject)
  }

  const cancel = () => {
    setProject({})
    setShowDialog(false)
  }

  const save = async () => {
    console.log('about to save: ', project)
    createProject(project)
    console.log('saved project')
    setProject(projectDefault)
    console.log('set to default')
    setShowDialog(false)
    console.log('hid dialog')
  }

////////////////////////

  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={cancel}/>
                      <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={save}/>
                    </div>;

  return (
    <>
      <Button type="button" label="New" icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'New Project'} modal={true} footer={dialogFooter} onHide={cancel}>
        {
          <div className="p-grid p-fluid">
          <div className="p-col-4 "><label htmlFor="name">Project Name</label></div>
          <div className="p-col-8">
            <InputText id="name" onChange={(e) => {updateProperty('name', e.target.value)}} value={project.name}/>
          </div>

          <div className="p-col-4 "><label htmlFor="type">Type</label></div>
          <div className="p-col-8">
            <InputText id="type" onChange={(e) => {updateProperty('type', e.target.value)}} value={project.type}/>
          </div>

          <div className="p-col-4 "><label htmlFor="subType">Sub-Type</label></div>
          <div className="p-col-8">
            <InputText id="subType" onChange={(e) => {updateProperty('subType', e.target.value)}} value={project.subType}/>
          </div>

          <div className="p-col-4 "><label htmlFor="description">Description</label></div>
          <div className="p-col-8">
            <InputText id="description" onChange={(e) => {updateProperty('description', e.target.value)}} value={project.description}/>
          </div>

      </div>
        }
      </Dialog>
    </>
  )
}

export default NewProjectDialog