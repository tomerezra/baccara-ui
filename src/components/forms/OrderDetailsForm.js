import React, { Component } from 'react'
import MobileCotainer from './MobileCotainer';
import {withRouter} from 'react-router-dom'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination, GridRow, Item } from 'semantic-ui-react'
import OrdersData from  '/Users/tomerezra/React/ui/src/data/ordersdata'
import swal from '@sweetalert/with-react';
class OrderDetailsForm extends Component {
    state={
        pagename:'',
        data:{},
        view:{},
        id:""
    }
    componentDidMount(){
        
        const id = this.props.match.params.id
        this.setState({id})
        const data=OrdersData[id-1]
        this.setState({data})
        this.setState({pagename:"Order Number-" +data.ordernumber})
        const view = data.items.map(item=><Item content={item}/>)
        this.setState({view})
    }
    render() {
        
    return (
      <div style={{maxWidth: 450}}>
        {/* <MobileCotainer pagename={this.state.pagename}/> */}
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment size='mini' textAlign='center' >
                  <Grid columns={3} celled>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Date</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.date}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Name</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.name}</Grid.Column> 
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
                                                    <p>{this.state.view}</p>
                                                </div>
                                    
                                    
                                )}
                                content='View'>
                                </Button>
                        </Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>4</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Amount</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.amount}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>5</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Value</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.value}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Number</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.ordernumber}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Status</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{this.state.data.status}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Description</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'></Grid.Column> 
                    </Grid.Row>
                            
                  </Grid>
                  <Button
                    onClick={()=>{this.props.history.push('/createorder/'+this.state.orderid)}}
                    
                    content='Clone'
                    color='linkedin'
                    size='small'>
                  </Button>
                  {/* <Button
                  
                  size='small'
                  content='Back'
                  onClick={()=>{this.props.history.goBack()}}>
                  </Button>  */}
                  
              </Segment>
      </div>
    )
  }
}
export default withRouter(OrderDetailsForm)