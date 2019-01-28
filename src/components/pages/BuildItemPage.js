import React, { Component } from 'react'
import BuildItemForm from '../forms/BuildItemForm';
import {withRouter} from 'react-router-dom'
class BuildItemPage extends Component {
  render() {
    return (
      
        <BuildItemForm/>
      
    )
  }
}
export default withRouter(BuildItemPage)