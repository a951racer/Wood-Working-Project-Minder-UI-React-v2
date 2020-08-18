import React, { Component} from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import './Components/app/Assets/wwpm-theme/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Routes from './Components/app/routes'

import { BrowserRouter } from "react-router-dom";
import TokenProvider from "./providers/token/provider";


const App = () => {
  return (
    <TokenProvider>
      <BrowserRouter>
        <>
          <Routes />
        </>    
      </BrowserRouter>
    </TokenProvider>
    )
}

export default hot(module)(App)