import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import Validator from 'validator'
// import InlineError from '../messages/InlineError'
import logo from '../../images/logo.png'
import swal from 'sweetalert';
import { connect } from 'react-redux'
import {signIn,logasguest} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
class LoginForm extends Component {
    state={
        data:{
            email:"",
            password:"",
            guest:false
        },
        loading:true,
        pagename:'Log In To Your Account',
        error:false
    }
    
    HandleChange=(e)=>{
        const {value,name,checked}=e.target
        name==="guest" ? this.setState({data:{...this.state.data,[name]:checked}}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    HandleSubmit=(e)=>{
      e.preventDefault()
      if (this.state.data.guest) {
        this.props.logasguest()
        this.props.history.push('/builditem')
      } 
      else if (this.Validate(this.state.data)) {
        
        this.props.signIn(this.state.data)
        
      } 
      
    }
    Validate=(data)=>{
      
      // if (!Validator.isEmail(data.email)||!data.password) {
      //     this.setState({error:true})
      //     return false
      // }
      return true
    }
  
    
  
  render() {
    const {data}=this.state
    const {auth} = this.props
    if (auth.uid) {return <Redirect to='/acount'/>}
    return (
      <div style={{maxWidth: 450,marginTop:'-20%'}}>
        
        <Image src={logo} size='large' rounded>
        </Image>
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment >
        <Grid textAlign='center' >
          <Grid.Column >
        
             <Form onSubmit={this.HandleSubmit} error={this.state.error}>
               
          
                  <Form.Input 
                    disabled={this.state.data.guest}
                    type="text"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address'
                    value={data.email}
                    onChange={this.HandleChange}
                    >
                  </Form.Input>
                  
                  <Form.Input 
                    disabled={this.state.data.guest}
                    type='password'
                    id="password"
                    name="password"
                    fluid icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    value={data.password}
                    onChange={this.HandleChange}>
            </Form.Input>
            <Message
                error
                content='Your Email or Password not match'
                ></Message>
            <Form.Checkbox
                id="guest"
                name="guest"
                label="Contnue as Guest"
                value={data.guest}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='linkedin' fluid size='large'>
              Login
            </Button>
            
            <br/>
            <a style={{cursor: 'pointer'}} onClick={()=>{
                swal("Enter Your Email Address", {
                    content: "input",
                })
                .then((value) => {
                  swal(`The Password Send To ${value}`);
                  });}}>Forget Your Password</a>
          
        </Form>
        <Message>
          New to us? <a style={{cursor: 'pointer'}} onClick={()=>{this.props.history.push('/signup')}}>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
    </Segment>
  </div>
     
    )
  }
}
LoginForm.propTypes={
    submit:PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  
  return{
    guest:state.auth.guest,
    authError:state.auth.authError,
    auth:state.firebase.auth
  }
  
}

const mapDispatchToProps = (dispatch)=> {
  return{
    logasguest:()=>dispatch(logasguest()),
    signIn:(creds)=>dispatch(signIn(creds))
  }
  
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginForm))
