import React, { Component } from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import {Grid,Header,Segment} from 'semantic-ui-react'
import {createAddress,createItem,createOrder,deleteAddress,deleteItem,getAddresses,getItems,getOrders} from '../../store/actions/dataActions'
import { connect } from 'react-redux'
import CardComponent from '../CardComponent';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'


class HistoryForm extends Component{
   state={
       pagename:'',

   }
   componentDidMount(){
             
        const name= this.props.pagename
        
        if (name==='orders') {
            this.setState({pagename:'My Orders'})
            this.props.getOrders()
        }
        else if (name==='items') {
            this.setState({pagename:'My Items'})
            this.props.getItems()
        }
        else if (name==='shipping') {
          this.setState({pagename:'My Addresses'})
          this.props.getAddresses()
        }
    }

  cards =()=>{
    
    const {items,addresses,orders}=this.props.data
      if (this.props.pagename==='orders') {
        
        if (orders.length>0) {
          return(
            orders.map(order => <CardComponent order={order}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have orders</div>)
        }
        
      }
      else if (this.props.pagename==='items') {
        
        if (items.length>0) {
          return(
            items.map(item => <CardComponent item={item} delete={this.props.deleteItem}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have items</div>)
        }
       
      }
      else if (this.props.pagename==='shipping') {
        
        
        if (addresses.length>0) {
          return(
            addresses.map(address => <CardComponent address={address} delete={this.props.deleteAddress}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have addresses</div>)
        }

      }
    } 
    
    
  render(){
    const {auth}=this.props
    
    if (auth.isEmpty) {return <Redirect to='/'/>}
    
      return(
        <div style={{maxWidth: 450}}>
            
            <Header textAlign='center'>{this.state.pagename}</Header>
              <Segment textAlign='center' >
                  <Grid verticalAlign='top' columns={1} centered>
                  <Grid.Row>
                      <Grid.Column>
                        {this.cards()}
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
        </div>
    )
    
    
  }
} 

const mapStateToProps = (state) => {
  
  return{
    auth:state.firebase.auth,
    data:state.data
  }
   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createItem:(item)=>dispatch(createItem(item)),
        createOrder:(order)=>dispatch(createOrder(order)),
        createAddress:(address)=>dispatch(createAddress(address)),
        deleteItem:(item)=>dispatch(deleteItem(item)),
        
        deleteAddress:(address)=>dispatch(deleteAddress(address)),
        getAddresses:()=>dispatch(getAddresses()),
        getItems:()=>dispatch(getItems()),
        getOrders:()=>dispatch(getOrders())
    }
  }

export default withRouter(compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'addresses'},{collection:'items'},{collection:'orders'}])
)(HistoryForm)) 