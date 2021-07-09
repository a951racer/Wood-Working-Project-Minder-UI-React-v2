import React, { useState } from 'react'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating'
import { ScrollPanel } from 'primereact/scrollpanel';

import 'primeflex/primeflex.css';

import Chip from '../app/Chip/Chip'

import ProjectListItem from './ProjectListItem'

const ProjectList = ({projects}) => {
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  
  const renderListItem = (project) => {
    return (
        <div className="p-col-12">
            <div className="product-list-item">
                <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here'></img>
                <div className="product-list-detail">
                    <div className="product-name">{project.name}</div>
                    <div className="product-description">{project.description}</div>
                    <Rating value={project.rating} readOnly cancel={false}></Rating>
                    <i className="pi pi-tag product-category-icon"></i>
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
    );
  }

  const renderGridItem = (project) => {
    return (
      <div className="p-col-12 p-md-3">
        <div className="product-grid-item card">
        <div className="product-grid-item-content">
            <div className="product-name">{project.name}</div>
            <div className="product-description">{project.description}</div>
            <img className='p-shadow-7' src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} onError={(e) => e.target.src='https://wwpm-files.s3.us-west-2.amazonaws.com/images/Default+Project+Pic.png'} alt='pic here'></img>
            </div>
            <div>
              <i className="pi pi-tag product-category-icon"></i>
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
    <ScrollPanel >
      <div className="dataview-demo">
        <div className="card">
            <DataView
              value={projects}
              layout='list'
              itemTemplate={itemTemplate}
              paginator rows={9}
              emptyMessage='No Records Found'
              //sortOrder={sortOrder}
              //sortField={sortField}
            />
        </div>
      </div>
    </ScrollPanel>
)
}

export default ProjectList