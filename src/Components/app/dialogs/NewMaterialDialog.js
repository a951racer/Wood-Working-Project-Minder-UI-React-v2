import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

const NewMaterialDialog = ({createMaterial}) => {
  const materialDefault = {
    date: new Date(),
    category: '',
    vendor: '',
    item: '',
    cost: ''
  }
  const [showDialog, setShowDialog] = useState(false)
  const [material, setMaterial] = useState(materialDefault)

  const updateProperty = (property, value) => {
    const updatedMaterial = {...material, [property]: value}
    setMaterial(updatedMaterial)
  }

  const cancel = () => {
    setMaterial(materialDefault)
    setShowDialog(false)
  }

  const save = async () => {
    createMaterial(material)
    setMaterial(materialDefault)
    setShowDialog(false)
  }

////////////////////////

  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-materials" className="scotchy-button" onClick={cancel}/>
                      <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={save}/>
                    </div>;

  return (
    <>
      <Button className='p-shadow-3' type="button" label="Add" icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'Add Material'} modal={true} footer={dialogFooter} onHide={cancel}>
        {
          <div className="p-grid p-fluid">
          <div className="p-col-4 "><label htmlFor="date">Date:</label></div>
          <div className="p-col-8">
            <InputText id="date" onChange={(e) => {updateProperty('date', e.target.value)}} value={material.date}/>
          </div>

          <div className="p-col-4 "><label htmlFor="category">Category:</label></div>
          <div className="p-col-8">
            <InputText id="category" onChange={(e) => {updateProperty('category', e.target.value)}} value={material.category}/>
          </div>

          <div className="p-col-4 "><label htmlFor="vendor">Vendor:</label></div>
          <div className="p-col-8">
            <InputText id="vendor" onChange={(e) => {updateProperty('vendor', e.target.value)}} value={material.vendor}/>
          </div>

          <div className="p-col-4 "><label htmlFor="item">Item:</label></div>
          <div className="p-col-8">
            <InputText id="item" onChange={(e) => {updateProperty('item', e.target.value)}} value={material.item}/>
          </div>

          <div className="p-col-4 "><label htmlFor="cost">Cost:</label></div>
          <div className="p-col-8">
            <InputText id="cost" onChange={(e) => {updateProperty('cost', e.target.value)}} value={material.cost}/>
          </div>

      </div>
        }
      </Dialog>
    </>
  )
}

export default NewMaterialDialog