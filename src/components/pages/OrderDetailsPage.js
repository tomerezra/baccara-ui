import React, { Component } from 'react'
import OrderDetailsForm from '../forms/OrderDetailsForm';
import {withRouter} from 'react-router-dom'
class OrderDetailsPage extends Component {
  render() {
    return (
      <div>
        <OrderDetailsForm/>
      </div>
    )
  }
}
export default withRouter(OrderDetailsPage)