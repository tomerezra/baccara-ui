import React, { Component } from 'react'
import BuildItemForm from '../forms/BuildItemForm';
import {withRouter} from 'react-router-dom'
import BuildItemFormTest from '../forms/BuildItemFormTest';
class BuildItemPage extends Component {
  render() {
    return (
      
       // <BuildItemForm/>
        <BuildItemFormTest/>
      
    )
  }
}
export default withRouter(BuildItemPage)