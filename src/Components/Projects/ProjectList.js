import React, { useState } from 'react'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

import ProjectListItem from './ProjectListItem'

const ProjectList = ({projects}) => {
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  
  const renderGridItem = (project) => {
    return (
      <div className="p-col-12 p-md-3">
        <div className="product-grid-item card">
        <div className="product-grid-item-content">
            <div className="product-name">{project.name}</div>
            <div className="product-description">{project.description}</div>
            <img src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt='pic here'></img>
            </div>
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span>                      {
                  project.tags.map((tag, index) => (
                      <Chip key={index} label={tag} />
                  ))
                }
              </span>
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

  return (
    <div className="dataview-demo">
      <div className="card">
          <DataView
            value={projects}
            layout={layout}
            itemTemplate={itemTemplate}
            paginator rows={9}
            emptyMessage='No Records Found'
            //sortOrder={sortOrder}
            //sortField={sortField}
          />
      </div>
    </div>
)
}

export default ProjectList