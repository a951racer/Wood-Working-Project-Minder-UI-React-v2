import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import useAuth from '../../providers/auth/hook'

import AuthPage from '../../Pages/Auth/AuthPage'
import ProjectsPage from '../../Pages/Projects/ProjectsPage'
import ProjectDetailsPage from '../../Pages/Projects/ProjectDetails'
//import ProfilePage from '../../Pages/Profile'


export default function Routes () {
  const { userStatus } = useAuth()

  return (
    <Switch>
      {userStatus === 'loggedIn' && <Redirect from="/auth" to="/projects" exact />}
      {userStatus === 'loggedIn' && <Redirect from="/" to="/projects" exact />}
      {userStatus === 'loggedOut' && <Route path="/auth" component={AuthPage} />}
      {userStatus === 'loggedOut' && <Redirect to="/auth" exact />}
      {<Route path="/projects" component={ProjectsPage} />}
      {<Route path="/project-details/:id" component={ProjectDetailsPage} />}
    </Switch>
  )
}