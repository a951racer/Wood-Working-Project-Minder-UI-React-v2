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
      label:'Projects',
      icon: 'pi pi-fw pi-folder-open',
      path: '/projects'
    },
    {
      label:'Jobs',
      icon: 'pi pi-fw pi-folder-open',
      path: '/jobs'
    },
    {
      label:'Library',
      icon: 'pi pi-fw pi-user-edit',
      path: '/library'
    },
    {
      label:'Profile',
      icon: 'pi pi-fw pi-user-edit',
      path: '/profile'
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
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
                    <i className={item.icon} />{item.label}
                  </div>
                )
              })
            }
       </Router>
    </React.Fragment>
    )
}

export default MainNavigator
