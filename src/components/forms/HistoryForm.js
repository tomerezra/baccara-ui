import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, RouterContext } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Item,
  Input
} from 'semantic-ui-react'
import MobileCotainer from './MobileCotainer';
import OrdersData from  '/Users/tomerezra/React/ui/src/data/ordersdata'
import ItemsData from  '/Users/tomerezra/React/ui/src/data/itemsdata'
import CardComponent from '../CardComponent';
import ShippingData from '/Users/tomerezra/React/ui/src/data/shippingdata'

class HistoryForm extends Component{
   state={
       pagename:'',
       data:[],
       
   }
   componentDidMount(){
        const name= this.props.pagename
        console.log(name)
        if (name==='orders') {
            this.setState({pagename:'My Orders'})
            const orders= OrdersData.map(order => <CardComponent order={order} type={name}/>)
            this.setState({data:orders})  
        }
        else if (name==='items') {
            this.setState({pagename:'My Items'})
            const items= ItemsData.map(item => <CardComponent item={item} type={name}/>)
            this.setState({data:items})
        }
        else if (name==='shipping') {
            this.setState({pagename:'My Addresses'})
            const addresses= ShippingData.map(address => <CardComponent address={address} type={name}/>)
            this.setState({data:addresses})
        }
    }
    
  
  handleClick=()=>{
    if (this.state.pagename==='My Orders') {
        this.props.history.push('/createorder/0')
    }
    if (this.state.pagename==='My Items') {
        this.props.history.push('/builditem')
    }
    if (this.state.pagename==='My Addresses') {
        this.props.history.push('/newshipping')
    }
  }
  render(){
      return(
          <div style={{maxWidth: 450}}>
              {/* <MobileCotainer pagename={this.state.pagename}/> */}
              <Header textAlign='center'>{this.state.pagename}</Header>
                <Segment textAlign='center' >
                
                    <Grid verticalAlign='top' columns={1} centered>
                    {/* <Grid.Row>
                        <Grid.Column>
                            <Input 
                                icon='search' 
                                fluid 
                                placeholder='Search...' 
                                onChange={()=>{}}/>
                        </Grid.Column>
                        
                    </Grid.Row> */}
                    <Grid.Row>
                        <Grid.Column>
                            {this.state.data}
                        
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
                {/* <br/>
                <Button
                  content='New'
                  color='linkedin'
                  
                  onClick={()=>{this.handleClick()}}>
                </Button>
                <Button
                  
                  content='Back'
                  onClick={()=>{this.props.history.goBack()}}>
                </Button> */}
                
            </Segment>
          </div>
      )
  }
    
    

}
export default withRouter(HistoryForm) 