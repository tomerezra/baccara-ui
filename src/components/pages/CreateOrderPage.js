import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import CreateOrderForm from '../forms/CreateOrderForm';
export class CreateOrderPage extends Component {
  render() {
    return (
      
        <CreateOrderForm/>
      
    )
  }
}

export default withRouter(CreateOrderPage)
