import React, { Component } from 'react'
import OrderDetailsForm from '../components/forms/OrderDetailsForm';
import {withRouter} from 'react-router-dom'
class OrderDetailsPage extends Component {
  render() {
    return (
      
        <OrderDetailsForm/>
      
    )
  }
}
export default withRouter(OrderDetailsPage)