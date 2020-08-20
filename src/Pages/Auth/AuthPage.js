import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import useAuth from '../../providers/auth/hook'
import './AuthPage.css'
import logo from '../../Components/app/Assets/logo.png'

const AuthPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  function submitHandler (event) {
    event.preventDefault()

    if (username.trim().length === 0 || password.trim().length === 0) {
      return
    }
    console.log("creds: ", username, password)
    login(username, password)
  }

  const footer = <span style={{textAlign: 'center'}}><h2><i>Woodworking Project Minder</i></h2></span>

  return (
    <>
      <div className="login-container">
        <div className="login-header"></div>
        <div className="login-main">
            <Card>
              <div className="login-form-wrapper">
                <div className="login-form-logo">
                  <Card footer={footer}>
                    <img src={logo} alt="Woodworking Project Minder"/>
                  </Card>
                </div>
                <div className="login-form">
                  <div style={{fontSize: '1.5em', marginBottom: '5px'}}>Username:</div>
                  <div>
                    <InputText
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div style={{marginBottom: '1em'}}>
                  <div style={{fontSize: '1.5em', marginBottom: '5px', marginTop: '10px'}}>Password:</div>
                    <Password value={password} feedback={false} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div>
                    <Button label="Login" icon="pi pi-sign-in" iconPos="right" onClick={submitHandler}/>
                  </div>
                </div>
              </div>
            </Card>
        </div>
        <div className="aside aside-1"></div>
        <div className="aside aside-2"></div>
        </div>
    </>
  )
}

export default AuthPage
