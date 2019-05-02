import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import LoginForm from "../components/forms/LoginForm";


class LoginPage extends Component {
    
    render() {
    return (
      

        <LoginForm/>
      
    )
  }
}

export default withRouter(LoginPage) 

