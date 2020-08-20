import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'

const BoardTable = ({boards}) => {
  const [editingBoard, setEditingBoard] = useState()

  const onRowEditInit = (event) => {
    const board = {...event.data}
    setEditingBoard(board)
  }

  const onRowEditSave = async (event) => {
    setEditingBoard(null)
    growl.show({severity: 'success', summary: 'Saved', detail: 'Board has been updated'})
  }

  const onRowEditCancel = (event) => {
    setEditingBoard(null)
  }

// Editor control functions
  const updateProperty = (property, value) => {
    const board = {...editingBoard, [property]: value}
    setEditingBoard( board)
  }

  // Editors
  const textEditor = (props) => {
    return <InputText type="text" value={editingBoard[props.field]} onChange={(e) => updateProperty(props.field, e.target.value)} />
  }

  return (
    <DataTable
    value={boards}
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
    <Column field="label" header="Label" sortable={true} editor={textEditor} />
    <Column field="name" header="Name" sortable={true} editor={textEditor} />
    <Column field="roughThickness" header="Rough Thickness" sortable={true} editor={textEditor} />
    <Column field="roughLength" header="Rough Length" sortable={true} editor={textEditor} />
    <Column field="roughWidth" header="Rough Width" sortable={true} editor={textEditor} />
    <Column field="finalThickness" header="Final Thickness" sortable={true} editor={textEditor} />
    <Column field="finalLength" header="Final Length" sortable={true} editor={textEditor} />
    <Column field="finalWidth" header="Final Width" sortable={true} editor={textEditor} />
    <Column field="shaping" header="Shaping" sortable={true} editor={textEditor} />
    <Column field="joinery" header="Joinery" sortable={true} editor={textEditor} />
    <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
  </DataTable>
  )
}

export default BoardTable