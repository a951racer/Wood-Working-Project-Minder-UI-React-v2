import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

const LibraryList = ({items}) => {
  const [layout, setLayout] = useState('grid')
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
      setRows(12)
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

  const renderListItem = (item) => {
    return (
        <div className="p-col-12">
            <div className="product-list-item" >
                <img className='p-shadow-7' src={item.path} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here' onClick={() => thumbClickHander(item.path)}></img>
                <div style={{width: '100%'}} onClick={() => clickHandler(item._id)}>
                  <div className="product-list-detail">
                    <div className="product-list-action">
                      <Rating value={item.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="product-name">{item.title}</div>
                    <div className="product-description">{item.description}</div>
                    <span>
                      {
                        item.tags.map((tag, index) => (
                            <Chip key={index} label={tag} />
                        ))
                      }
                    </span>
                  </div>
                </div>
            </div>
        </div>

    );
  }

  const renderGridItem = (item) => {
    return (
      <div className="p-col-12 p-md-1">
        <div className="product-grid-item card" onClick={() => clickHandler(item._id)}>
          <div className="product-grid-item-content">
            <div className="product-name">{item.title}</div>
            <Rating value={item.rating} readOnly cancel={false}></Rating>
            <img className='cover-image p-shadow-7' src={item.path} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here'></img>
          </div>
          </div>
        </div>
  )
  }

  const itemTemplate = (item, layout) => {
    if (!item) {
        return null
    }

    if (layout === 'list')
        return renderListItem(item)
    else if (layout === 'grid')
        return renderGridItem(item)
  }

  const header = renderHeader();
  
  function clickHandler (id) {
    setRedirect(true)
    setRedirectTo('/library-item/' + id)
  }

  function thumbClickHander (path) {
    const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
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
                value={items}
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

export default LibraryList