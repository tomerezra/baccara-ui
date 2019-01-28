import React, { Component } from 'react'
import AcountForm from '../forms/AcountForm';
import {withRouter} from 'react-router-dom'
class AcountPage extends Component {
  render() {
    return (
      
        <AcountForm/>
      
    )
  }
}
export default withRouter(AcountPage)
