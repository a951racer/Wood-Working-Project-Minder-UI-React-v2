import React, { Component } from 'react'
import MainNavigator from '../../Components/app/MainNavigator'

import './PageLayout.css'

const PageLayout = ({title, children}) => {

  return (
    <div id="main">
      <div className="container">
        <div className="header">
          <div className="nav">
            <MainNavigator />
          </div>
          <div className="brand">
            WoodworkX
          </div>
        </div>
        <div className="title">
          {title}
        </div>
        <div className="content">
          {children}
        </div>
        <div className="footer">
          A HobbsSquad Joint &copy; 2020
        </div>
      </div>
    </div>
  )
}

export default PageLayout
