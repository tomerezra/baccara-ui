import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox,Input, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, RouterContext ,withRouter} from "react-router-dom";
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import logo from '../images/baccara.jpg'
import swal from 'sweetalert';
import MobileCotainer from './MobileCotainer';

class LoginForm extends Component {
    state={
        data:{
            email:"",
            password:"",
            guest:false
        },
        loading:false,
        page:'Log In To Your Account',
        errors:{}
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
    Validate=(data)=>{
      
      const errors={}
      
      if (!Validator.isEmail(data.email)) {
          errors.email="invalid Email"
      }
     if (!data.password) {
      errors.password="Can't Be Blank"
      }
      return errors
    }
  
    
  
  render() {
    const {data,errors}=this.state
    return (
      <div>
        <MobileCotainer name={this.state.page}/>
        
        <Grid textAlign='center' style={{marginTop:'0.5em'}}>
          <Grid.Column style={{ maxWidth: 450 }}>
        
             <Form onSubmit={this.HandleSubmit} size='large'>
               <Segment >
          
                  <Form.Input error={!!errors.email}
                    type="email"
                    id="email"
                    name="email"
                    
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address'
                    value={data.email}
                    onChange={this.HandleChange}>
                  </Form.Input>
                  {errors.email && <InlineError text={errors.email}/>}
                  <Form.Input error={errors.password}
                    type='password'
                    id="password"
                    name="password"
                    fluid icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    value={data.password}
                    onChange={this.HandleChange}>
            </Form.Input>
            {errors.password && <InlineError text={errors.password }/>}
            <Form.Checkbox
                id="guest"
                name="guest"
                label="Contnue as Guest"
                value={data.guest}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='teal' fluid size='large'>
              Login
            </Button>
            
            <br/>
            <a onClick={()=>{
                swal("Enter Your Email Address", {
                    content: "input",
                })
                .then((value) => {
                  swal(`The Password Send To ${value}`);
                  });}}>Forget Your Password</a>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
    
  </div>
     
    )
  }
}
LoginForm.propTypes={
    submit:PropTypes.func.isRequired
}
export default withRouter(LoginForm)
