import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'
import { ScrollPanel } from 'primereact/scrollpanel';

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

const ProjectList = ({projects}) => {
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

  const renderListItem = (project) => {
    return (
        <div className="p-col-12">
            <div className="product-list-item" onClick={() => clickHandler(project._id)}>
                <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/' + project._id + '/Thumbnail.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here'></img>
                <div className="product-list-detail">
                  <div className="product-name">{project.name}</div>
                  <div className="product-description">{project.description}</div>
                  <span>
                    {
                      project.tags.map((tag, index) => (
                          <Chip key={index} label={tag} />
                      ))
                    }
                  </span>
                </div>
                <div className="product-list-action">
                  <Rating value={project.rating} readOnly cancel={false}></Rating>
                </div>
            </div>
        </div>

    );
  }

  const renderGridItem = (project) => {
    return (
      <div className="p-col-12 p-md-3">
        <div className="product-grid-item card" onClick={() => clickHandler(project._id)}>
          <div className="product-grid-item-content">
              <div className="product-name">{project.name}</div>
              <div className="product-description">{project.description}</div>
              <Rating value={project.rating} readOnly cancel={false}></Rating>
              <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here'></img>
              <div className='tags-grid'>
                <span>
                  {
                    project.tags.map((tag, index) => (
                        <Chip key={index} label={tag} />
                    ))
                  }
                </span>
              </div>
          </div>
        </div>
    </div>
  )
  }

  const itemTemplate = (project, layout) => {
    if (!project) {
        return null
    }

    if (layout === 'list')
        return renderListItem(project)
    else if (layout === 'grid')
        return renderGridItem(project)
  }

  const header = renderHeader();
  
  function clickHandler (id) {
    setRedirect(true)
    setRedirectTo('/project-details/' + id)
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
                value={projects}
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

export default ProjectList