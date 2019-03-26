import React, { Component } from 'react'
import NewShippingForm from '../components/forms/NewShippingForm';
import {withRouter} from 'react-router-dom'
export class NewShippingPage extends Component {
  render() {
    return (
      
        <NewShippingForm/>
      
    )
  }
}

export default withRouter(NewShippingPage)
