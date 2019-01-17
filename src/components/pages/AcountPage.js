import React, { Component } from 'react'
import AcountForm from '../forms/AcountForm';
import {withRouter} from 'react-router-dom'
class AcountPage extends Component {
  render() {
    return (
      <div>
        <AcountForm/>
      </div>
    )
  }
}
export default withRouter(AcountPage)
