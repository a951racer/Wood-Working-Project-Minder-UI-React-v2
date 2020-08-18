import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import useToken from '../../providers/token/hook'

import AuthPage from '../../Pages/Auth'
//import ProjectsPage from '../../Pages/Projects'
//import ProjectDetailsPage from '../../Pages/ProjectDetails'
//import ProfilePage from '../../Pages/Profile'


export default function Routes () {
  const { getToken } = useToken()
  const token = getToken()
  console.log("HERE: ", token)
  
  return (
  <Switch>
    {token && <Redirect from="/auth" to="/projects" exact />}
    {!token && <Route path="/auth"><AuthPage/></Route>}
    {!token && <Redirect to="/auth" exact />}
  </Switch>
  )
}

//export default Routes
