import React, { useState, useRef } from 'react'
import moment from 'moment'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Chips } from 'primereact/chips'
import Chip from '../app/Chip/Chip'

import NewLibraryItemDialog from '../app/dialogs/NewLibraryItemDialog'

import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useFetch from '../../providers/fetch/hook'

const FilesTable = ({files, updateFiles, mediaType, id}) => {
  const [editingFile, setEditingFile] = useState()
  const [fileList, setFileList] = useState(files)
  const { fetchViaApi } = useFetch()

  const notify = (message) => toast.success(message);

  const addFile = async (file) => {
    const newId = await fetchViaApi('POST', '/util/dbid')
    file._id = newId.id
    files.push(file)
    await setFileList(files)
    await updateFiles(files)
  }

  const onRowEditInit = (event) => {
    const file = {...event.data}
    setEditingFile(file)
  }

  const onRowEditSave = async (event) => {
    const index = _.findIndex(files, {'_id': event.data._id})
    files[index] = editingFile
    await setFileList(files)
    await updateFiles(fileList)
    setEditingFile(null)
    notify('File has been saved.')
  }

  const onRowEditCancel = (event) => {
    setEditingFile(null)
  }

// Editor control functions
  const updateProperty = (property, value) => {
    const file = {...editingFile, [property]: value}
    setEditingFile( file )
  }

  // Editors
  const textEditor = (props) => {
    return <InputText type="text" value={editingFile[props.field]} onChange={(e) => updateProperty(props.field, e.target.value)} />
  }

  const tagsEditor = (props) => {
    return <Chips value={props.rowData.tags} onChange={(e) => updateProperty(props.field, e.target.value) } />
  }

  // Body Templates
  const dateBodyTemplate = (rowData) => {
    return moment(rowData.date).format('MM/DD/YYYY')
  }

  const tagsBodyTemplate = (rowData) => {
    return (            
      rowData.tags.map((tag, index) => (
          <Chip key={index} label={tag} />
      ))
    )
  }

  return (
    <>
      <NewLibraryItemDialog mediaType={mediaType} id={id} onSave={(file)=>addFile(file)}/>
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
      <DataTable
        value={fileList}
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
        <Column field="created_date" header="Created" sortable={true} editor={textEditor} body={dateBodyTemplate} />
        <Column field="title" header="Title" sortable={true} editor={textEditor} />
        <Column field="description" header="Description" sortable={true} editor={textEditor} />
        <Column field="tags" header="Tags" sortable={true} editor={tagsEditor} body={tagsBodyTemplate}/>
        <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
      </DataTable>
    </>
  )
}

export default FilesTable