import React, { Component } from 'react'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import logo from '../images/baccara.jpg'
import swal from 'sweetalert'
import MobileContainer from './MobileCotainer'
import {withRouter} from 'react-router-dom'
class OrderForm extends Component {
  state={
      data:{
        name:"GEM",  
        body:"1",
        port:"2a",
        function:"3",
        orifice:"1",
        seals:"5",
        override:"6",
        voltage:"7a",
        power:"9",
        connector:"2"
      },
      progress:1,
      page:"Make New Order"
  }
  HandleChange=(e)=>{
    const {value,name,checked,id}=e.target
    name==="guest" ? this.setState({data:{...this.state.data,[name]:checked}}) :
    this.setState({data:{...this.state.data,[name]:value}})
    console.log(this.state.data)
}
HandleSubmit=()=>{
    const errors=this.Validate(this.state.data)
    this.setState({errors})
    if (Object.keys(errors).length===0) {
      this.props.submit(this.state.data)
    }
 
}
handleClick=()=>{
    swal("What Do You Need To Transfer", 
    {
        
        buttons: {
          
          pliz: {
            id:'body',
            text: "Water",
            value: "1",
            
            },
          metal: {
            id:'body', 
            text: "Oil",
            value: "2",
            },
            alominium: {
                id:'body',
                text: "Air",
                value: "3",
                },
                
      }})
      
        .then((value) => {
            switch (value) {
           
              case "1":
               
              swal("Pikachu fainted! You gained 500 XP!");
                break;
           
              case "2":
                swal("Gotcha!", "You Choose Oil", "success");
                break;
           
              default:
                swal("Got away safely!");
            }
      })
      
      
}
    render() {
    const data=this.state.data
        return (
            
            <div>
            <MobileContainer name={this.state.page}/>
            
            <Segment>
                <Grid columns={10} columns='equal' divided>
                    <Grid.Row textAlign='center' verticalAlign='middle'>
                    <Grid.Column textAlign='center'>
                        {data.name}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.body}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.port}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.function}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.orifice}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.seals}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.override}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.voltage}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.power}
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        {data.connector}
                    </Grid.Column>
                    
                    </Grid.Row>
              </Grid>
              </Segment>
              <Segment 
              textAlign='center'
              >
                <Progress 
                value='1' 
                total='10' 
                progress='ratio'
                active
                color='teal'
                 />
                <Button 
                    color='youtube'
                    
                    onClick={this.handleClick}
                    >Start</Button>
                    <Button 
                    color='green'
                    size='medium'
                    
                    onClick={this.handleClick}
                    disabled
                    >Order</Button>
              </Segment>
              <Segment size='mini'>
                  <Grid columns={3} celled>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Name</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.name}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Body</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.body}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>3</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Port</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.port}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>4</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Function</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.function}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>5</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>OriFice</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.orifice}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Seals</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.seals}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Override</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.override}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Voltage</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.voltage}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>9</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Power</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.power}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>10</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Connector</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.connector}</Grid.Column> 
                    </Grid.Row>
                  </Grid>
                  
              </Segment>
            
              </div>
    )
  }
}
export default withRouter(OrderForm)