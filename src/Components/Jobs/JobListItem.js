import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Card } from 'primereact/card';

import Chip from '../app/Chip/Chip'
import './Jobs.css'

const JobListItem = ({job}) => {
  const [redirect, setRedirect] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

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
      <div onClick={() => clickHandler(job._id)}>
        <Card
          id={job._id}
          title={job.name}
        >
          <div className='tags'>
            {
              job.tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
              ))
            }
          </div>
          <div className="job-image">
            <img className="thumbnail" src={'https://wwpm-files.s3-us-west-2.amazonaws.com/images/' + job._id + '.png'} alt='pic here'></img>
          </div>
          <div className="job-category">
            
          </div>
          <div className="job-description">
            {job.description}
          </div>
        </Card>
      </div>
      </Router>
      <br />
    </>
  )
}

export default JobListItem
