import React, { Component } from 'react'

import {withRouter} from 'react-router-dom'
import BuildItemForm from '../components/forms/BuildItemForm';
class BuildItemPage extends Component {
  render() {
    return (
      
       <BuildItemForm/>
        
      
    )
  }
}
export default withRouter(BuildItemPage)