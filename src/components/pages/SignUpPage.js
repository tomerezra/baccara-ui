import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import SignUpForm from '../forms/SignUpForm';

class SignUpPage extends Component {
  state={}
  

  render() {
    return (
        <SignUpForm/>
    )
  }
}
export default withRouter(SignUpPage)