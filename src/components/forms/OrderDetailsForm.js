import React, { Component } from 'react'
import MobileCotainer from './MobileCotainer';
import {withRouter} from 'react-router-dom'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination, GridRow } from 'semantic-ui-react'
class OrderDetailsForm extends Component {
  state={
    
      page:'Order Details'
  }
    render() {
        
    return (
      <div>
        <MobileCotainer name={this.state.page}/>
        <Segment size='mini' textAlign='center'>
                  <Grid columns={3} celled>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Date</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>05.04.20018</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Name</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>Tomer Ezra</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>3</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Items</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>GEA-134a5793</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>4</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Amount</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>100</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>5</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Value</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>1500$</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Order Number</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>143275</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Status</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>Aprrov</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Description</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'></Grid.Column> 
                    </Grid.Row>
                            
                  </Grid>
                  <Button
                  color='instagram'
                  onClick={()=>{this.props.history.push('/history')}}>
                  Beck</Button> 
              </Segment>
      </div>
    )
  }
}
export default withRouter(OrderDetailsForm)