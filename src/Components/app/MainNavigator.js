import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Menu } from 'primereact/menu'

import useAuth from '../../providers/auth/hook'
import './MainNavigator.css';


const MainNavigator = () => {
  const [redirect, setRedirect] = useState()
  const [redirectTo, setRedirectTo] =  useState()
  const [showMenu, setShowMenu] = useState()
  const { logout } =  useAuth()

  const items = [
    {
      label:'Projects',
      icon: 'pi pi-fw pi-folder-open',
      command: () => handleClick(true, '/projects')
    },
    {
      label:'Profile',
      icon: 'pi pi-fw pi-user-edit',
      command: () => handleClick(true, '/profile')
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

  let menu = React.createRef()

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
      <button className="menu-button" onClick={(event) => menu.toggle(event)}>{<i className="pi pi-bars"></i> }</button>
        <Router>
          <Menu model={items} popup={true} ref={el => menu = el} id="popup_menu"/>
        </Router>
    </React.Fragment>
    )
}

export default MainNavigator