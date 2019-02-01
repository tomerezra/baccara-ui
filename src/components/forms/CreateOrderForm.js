import React, { Component } from 'react'
import { Button,Step,Icon, Form, Grid, Header, Image, Message, Segment, Checkbox, TextArea, Item, Divider, Input, Container } from 'semantic-ui-react'
import MobileCotainer from './MobileCotainer';
import Validator from 'validator'
import {withRouter} from 'react-router-dom'
import Data from '../../data/data'
import { connect } from 'react-redux'
import {createOrder} from '../../store/actions/dataActions'
export class CreateOrderForm extends Component {
  state={
        pagename:'Create New Order',
        data:{
        
            firstName:"",
            lastName:"",
            agree:false,
            country:"",
            city:"",
            address:"",
            email:"",
            phone:"",
            company:"",
            orderitems:[],
        
        }, 
        tmp:[],
        items:[],
        chose:"",
        step:1

  }
componentDidMount(){
    const id = this.props.match.params.id
    this.setState({items:Data.items.results})
    this.setState({chose:id})
    Data.items.results.map(item=>{
        this.state.tmp.push({id:item.id,name:item.name,serial:item.serial,quantity:0})
        
    })
      
  }
handleChange=(e)=>{
    const {value,name,id,type}=e.target
    
    if (type==='checkbox') {
        const itemtopush={serial:name,quantity:value}
        if (e.target.checked) {
            this.state.data.orderitems.push(itemtopush)
            const tmp= this.state.items.filter(item=>(item.id===id))
            tmp[0].checked=true
            
        }
        else {
            const tmp=this.state.data.orderitems.filter(item=>!(item.serial===name))
            
            this.setState({data:{...this.state.data,orderitems:tmp}})
            
        }
        
    }
    else if (name==='quantity') {
        
    }
    else {
        this.setState({data:{...this.state.data,[name]:value}})   
    }
    
    
    
}
handleSubmit=(e)=>{
    e.preventDefault()
    if (this.Validate(this.state.data)) {
        this.props.createOrder(this.state.data)
} 
    
}
Validate=(data)=>{
     
    if (!Validator.isEmail(data.email)||!data.password) {
        this.setState({error:true})
        return false
    }
    return true
  }
nextstep=(e)=>{
    
    const {name}=e.target  
    
    if (name==='next') {
        //add validation
        this.setState({step:this.state.step+1})

    }
    if (name==='back')  {
        this.setState({step:this.state.step-1})
    }
  }
billing=()=>{
    return(
    <Grid textAlign='center'>
                <Grid.Column>
                
                    <Form onSubmit={this.handleSubmit} size='large'>
                    
                    <Form.Input 
                            type="text"
                            id="firstname"
                            name="firstname"
                            
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='First Name'
                            value={this.state.data.firstname}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="lastname"
                            name="lastname"
                            
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='Last Name'
                            value={this.state.data.lastname}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="country"
                            name="country"
                            
                            fluid icon='globe' 
                            iconPosition='left' 
                            placeholder='Country'
                            value={this.state.data.country}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="city"
                            name="city"
                            
                            fluid icon='address card' 
                            iconPosition='left' 
                            placeholder='City'
                            value={this.state.data.city}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="address"
                            name="address"
                            
                            fluid icon='envelope' 
                            iconPosition='left' 
                            placeholder='Address'
                            value={this.state.data.address}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="phone"
                            name="phone"
                            
                            fluid icon='phone' 
                            iconPosition='left' 
                            placeholder='Phone Number'
                            value={this.state.data.phone}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="text"
                            id="company"
                            name="company"
                            
                            fluid icon='suitcase' 
                            iconPosition='left' 
                            placeholder='Company'
                            value={this.state.data.company}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="email"
                            id="email"
                            name="email"
                            
                            fluid icon='at' 
                            iconPosition='left' 
                            placeholder='Email'
                            value={this.state.data.email}
                            onChange={this.handleChange}>
                        </Form.Input>
                        
                    </Form>
                </Grid.Column>
            </Grid>
    )
    }
itemlist=()=>{
        return(
            <Grid columns='2' verticalAlign='middle'>
            {this.state.items.map(item=>{
                
                if (item.id===this.state.chose) {
                    item.checked=true
                    
                }
                return(
                   
                   <Grid.Row>
                       
                    <Grid.Column>
                    <Form.Checkbox
                        
                        id={item.id}
                        name={item.serial}
                        label={item.name}
                        onChange={this.handleChange}
    
                        >
                    </Form.Checkbox>
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Input
                        
                        placeholder='Quantity'
                        size='mini'
                        type='number'
                        min='1'
                        id={item.id}
                        name='quantity'
                        value={this.state.tmp[item.id-1].quantity}
                        onChange={this.handleChange}
                        
                        >
                     
                    </Form.Input>  
                    </Grid.Column>
                </Grid.Row>
                )
            })}
            </Grid>
        )
        
    }
confirm=()=>{
        return(
           <Container textAlign='center'>
            <Form.Checkbox
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                value={this.state.data.agree}
                onChange={()=>{this.setState({data:{...this.state.data,agree:!this.state.data.agree}})}}>>
            </Form.Checkbox>
            <br/>
            <Button color='linkedin' onClick={this.handleSubmit}>
            Submit
            </Button>
            <Button color='grey' onClick={()=>{this.props.history.goBack()}}>
            Cancel
            </Button>
        </Container> 
        )
    }
    render() {

    return (
      <div style={{ maxWidth: 450 }}>
        {/* <MobileCotainer pagename={this.state.pagename}/> */}
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Step.Group size='mini' unstackable fluid>
            <Step active={this.state.step===1?true:false}>
            <Icon name='truck' />
            <Step.Content>
                <Step.Title>Items</Step.Title>
            </Step.Content>
            </Step>
            <Step active={this.state.step===2?true:false}>
            <Icon name='payment' />
            <Step.Content>
                <Step.Title>Billing</Step.Title>
            </Step.Content>
            </Step>
            <Step 
                active={this.state.step===3?true:false}
                disabled={this.state.step===3?false:true}
            >
            <Icon name='info' />
            <Step.Content>
                <Step.Title>Confirm</Step.Title>
            </Step.Content>
            </Step>
        </Step.Group>
        <Segment >
        
        {this.state.step===1?this.itemlist():null}
        {this.state.step===2?this.billing():null}
        {this.state.step===3?this.confirm():null}
        
        <br/>
        <Button
            disabled={this.state.step===1}
            onClick={this.nextstep}
            name='back'
            color='linkedin'
            content='Back'>
        </Button>
        <Button
            disabled={this.state.step===3}
            onClick={this.nextstep}
            name='next'
            floated='right'
            color='linkedin'
            content='Next'>
        </Button>
        </Segment>
    </div>
    )
  }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        createOrder:(order)=>dispatch(createOrder(order)),
        
    }
  }
export default withRouter(connect(null,mapDispatchToProps)(CreateOrderForm))
