import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AcountPage from "./components/pages/AcountPage";
import OrderPage from "./components/pages/OrderPage";
import OrderHistoryPage from "./components/pages/OrderHistoryPage";
import OrderDetailsPage from "./components/pages/OrderDetailsPage";
import PropTypes from 'prop-types'

class App extends Component{
  
  render(){
    return (
      
      
      <div> 
        <Route path='/' exact component={HomePage}/>
        <Route path='/login' exact component={LoginPage}/> 
        <Route path='/signup' exact component={SignUpPage}/>
        <Route path='/acount' exact component={AcountPage}/>
        <Route path='/order' exact component={OrderPage}/>
        <Route path='/history' exact component={OrderHistoryPage}/>
        <Route path='/orderdetails' exact component={OrderDetailsPage}/> 
         
      </div>
    
);
  }
    
  }


export default withRouter(App) ;
