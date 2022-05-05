import React, { useState, useRef } from 'react'
import moment from 'moment'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import NewTimeDialog from '../../Components/app/dialogs/NewTimeDialog'

import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useFetch from '../../providers/fetch/hook'

const TimeTable = ({timeSlips, updateTime}) => {
  const [editingTime, setEditingTime] = useState()
  const [timeSlipList, setTimeSlipList] = useState(timeSlips)
  const { fetchViaApi } = useFetch()

  const notify = (message) => toast.success(message);

  const addTime = async (time) => {
    const newId = await fetchViaApi('POST', '/util/dbid')
    time._id = newId.id
    timeSlips.push(time)
    await setTimeSlipList(timeSlips)
    await updateTime(timeSlips)
  }

  const onRowEditInit = (event) => {
    const time = {...event.data}
    setEditingTime(time)
  }

  const onRowEditSave = async (event) => {
    const index = _.findIndex(timeSlips, {'_id': event.data._id})
    timeSlips[index] = editingTime
    await setTimeSlipList(timeSlips)
    await updateTime(timeSlipList)
    setEditingTime(null)
    notify('Time slip has been saved.')
  }

  const onRowEditCancel = (event) => {
    setEditingTime(null)
  }

// Editor control functions
  const updateProperty = (property, value) => {
    const time = {...editingTime, [property]: value}
    setEditingTime( time)
  }

  // Editors
  const textEditor = (props) => {
    return <InputText type="text" value={editingTime[props.field]} onChange={(e) => updateProperty(props.field, e.target.value)} />
  }

  // Body Templates
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
      <NewTimeDialog createTime={(time)=>addTime(time)}/>
      <DataTable
        value={timeSlipList}
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
        <Column field="type" header="Type" sortable={true} editor={textEditor} />
        <Column field="hours" header="Hours" sortable={true} editor={textEditor} />
        <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
      </DataTable>
    </>
  )
}

export default TimeTable