import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'
import { ScrollPanel } from 'primereact/scrollpanel';

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

import JobListItem from './JobListItem'

const JobList = ({jobs}) => {
  const [layout, setLayout] = useState('list')
  const [rows, setRows] = useState(8)
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

  const changeLayout = (layout) => {
    if (layout === 'list') {
      setRows(8)
    } else {
      setRows(8)
    }
    setLayout(layout)
  }

  const renderHeader = () => {
    return (
        <div className="p-grid p-nogutter">
            <div className="p-col-6" style={{textAlign: 'left'}}>
                Sorting Placeholder
            </div>
            <div className="p-col-6" style={{textAlign: 'right'}}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => changeLayout(e.value)} />
            </div>
        </div>
    );
  }

  const renderListItem = (job) => {
    return (
        <div className="p-col-12">
            <div className="product-list-item" onClick={() => clickHandler(job._id)}>
                <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/' + job._id + '/Thumbnail.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'} alt='pic here'></img>
                <div className="product-list-detail">
                  <div className="product-name">{job.name}</div>
                  <div className="product-description">{job.description}</div>
                  <span>
                    {
                      job.tags.map((tag, index) => (
                          <Chip key={index} label={tag} />
                      ))
                    }
                  </span>
                </div>
                <div className="product-list-action">
                  <Rating value={job.rating} readOnly cancel={false}></Rating>
                </div>
            </div>
        </div>

    );
  }

  const renderGridItem = (job) => {
    return (
      <div className="p-col-12 p-md-3">
        <div className="product-grid-item card" onClick={() => clickHandler(job._id)}>
        <div className="product-grid-item-content">
            <div className="product-name">{job.name}</div>
            <div className="product-description">{job.description}</div>
            <Rating value={job.rating} readOnly cancel={false}></Rating>
            <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + job._id + '.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Job+Pic.png'} alt='pic here'></img>
            </div>
            <div className='tags-grid'>
              <span>
                {
                  job.tags.map((tag, index) => (
                      <Chip key={index} label={tag} />
                  ))
                }
              </span>
            </div>
        </div>
    </div>
  )
  }

  const itemTemplate = (job, layout) => {
    if (!job) {
        return null
    }

    if (layout === 'list')
        return renderListItem(job)
    else if (layout === 'grid')
        return renderGridItem(job)
  }

  const header = renderHeader();
  
  function clickHandler (id) {
    setRedirect(true)
    setRedirectTo('/job-details/' + id)
  }

  if (redirect) {
    return <Redirect push to={redirectTo} />
  }

  return (
    <>
      <Router>
        <div className="dataview-demo">
          <div className="card">
              <DataView
                value={jobs}
                layout={layout}
                header={header}
                itemTemplate={itemTemplate}
                paginator rows={rows}
                emptyMessage='No Records Found'
                //sortOrder={sortOrder}
                //sortField={sortField}
              />
          </div>
        </div>
      </Router>
    </>
  )
}

export default JobList