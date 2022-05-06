import React, { useState } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Chips } from 'primereact/chips'

import NewNoteDialog from '../app/dialogs/NewNoteDialog'
import Chip from '../app/Chip/Chip'

import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useFetch from '../../providers/fetch/hook'

const NoteTable = ({notes = [], updateNotes}) => {
  const [editingNote, setEditingNote] = useState()
  const [noteList, setNoteList] = useState(notes)
  const { fetchViaApi } = useFetch()

  const notify = (message) => toast.success(message);

  const addNote = async (newNote) => {
    const newId = await fetchViaApi('POST', '/util/dbid')
    newNote._id = newId.id
    console.log('new note: ', newNote)
    notes.push(newNote)
    await setNoteList(notes)
    await updateNotes(noteList)
  }

  const onRowEditInit = (event) => {
    const note = {...event.data}
    setEditingNote(note)
  }

  const onRowEditSave = async (event) => {
    const index = _.findIndex(notes, {'_id': event.data._id})
    notes[index] = editingNote
    await setNoteList(notes)
    await updateNotes(noteList)
    setEditingNote(null)
    notify('Note edit has been saved.')
  }

  const onRowEditCancel = (event) => {
    setEditingNote(null)
  }

// Editor control functions
  const updateProperty = (property, value) => {
    const note = {...editingNote, [property]: value}
    setEditingNote( note)
  }

  // Editors
  const textEditor = (props) => {
    return <InputText type="text" value={editingNote[props.field]} onChange={(e) => updateProperty(props.field, e.target.value)} />
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
      <NewNoteDialog createNote={(newNote)=>addNote(newNote)}/>
      <DataTable
        value={noteList}
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
        <Column field="created" header="Created" sortable={true} editor={textEditor} body={dateBodyTemplate} />
        <Column field="title" header="Title" sortable={true} editor={textEditor} />
        <Column field="type" header="Type" sortable={true} editor={textEditor} />
        <Column field="body" header="Note" sortable={false} editor={textEditor} />
        <Column field="tags" header="Tags" sortable={false} editor={tagsEditor} body={tagsBodyTemplate}/>
        <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
      </DataTable>
    </>
  )
}

export default NoteTable
