import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import SignUpForm from '../forms/SignUpForm';

class SignUpPage extends Component {
 
  render() {
    return (
        <SignUpForm/>
    )
  }
}
export default withRouter(SignUpPage)