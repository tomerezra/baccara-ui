import React, { Component } from 'react'
import HistoryForm from '../forms/HistoryForm';
import {withRouter} from 'react-router-dom'
class OrdersPage extends Component {
  
  render() {
    return (
      
        <HistoryForm pagename='orders'/>
        
      
    )
  }
}
export default withRouter(OrdersPage)