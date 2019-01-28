import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import HomePageForm from '../forms/HomePageForm';

 class HomePage extends Component {
  
  render() {
    return (
      
        <HomePageForm/>
        
      
    )
  }
}
export default withRouter(HomePage)