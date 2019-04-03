
import React, { Component } from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import {Grid,Header,Loader,Segment} from 'semantic-ui-react'
import {createAddress,createItem,createOrder,deleteAddress,deleteItem,standard} from '../../store/actions/dataActions'
import { connect } from 'react-redux'
import CardComponent from '../CardComponent';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import Axios from 'axios';

class HistoryForm extends Component{
   state={
       pagename:'',
       addresses:[],
       items:[],
       orders:[]
       
       
   }
   componentDidMount(){
     
        Axios.get('http://localhost:49699/api/Address')
          .then(res=>this.setState({addresses:res.data}))
        // Axios.get('http://localhost:49699/api/Item')
        //   .then(res=>this.setState({items:res.data}))
        // Axios.get('http://localhost:49699/api/Order')
        //   .then(res=>this.setState({orders:res.data}))
        const name= this.props.pagename
        // tree.map((item)=>{this.props.standard(item)})
        if (name==='orders') {
            this.setState({pagename:'My Orders'})
        }
        else if (name==='items') {
            this.setState({pagename:'My Items'})
        }
        else if (name==='shipping') {
          this.setState({pagename:'My Addresses'})
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

  tmp =()=>{
    const {auth,data} = this.props
    const {items,addresses,orders}=this.state
      if (this.props.pagename==='orders') {
        var tmp = data.orders.filter(order=>auth.email===order.Email)
        if (tmp.length>0) {
          return(
            tmp.map(order => <CardComponent order={order}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have orders</div>)
        }
        
      }
      else if (this.props.pagename==='items') {
        var tmp = data.items.filter(item=>auth.email===item.Email)
        if (tmp.length>0) {
          return(
            tmp.map(item => <CardComponent item={item} delete={this.props.deleteItem}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have items</div>)
        }
       
      }
      else if (this.props.pagename==='shipping') {
        var tmp = addresses.filter(address=>auth.email===address.Email)
        
        if (tmp.length>0) {
          return(
            tmp.map(address => <CardComponent address={address} delete={this.props.deleteAddress}/>)
          )  
        } else {
          return(<div style={{textAlign:'center'}}>You don't have addresses</div>)
        }

      }
    } 
    
    isEmptyObject=(obj)=>{
      return (Object.getOwnPropertyNames(obj).length === 0);
    }
  render(){
    const {auth}=this.props
    
    if (!auth.uid) {return <Redirect to='/'/>}
    if (!this.isEmptyObject(this.props.data)) {
      return(
        <div style={{maxWidth: 450}}>
            
            <Header textAlign='center'>{this.state.pagename}</Header>
              <Segment textAlign='center' >
                  <Grid verticalAlign='top' columns={1} centered>
                  <Grid.Row>
                      <Grid.Column>
                        {this.tmp()}
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
        </div>
    )
    } else {
      return(
        <Loader active inline='centered'></Loader>
      )
    }  
    
  }
} 

const mapStateToProps = (state) => {
  
  return{
    auth:state.firebase.auth,
    data:state.firestore.ordered
  }
   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createItem:(item)=>dispatch(createItem(item)),
        createOrder:(order)=>dispatch(createOrder(order)),
        createAddress:(address)=>dispatch(createAddress(address)),
        deleteItem:(item)=>dispatch(deleteItem(item)),
        standard:(item)=>dispatch(standard(item)),
        deleteAddress:(address)=>dispatch(deleteAddress(address)),
    }
  }

export default withRouter(compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'addresses'},{collection:'items'},{collection:'orders'}])
)(HistoryForm)) 