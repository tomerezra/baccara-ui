import React, { Component } from 'react'
import OrderForm from '../forms/OrderForm';
import {withRouter} from 'react-router-dom'
class OrderPage extends Component {
  render() {
    return (
      <div>
        <OrderForm/>
      </div>
    )
  }
}
export default withRouter(OrderPage)