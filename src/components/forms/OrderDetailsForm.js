import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Grid, Header,Segment,Table } from 'semantic-ui-react'
// import moment from 'moment'
import swal from '@sweetalert/with-react';
import {Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import { connect } from 'react-redux'
class OrderDetailsForm extends Component {
    state={
        pagename:'Order Details',
        
    }
    
    reload=()=>{
        const {id} = this.props.match.params
        
        // eslint-disable-next-line eqeqeq
        const data=this.props.data.orders.find(order=>id==order.OrderId)
        
        
        const viewaddress =
        <>
                <Table.Row>
                    <Table.Cell>Full Name</Table.Cell>
                    <Table.Cell>{data.Address.FirstName} {data.Address.LastName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Company Name</Table.Cell>
                    <Table.Cell>{data.Address.CompanyName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>City</Table.Cell>
                    <Table.Cell>{data.Address.City}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>{data.Address.Adress}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Phone Number</Table.Cell>
                    <Table.Cell>{data.Address.PhoneNumber}</Table.Cell>
                </Table.Row>
        </>
                
        const viewitems = data.Part.map((item,i)=>{return(
            <Table.Row>
            <Table.Cell>{item}</Table.Cell>
            <Table.Cell>{data.Quantity[i]}</Table.Cell>
            </Table.Row>
        )})
        
        return(
            <Grid columns={3} celled>
            <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Date</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.OrderDate}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Address</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>
                        <Button 
                                color='linkedin' 
                                size='mini'
                                compact
                                onClick={()=>swal(
                                                <div>
                                                        <h2>Address</h2>
                                                        <Table celled unstackable compact fixed size='small'>
                                                        <Table.Header>
                                                            <Table.HeaderCell>Description</Table.HeaderCell>
                                                            <Table.HeaderCell>Details</Table.HeaderCell>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {viewaddress}
                                                        </Table.Body>
                                                        </Table>
                                                </div>
                                    
                                    
                                )}
                                content='View'>
                                </Button>
                        </Grid.Column> 
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
                                                        <h2>Items</h2>
                                                        <Table celled unstackable compact fixed size='small'>
                                                        <Table.Header>
                                                            <Table.HeaderCell>Serial</Table.HeaderCell>
                                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {viewitems}
                                                        </Table.Body>
                                                        </Table>
                                                </div>
                                    
                                    
                                )}
                                content='View'>
                                </Button>
                        </Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Number</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.OrderId}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Status</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.Status}</Grid.Column> 
                    </Grid.Row>
                    
                    </Grid>
        )

    }
    
    render() {
    const {auth}=this.props
       
    if (auth.isEmpty) {return <Redirect to='/login'/>}
            
    return (
      <>
        
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment size='mini' textAlign='center' >
                  {this.reload()}
                  <Button
                    onClick={()=>{this.props.history.push('/createorder/'+this.props.match.params.id)}}
                    
                    content='Clone'
                    color='linkedin'
                    size='small'>
                  </Button>
                  
              </Segment>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  
    return{
          
          auth:state.firebase.auth,
          
          data:state.data
      }
      
    }

export default withRouter(compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:'orders'}])
  )(OrderDetailsForm))