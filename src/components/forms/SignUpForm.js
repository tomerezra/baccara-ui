import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import logo from '../images/baccara.jpg'
import {withRouter} from 'react-router-dom'
import MobileCotainer from './MobileCotainer';
class SignUpForm extends Component {
    state={
        data:{

            firstName:"",
            lastName:"",
            age:"",
            agree:false,
            country:"",
            city:"",
            address:"",
            email:"",
            phone:"",
            company:"",
            password:""
        },
        isloading:false,
        
        apidata:{},
        errors:{}
    }
    HandleChange=(e)=>{
        const {value,name,checked,id}=e.target
        name==="agree" ? this.setState({data:{...this.state.data,[name]:checked}}) :
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
    
  
    
  
  render() {
    const {data}=this.state
    console.log(this.props)
    
    return (
      <div>
        <MobileCotainer name={this.props.logedin ? 'Update Profile':'Sign Up'}/>
    <Grid textAlign='center' style={{marginTop:'0.5em'}}>
      <Grid.Column style={{ maxWidth: 450 }}>
       
        <Form onSubmit={this.HandleSubmit} size='large'>
          <Segment stacked>
          <Form.Input 
                type="text"
                id="firstname"
                name="firstname"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='First Name'
                value={data.firstname}
                onChange={this.HandleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="lastname"
                name="lastname"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Last Name'
                value={data.lastname}
                onChange={this.HandleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="country"
                name="country"
                
                fluid icon='globe' 
                iconPosition='left' 
                placeholder='Country'
                value={data.country}
                onChange={this.HandleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="city"
                name="city"
                
                fluid icon='address card' 
                iconPosition='left' 
                placeholder='City'
                value={data.city}
                onChange={this.HandleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="address"
                name="address"
                
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='Address'
                value={data.address}
                onChange={this.HandleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="phone"
                name="phone"
                
                fluid icon='phone' 
                iconPosition='left' 
                placeholder='Phone Number'
                value={data.phone}
                onChange={this.HandleChange}>
            </Form.Input>
            <Form.Input 
                type="text"
                id="company"
                name="company"
                
                fluid icon='suitcase' 
                iconPosition='left' 
                placeholder='Company'
                value={data.company}
                onChange={this.HandleChange}>
            </Form.Input>
            <Form.Input 
                type="email"
                id="email"
                name="email"
                
                fluid icon='at' 
                iconPosition='left' 
                placeholder='Email'
                value={data.email}
                onChange={this.HandleChange}>
            </Form.Input>
            <Form.Input 
                type='password'
                id="password"
                name="password"
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                value={data.password}
                onChange={this.HandleChange}>
            </Form.Input>
            
            <Form.Checkbox
                
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                value={data.agree}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='teal' >
            {this.state.logedin ? 'Update' : 'Sign Up'}
            </Button>
            
            <Button color='grey' >
              Cancel
            </Button>
          </Segment>
        </Form>
        
      </Grid.Column>
    </Grid>
  </div>
      
    )
  }
}
export default withRouter(SignUpForm)

