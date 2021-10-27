import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import useProjects from '../../providers/projects/hook'
import useFetch from '../../providers/fetch/hook'

import './Reports.css'

const Reports = ({reports}) => {
  const { currentProject, importBoards } = useProjects()
  const { fetchViaApi } = useFetch()

const clickHandler = (path) => {
    const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const titleLink = (rowData) => {
    //return <a href={rowData.path} target="_blank">{rowData.title}</a>
    return (
      <span className="link" onClick={() => clickHandler(rowData.path)}>
        {rowData.title}
      </span>
    )
  }

  return (
    <>
      <DataTable
        value={reports}
        paginator={true}
        rows={15}
        rowHover={true}
        autoLayout={true}
        dataKey="id"
      >
        <Column field="title" header="Title" sortable={true} body={titleLink} />
        <Column field="type" header="Type" sortable={true} />
        <Column field="path" header="Link" sortable={true} />
      </DataTable>
    </>
  )
}

export default Reports
