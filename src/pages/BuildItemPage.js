import React, { Component } from 'react'

import {withRouter} from 'react-router-dom'
import BuildItemFormTest from '../components/forms/BuildItemForm';
class BuildItemPage extends Component {
  render() {
    return (
      
       // <BuildItemForm/>
        <BuildItemFormTest/>
      
    )
  }
}
export default withRouter(BuildItemPage)