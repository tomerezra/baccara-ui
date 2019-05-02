import React, { Component } from 'react';
import {Route, Switch ,withRouter} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AcountPage from "./pages/AcountPage";
import BuildItemPage from "./pages/BuildItemPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CreateOrderPage from './pages/CreateOrderPage';
import NewShippingPage from './pages/NewShippingPage';
import posed, { PoseGroup } from 'react-pose';
import Footer from './components/Footer';
import SearchNavbar from "./components/SearchNavbar"
import ItemsPage from './pages/ItemsPage';
import ShippingPage from './pages/ShippingPage';
import OrdersPage from './pages/OrdersPage';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 120, beforeChildren: true },
  exit: { opacity: 0 }
});

const App=()=> (

   
      <>
        
        <SearchNavbar/>
        <Route
          render={({ location }) => (
            <div style={{paddingBottom:'15%',paddingTop:'20%'}}>
        
              <PoseGroup>
                  <RouteContainer key={location.pathname}>
                
                    <Switch location={location}>
                      <Route path='/createorder/:id' exact component={CreateOrderPage} key='createorder'/>
                      <Route path='/newaddress/:id' exact component={NewShippingPage} key='newshiiping'/>  
                      <Route path='/orderdetails/:id' exact component={OrderDetailsPage} key='orderdetails'/> 
                      <Route path='/builditem' exact component={BuildItemPage} key='builditem'/>
                      <Route path='/orders' exact component={OrdersPage} key='orders'/>
                      <Route path='/items' exact component={ItemsPage} key='items'/>
                      <Route path='/shipping' exact component={ShippingPage} key='shipping'/>
                      <Route path='/signup' exact component={SignUpPage} key='signup'/>
                      <Route path='/acount' exact component={AcountPage} key='acount'/>
                      <Route path='/' exact component={LoginPage} key='login'/>
                      
                      
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
            </div>
          )}
        />
        <Footer/>
      </>

)
    
  

export default withRouter(App)
