import React, { Component } from 'react'
import OrderHistoryForm from '../forms/OrderHistoryForm';
import {withRouter} from 'react-router-dom'
class OrderHistoryPage extends Component {
  render() {
    return (
      <div>
        <OrderHistoryForm/>
      </div>
    )
  }
}
export default withRouter(OrderHistoryPage)