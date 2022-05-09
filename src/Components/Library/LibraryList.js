import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel';

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

const LibraryList = ({items}) => {
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

  const renderListItem = (item) => {
    return (
      <div className="p-col-12" onClick={() => clickHandler(item._id)} >
        <div className="item-details">
          <div>
            <div className='p-shadow-3 image-frame-list'>
              <img className='grid-image' src={item.path} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here' onClick={() => thumbClickHandler(item.path)}></img>
            </div>
            <div className="p-grid">
              <div className="item-data"><Rating value={item.rating} readOnly cancel={false}></Rating></div>
              <div className="item-data"><b>{item.title}</b></div>
              <div className="item-data">{item.description}</div>
              <div className="item-tags">
                {
                  item.tags.map((tag, index) => (
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

  const renderGridItem = (item) => {
    return (
      <div style={{ padding: '.5em' }} className="p-col-12 p-md-1">
        <Panel header={item.title} style={{ textAlign: 'center' }} >
          <div className='centered' onClick={() => clickHandler(item._id)} >
            <div className='p-shadow-3 image-frame centered' >
              <img className='grid-image' src={item.path} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here' ></img>
            </div>
          </div>
          <Rating className='grid-rating' value={item.rating} readOnly cancel={false}></Rating>
        </Panel>
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

  function thumbClickHandler (path) {
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

export default LibraryList