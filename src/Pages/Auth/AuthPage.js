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

  async function submitHandler (event) {
    event.preventDefault()

    if (username.trim().length === 0 || password.trim().length === 0) {
      return
    }
    await login(username, password)
  }

  const footer = <span style={{textAlign: 'center'}}><h2><i>WoodworkX</i></h2></span>

  return (
    <>
      <div className="parent">
        <div className="div1"></div>
        <div className="div2"></div>
        <div className="div3">
            <Card>
              <div className="login-form-wrapper">
                <div className="login-form-logo">
                  <Card footer={footer}>
                    <img src={logo} alt="WoodworkX"/>
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
        <div className="div3"></div>
        <div className="div4"></div>
      </div>
    </>
  )
}

export default AuthPage
