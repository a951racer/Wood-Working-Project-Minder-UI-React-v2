import React from "react";
import { BrowserRouter } from "react-router-dom"
import { hot } from "react-hot-loader";

import './Components/app/Assets/wwpm-theme/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

//import Routes from './Components/app/Routes'
import Routes from '../src/Components/app/routes.js'
import './App.css'

import TokenProvider from "./providers/token/provider"
import AuthProvider from "./providers/auth/provider"
import FetchProvider from "./providers/fetch/provider"
import ProjectsProvider from "./providers/projects/provider"
import FilesProvider from "./providers/files/provider";

const App = () => {
  
  return (
    <BrowserRouter>
      <TokenProvider>
        <FetchProvider>
          <AuthProvider>
            <FilesProvider>
              <ProjectsProvider>
                <Routes />
              </ProjectsProvider>
            </FilesProvider>
          </AuthProvider>
        </FetchProvider>
      </TokenProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App)