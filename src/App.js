import React, { Component } from 'react';
import {Route, Switch ,withRouter} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AcountPage from "./pages/AcountPage";
import BuildItemPage from "./pages/BuildItemPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CreateOrderPage from './pages/CreateOrderPage';
import NewShippingPage from './pages/NewShippingPage';

import Footer from './components/Footer';
import SearchNavbar from "./components/SearchNavbar"
import ItemsPage from './pages/ItemsPage';
import ShippingPage from './pages/ShippingPage';
import OrdersPage from './pages/OrdersPage';


class App extends Component{
 
  
  render(){
    
    return (
      <>
        
        <SearchNavbar/>
        <div style={{paddingBottom:'15%',paddingTop:'20%'}}>
        
          
          
          <Switch>
            <Route path='/createorder/:id' exact component={CreateOrderPage}/>
            <Route path='/newaddress/:id' exact component={NewShippingPage}/>  
            <Route path='/orderdetails/:id' exact component={OrderDetailsPage}/> 
            <Route path='/builditem' exact component={BuildItemPage}/>
            <Route path='/orders' exact component={OrdersPage}/>
            <Route path='/items' exact component={ItemsPage}/>
            <Route path='/shipping' exact component={ShippingPage}/>
            <Route path='/signup' exact component={SignUpPage}/>
            <Route path='/acount' exact component={AcountPage}/>
            <Route path='/' exact component={LoginPage}/>
            
            
          </Switch>
        </div>
        
        <Footer/>
      </>
);
  }
    
  }

export default withRouter(App)
