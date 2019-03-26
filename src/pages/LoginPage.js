import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import LoginForm from "../components/forms/LoginForm";


class LoginPage extends Component {
    submit=(data)=>{
       console.log(data)
    }
    render() {
    return (
      

        <LoginForm submit={this.submit}/>
      
    )
  }
}

export default withRouter(LoginPage) 

