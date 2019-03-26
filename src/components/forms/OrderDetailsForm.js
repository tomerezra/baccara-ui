import React, { Component } from 'react'
import MobileCotainer from './MobileCotainer';
import {withRouter} from 'react-router-dom'
import {Responsive, Loader,Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination, GridRow, Item } from 'semantic-ui-react'
import moment from 'moment'
import Data from '../../data/data'
import swal from '@sweetalert/with-react';
import {Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import { connect } from 'react-redux'
class OrderDetailsForm extends Component {
    state={
        pagename:'Order Detiles',
        data:{},
        view:{},
        id:""
    }
    componentDidMount(){
        
        
    }

    reload=()=>{
        const id = this.props.match.params.id
        const tmp=this.props.data.orders.filter(order=>id===order.id)
        const data = tmp[0]
        
        const view = data.orderitems.map(item=><Item>Serial: {item.serial} Quantity: {item.quantity}</Item>)
        
        return(
            <Grid columns={3} celled>
            <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Date</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{moment(data.createdAt.toDate()).calendar()}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Name</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.firstname} {data.lastname}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>3</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Items</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>
                            <Button 
                                color='linkedin' 
                                size='mini'
                                compact
                                onClick={()=>swal(
                                                <div>
                                                    <h1>Items:</h1>
                                                    <p>{view}</p>
                                                </div>
                                    
                                    
                                )}
                                content='View'>
                                </Button>
                        </Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Number</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.id}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Status</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.status}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Description</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>something</Grid.Column> 
                    </Grid.Row>
                    </Grid>
        )

    }
    isEmptyObject=(obj)=>{
        return (Object.getOwnPropertyNames(obj).length === 3);
    }
    render() {
    const {auth}=this.props
    const data = this.state.data
    
    if (!auth.uid) {return <Redirect to='/'/>}
    if (this.isEmptyObject(this.props.data)) {
        
    return (
      <div style={{maxWidth: 450}}>
        {/* <MobileCotainer pagename={this.state.pagename}/> */}
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment size='mini' textAlign='center' >
                  {this.reload()}
                  <Button
                    onClick={()=>{this.props.history.push('/createorder/'+this.state.orderid)}}
                    
                    content='Clone'
                    color='linkedin'
                    size='small'>
                  </Button>
                  
              </Segment>
      </div>
    )
  }else {
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

export default withRouter(compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:'orders'}])
  )(OrderDetailsForm))