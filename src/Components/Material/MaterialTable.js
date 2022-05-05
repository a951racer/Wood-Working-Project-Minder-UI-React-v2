import React, { useState } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import NewMaterialDialog from '../../Components/app/dialogs/NewMaterialDialog'

import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useFetch from '../../providers/fetch/hook'

const MaterialTable = ({material, updateMaterial}) => {
  const [editingMaterial, setEditingMaterial] = useState()
  const [materialList, setMaterialList] = useState(material)
  const { fetchViaApi } = useFetch()

  const notify = (message) => toast.success(message);

  const addMaterial = async (newMaterial) => {
    const newId = await fetchViaApi('POST', '/util/dbid')
    newMaterial._id = newId.id
    material.push(newMaterial)
    await setMaterialList(material)
    await updateMaterial(materialList)
  }

  const onRowEditInit = (event) => {
    const material = {...event.data}
    setEditingMaterial(material)
  }

  const onRowEditSave = async (event) => {
    const index = _.findIndex(material, {'_id': event.data._id})
    material[index] = editingMaterial
    await setMaterialList(material)
    await updateMaterial(materialList)
    setEditingMaterial(null)
    notify('Material edit has been saved.')
  }

  const onRowEditCancel = (event) => {
    setEditingMaterial(null)
  }

// Editor control functions
  const updateProperty = (property, value) => {
    const material = {...editingMaterial, [property]: value}
    setEditingMaterial( material)
  }

  // Editors
  const textEditor = (props) => {
    return <InputText type="text" value={editingMaterial[props.field]} onChange={(e) => updateProperty(props.field, e.target.value)} />
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  // Body Templates
  const costBodyTemplate = (rowData) => {
    return formatCurrency(rowData.cost)
  }

  const dateBodyTemplate = (rowData) => {
    return moment(rowData.date).format('MM/DD/YYYY')
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Zoom}
      />
      <NewMaterialDialog createMaterial={(newMaterial)=>addMaterial(newMaterial)}/>
      <DataTable
        value={materialList}
        paginator={true}
        rows={15}
        rowHover={true}
        autoLayout={true}
        dataKey="id"
        editMode="row"
        onRowEditInit={onRowEditInit}
        onRowEditSave={onRowEditSave}
        onRowEditCancel={onRowEditCancel}
      >
        <Column field="date" header="Date" sortable={true} editor={textEditor} body={dateBodyTemplate} />
        <Column field="category" header="Category" sortable={true} editor={textEditor} />
        <Column field="vendor" header="Vendor" sortable={true} editor={textEditor} />
        <Column field="item" header="Item" sortable={true} editor={textEditor} />
        <Column field="cost" header="Cost" sortable={true} editor={textEditor}  style={{textAlign: 'right'}} dataType="numeric" body={costBodyTemplate} />
        <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
      </DataTable>
    </>
  )
}

export default MaterialTable
