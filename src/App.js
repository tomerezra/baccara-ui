import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch ,withRouter} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AcountPage from "./components/pages/AcountPage";
import BuildItemPage from "./components/pages/BuildItemPage";

import OrderDetailsPage from "./components/pages/OrderDetailsPage";
import MakeOrderPage from './components/pages/CreateOrderPage';
import NewShippingPage from './components/pages/NewShippingPage';
import Footer from './components/forms/Footer';
import MobileCotainer from './components/forms/MobileCotainer';
import Navbar from './components/forms/Navbar';
import Footer2 from './components/forms/Footer2';
import PrimarySearchAppBar from "./components/forms/Navbar2"
import ItemsPage from './components/pages/ItemsPage';
import ShippingPage from './components/pages/ShippingPage';
import OrdersPage from './components/pages/OrdersPage';
import disableScroll from 'disable-scroll';

class App extends Component{
 
  
  render(){
    
    disableScroll.options.disableWheel=false;
    disableScroll.on()
    return (
      <>
        {/* <Navbar/> */}
        <PrimarySearchAppBar/>
        <div style={{paddingBottom:'15%',paddingTop:'20%'}}>
        
          
          {/* <Route path='/' exact component={HomePage}/> */}
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
        {/* <Footer/> */}
        <Footer2/>
      </>
);
  }
    
  }


export default withRouter(App) ;
