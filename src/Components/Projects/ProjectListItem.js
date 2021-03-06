import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Card } from 'primereact/card';

import Chip from '../app/Chip/Chip'
import './Projects.css'

const ProjectListItem = ({project}) => {
  const [redirect, setRedirect] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

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
      <div onClick={() => clickHandler(project._id)}>
        <Card
          id={project._id}
          title={project.name}
        >
          <div className='tags'>
            {
              project.tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
              ))
            }
          </div>
          <div className="project-image">
            <img className="thumbnail" src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + project._id + '.png'} alt='pic here'></img>
          </div>
          <div className="project-category">
            
          </div>
          <div className="project-description">
            {project.description}
          </div>
        </Card>
      </div>
      </Router>
      <br />
    </>
  )
}

export default ProjectListItem
