import React, { Component } from 'react'
import MainNavigator from '../app/Navigator/MainNavigator'
import Header from '../app/Header'
import Branding from '../app/Branding'

import './PageLayout.css'

const PageLayout = ({title, children}) => {

  return (
    <div className="container">
      <div className="Header-Bar"></div>
      <div className="Branding">
        <Branding />
      </div>
      <div className="Title">
        <Header title={title} />
      </div>
      <div className="Spacer"></div>
      <div className="Menu-Spacer"></div>
      <div className="Content-Spacer"></div>
      <div className="Menu">
        <div classname="Menu-Area">
          <MainNavigator />
        </div>
        <div className="Menu-Filler"></div>
      </div>
      <div className="Content">
        {children}
      </div>
      <div className="Footer">A HobbsSquad Joint &copy; 2021</div>
    </div>
  )
}

export default PageLayout
 