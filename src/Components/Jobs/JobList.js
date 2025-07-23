import React, { useState } from 'react'
import { BrowserRouter as Router, Navigate } from 'react-router-dom'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel';

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

const JobList = ({jobs}) => {
  const [layout, setLayout] = useState('grid')
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

  const renderHeader = () => {
    return (
        <div className="p-grid p-nogutter">
            <div className="p-col-6" style={{textAlign: 'left'}}>
                Sorting Placeholder
            </div>
            <div className="p-col-6" style={{textAlign: 'right'}}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );
  }

  const renderListItem = (job) => {
    return (
      <div className="p-col-12" onClick={() => clickHandler(job._id)} >
        <div className="item-details">
          <div>
            <div className='p-shadow-3 image-frame-list'>
              <img className='grid-image' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/' + job._id + '/Thumbnail.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here' onClick={() => thumbClickHandler(job._id)}></img>
            </div>
            <div className="p-grid">
              <div className="item-data"><Rating value={job.rating} readOnly cancel={false}></Rating></div>
              <div className="item-data"><b>{job.name}</b></div>
              <div className="item-data">{job.description}</div>
              <div className="item-tags">
                {
                  job.tags.map((tag, index) => (
                      <Chip key={index} label={tag} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (job) => {
    return (
      <div style={{ padding: '.5em' }} className="p-col-12 p-md-1">
        <Panel header={job.name} style={{ textAlign: 'center' }} >
          <div className='centered' onClick={() => clickHandler(job._id)} >
            <div className='p-shadow-3 image-frame centered' >
              <img className='grid-image' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/' + job._id + '/Thumbnail.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here' ></img>
            </div>
          </div>
          <Rating className='grid-rating' value={job.rating} readOnly cancel={false}></Rating>
        </Panel>
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
    setRedirectTo('/job-details/' + id)
    setRedirect(true)
  }

  function thumbClickHandler (path) {
    const newWindow = window.open('https://wwpm-files.s3-us-west-2.amazonaws.com/' + path + '/Thumbnail.png', '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  if (redirect) {
    return <Navigate push to={redirectTo} />
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
                paginator rows={72}
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