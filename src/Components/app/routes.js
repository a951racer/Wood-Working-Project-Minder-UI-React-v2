import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import useAuth from '../../providers/auth/hook'

import AuthPage from '../../Pages/Auth/AuthPage'
import ProjectsPage from '../../Pages/Projects/ProjectsPage'
import ProjectDetailsPage from '../../Pages/Projects/ProjectDetailsPage'
import JobsPage from '../../Pages/Jobs/JobsPage'
import JobDetailsPage from '../../Pages/Jobs/JobDetailsPage'
import ProfilePage from '../../Pages/Profile/ProfilePage'
import LibraryPage from '../../Pages/Library/LibraryPage'
import LibraryItemPage from '../../Pages/Library/LibraryItemPage'

export default function Routes () {
  const { getUserStatus } = useAuth()

  return (
    <Switch>
      {getUserStatus === 'loggedOut' && <Route path="/auth" component={AuthPage} />}
      {getUserStatus === 'loggedOut' && <Redirect to="/auth" exact />}
      {getUserStatus === 'loggedIn' && <Redirect from="/" to="/projects" exact />}
      {getUserStatus === 'loggedIn' && <Redirect from="/auth" to="/projects" exact />}
      {<Route path="/projects" component={ProjectsPage} />}
      {<Route path="/project-details/:id" component={ProjectDetailsPage} />}
      {<Route path="/jobs" component={JobsPage} />}
      {<Route path="/job-details/:id" component={JobDetailsPage} />}
      {<Route path="/library" component={LibraryPage} />}
      {<Route path="/library-item/:id" component={LibraryItemPage} />}
      {<Route path="/profile" component={ProfilePage} />}
    </Switch>
  )
}