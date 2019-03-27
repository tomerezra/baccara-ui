import React, { Component } from 'react';
import {Route, Switch ,withRouter} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AcountPage from "./pages/AcountPage";
import BuildItemPage from "./pages/BuildItemPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MakeOrderPage from './pages/CreateOrderPage';
import NewShippingPage from './pages/NewShippingPage';

import Footer from './components/Footer';
import SearchNavbar from "./components/SearchNavbar"
import ItemsPage from './pages/ItemsPage';
import ShippingPage from './pages/ShippingPage';
import OrdersPage from './pages/OrdersPage';
import initReactFastclick from 'react-fastclick';


class App extends Component{
 
  
  render(){
    initReactFastclick();
    return (
      <>
        
        <SearchNavbar/>
        <div style={{paddingBottom:'15%',paddingTop:'20%'}}>
        
          
          
          <Switch>
            <Route path='/' exact component={LoginPage}/> 
            <Route path='/signup' exact component={SignUpPage}/>
            <Route path='/acount' exact component={AcountPage}/>
            <Route path='/builditem' exact component={BuildItemPage}/>
            <Route path='/orders' exact component={OrdersPage}/>
            <Route path='/items' exact component={ItemsPage}/>
            <Route path='/shipping' exact component={ShippingPage}/>
            <Route path='/orderdetails/:id' exact component={OrderDetailsPage}/> 
            <Route path='/createorder/:id' exact component={MakeOrderPage}/>
            <Route path='/newshipping' exact component={NewShippingPage}/>  
          </Switch>
        </div>
        
        <Footer/>
      </>
);
  }
    
  }


export default withRouter(App) ;
