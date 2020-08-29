import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import { hot } from "react-hot-loader";

import './Components/app/Assets/wwpm-theme/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

//import Routes from './Components/app/Routes'
import Routes from '../src/Components/app/Routes.js'
import './App.css'

import TokenProvider from "./providers/token/provider"
import AuthProvider from "./providers/auth/provider"
import FetchProvider from "./providers/fetch/provider"
import ProjectsProvider from "./providers/projects/provider"

const App = () => {
  //const { isLoggedIn } = useToken()
  
  return (
    <BrowserRouter>
      <TokenProvider>
        <FetchProvider>
          <AuthProvider>
            <ProjectsProvider>
                <Routes />
            </ProjectsProvider>
          </AuthProvider>
        </FetchProvider>
      </TokenProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App)