import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom'

import useAuth from '../../../providers/auth/hook'
import './MainNavigator.css';


const MainNavigator = () => {
  const [redirect, setRedirect] = useState()
  const [redirectTo, setRedirectTo] =  useState()
  const [showMenu, setShowMenu] = useState()
  const { logout } =  useAuth()

  const location = useLocation()

  const items = [
    {
      label:'Catalog',
      icon: 'auto_stories',
      path: '/projects'
    },
    {
      label:'Jobs',
      icon: 'assignment',
      path: '/jobs'
    },
    {
      label:'Library',
      icon: 'collections',
      path: '/library'
    },
    {
      label:'Profile',
      icon: 'settings',
      path: '/profile'
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'logout',
      command: () => logout()
    }
  ]

  const handleClick = (match, page) => {
    if (match) {
      setRedirect(true)
      setRedirectTo(page)
    }
  }

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  }
  return (
    <React.Fragment>
        <Router>
            {
              items.map((item, index) => {
                return (
                  item.separator ? 
                    <div className='menu-separator' key={index}></div>
                  :
                  <div className={location.pathname === item.path ? 'menu-selected' : 'menu-item'} key={index} onClick={item.command ? item.command : () => handleClick(true, item.path)}>
                    <span className="material-icons menu-icon">{item.icon}</span>
                    {item.label}
                  </div>
                )
              })
            }
       </Router>
    </React.Fragment>
    )
}

export default MainNavigator
