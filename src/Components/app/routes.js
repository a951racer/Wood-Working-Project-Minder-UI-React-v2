import React, { useEffect } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import useToken from '../../providers/token/hook'

import AuthPage from '../../Pages/Auth/AuthPage'
import ProjectsPage from '../../Pages/Projects/ProjectsPage'
import ProjectDetailsPage from '../../Pages/Projects/ProjectDetails'
//import ProfilePage from '../../Pages/Profile'


export default function Routes () {
  const { token, isLoggedIn } = useToken()

  return (
    <Switch>
      {isLoggedIn() && <Redirect from="/auth" to="/projects" exact />}
      {isLoggedIn() && <Redirect from="/" to="/projects" exact />}
      {!isLoggedIn() && <Route path="/auth" component={AuthPage} />}
      {!isLoggedIn() && <Redirect to="/auth" exact />}
      {<Route path="/projects" component={ProjectsPage} />}
      {<Route path="/project-details/:id" component={ProjectDetailsPage} />}
    </Switch>
  )
}