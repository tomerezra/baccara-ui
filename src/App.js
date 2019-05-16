import React from 'react';
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
// import SearchNavbar from "./components/SearchNavbar"
import ItemsPage from './pages/ItemsPage';
import ShippingPage from './pages/ShippingPage';
import OrdersPage from './pages/OrdersPage';
import WelcomePage from './pages/WelcomePage';
import '../src/styles.css'
import TopBar from './components/TopBar';
const RouteContainer = posed.div({
  
  enter: { opacity: 1, delay: 100},
  exit: { opacity: 0 }
});

function App(){

   return(
      <>
        
        <TopBar/>
        <div className='appcontainer'>
          <Route render={({location})=>(
            <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch location={location}>
                      <Route path='/createorder/:id' exact component={CreateOrderPage}/>
                      <Route path='/newaddress/:id' exact component={NewShippingPage}/>  
                      <Route path='/orderdetails/:id' exact component={OrderDetailsPage}/> 
                      <Route path='/builditem' exact component={BuildItemPage}/>
                      <Route path='/orders' exact component={OrdersPage}/>
                      <Route path='/items' exact component={ItemsPage}/>
                      <Route path='/shipping' exact component={ShippingPage}/>
                      <Route path='/signup' exact component={SignUpPage}/>
                      <Route path='/acount' exact component={AcountPage}/>
                      <Route path='/login' exact component={LoginPage}/>
                      <Route path='/' exact component={WelcomePage}/>
                    </Switch>
                  </RouteContainer>
            </PoseGroup>
          )}/>
        </div>
        <Footer/>
      </>
   )
  }
    
  

export default withRouter(App)
