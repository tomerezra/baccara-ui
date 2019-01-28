import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import logo from '../images/baccara.jpg'
import {withRouter} from 'react-router-dom'
import MobileCotainer from './MobileCotainer';
import {connect} from 'react-redux'
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
        apidata:{},
        errors:{},
        pagename:''
    }
    componentDidMount = () => {
      this.setState({pagename:this.props.auth? 'Update' : 'Sign Up'})
    }
    
    HandleChange=(e)=>{
        const {value,name,checked,id}=e.target
        name==="agree" ? this.setState({data:{...this.state.data,[name]:checked}}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    HandleSubmit=()=>{
      if (this.Validate(this.state.data)) {
       this.props.history.push('/acount')
      } 
        
   }
   Validate=(data)=>{
     
     if (!Validator.isEmail(data.email)||!data.password) {
         this.setState({error:true})
         return false
     }
     return true
   }
  
  render() {
    const {data}=this.state
    
    
    return (
      <div style={{maxWidth: 450}}>
        {/* <MobileCotainer pagename={this.props.logedin? 'Update Profile':'Sign Up'}/> */}
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form onSubmit={this.HandleSubmit}>
          
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
                style={{display:this.props.auth?'none':'inline-block'}}
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                value={data.agree}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='linkedin' >
                {this.props.auth? 'Update' : 'Sign Up'}
            </Button>
            
            <Button color='grey' onClick={()=>{this.props.history.goBack()}}>
              Cancel
            </Button>
          
        </Form>
        
      </Grid.Column>
    </Grid>
    </Segment>
  </div>
      
    )
  }
}
const mapStateToProps = (state) => {
    return{
        auth:state.auth.logedin,
        nav:state.nav.nav
    }
    
  }

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignUpForm))

