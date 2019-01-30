
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

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
import {createAddress,createItem,createOrder,deleteAddress,deleteItem,deleteOrder} from '../../store/actions/dataActions'
import { connect } from 'react-redux'

import CardComponent from '../CardComponent';

import data from '../../data/data'
class HistoryForm extends Component{
   state={
       pagename:'',
       data:[],
       
   }
   componentDidMount(){
        const name= this.props.pagename
        
        if (name==='orders') {
            this.setState({pagename:'My Orders'})
            const orders= data.orders.results.map(order => <CardComponent order={order}/>)
            this.setState({data:orders})  
        }
        else if (name==='items') {
            this.setState({pagename:'My Items'})
            const items= data.items.results.map(item => <CardComponent item={item} delete={this.props.deleteItem}/>)
            this.setState({data:items})
        }
        else if (name==='shipping') {
            this.setState({pagename:'My Addresses'})
            const addresses= data.shipping.results.map(address => <CardComponent address={address} delete={this.props.deleteAddress}/>)
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
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) =>{
    return{
        createItem:(item)=>dispatch(createItem(item)),
        createOrder:(order)=>dispatch(createOrder(order)),
        createAddress:(address)=>dispatch(createAddress(address)),
        deleteItem:(item)=>dispatch(deleteItem(item)),
        deleteOrder:(order)=>dispatch(deleteOrder(order)),
        deleteAddress:(address)=>dispatch(deleteAddress(address)),
    }
  }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HistoryForm)) 