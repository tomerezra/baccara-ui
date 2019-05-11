import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import logo from '../../images/logo.png'
import logo3 from '../../images/logo3.jpg'
import swal from '@sweetalert/with-react';
import { connect } from 'react-redux'
import {signIn,logAsGuest,errorClear,logWithProvider} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase/app'

class LoginForm extends Component {
    
  state={
        data:{
            email:"",
            password:"",
            guest:false
        },
        
        pagename:'Log In To Your Account',
        
    }
    componentDidMount() {
      this.props.errorClear()
    }
    
    HandleChange=(e)=>{
      
        const {value,name,checked}=e.target
        name==="guest" ? this.setState({data:{...this.state.data,[name]:checked}}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    HandleSubmit=(e)=>{
      e.preventDefault()
      if (this.state.data.guest) {
        this.props.logAsGuest()
        this.props.history.push('/builditem')
      } 
      else {
        
        this.props.signIn(this.state.data)
        
      } 
      
    }

    handleInvalid=(e)=>{
      const {value,name}=e.target
      if (value==='') {
        e.target.setCustomValidity(name.toLowerCase()+' is required')
      }
      else if (name==='email') {
        e.target.setCustomValidity('should be like xxx@xxx.xxx')
      }
      else if (name==='password') {
        e.target.setCustomValidity('password must contains: at least 6 characters and have at least one upper-case, one lower-case and one number')
      }
      
    }
  
  render() {
    const {data}=this.state
    const {auth} = this.props
    if (!auth.isEmpty) {return <Redirect to='/acount'/>}
    return (
      <div style={{marginTop:'-20%'}}>
        
        <Image  src={logo3} rounded>
        </Image>
        <Header textAlign='center'>{this.state.pagename}</Header>
        <Segment >
        <Grid textAlign='center' >
          <Grid.Column >
        
             <Form onSubmit={this.HandleSubmit}>
               
          
                  <Form.Input 
                    disabled={this.state.data.guest}
                    type="text"
                    id="email"
                    name="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
                    onInvalid ={this.handleInvalid}
                    onInput={(e)=>{e.target.setCustomValidity('')}}
                    required
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
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    onInvalid ={this.handleInvalid}
                    onInput={(e)=>{e.target.setCustomValidity('')}}
                    required
                    value={data.password}
                    onChange={this.HandleChange}>
            </Form.Input>
            {this.props.authError?<Message color='red'>{this.props.authError}</Message>:null}
            <Form.Checkbox
                id="guest"
                name="guest"
                label="Contnue as Guest"
                checked={data.guest}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='linkedin'>
              Login
            </Button>
            <Button 
            icon='google' 
            style={{display:auth.uid?'none':''}} 
            color='google plus' 
            onClick={(e)=>{
              e.preventDefault()
              this.props.logWithProvider('google')
            }}>
          </Button>
          <Button 
            icon='facebook' 
            style={{display:auth.uid?'none':''}} 
            color='facebook' 
            onClick={(e)=>{
              e.preventDefault()
              this.props.logWithProvider('facebook')
            }}>
          </Button>
            
            <br/>
            <p className='textclick' onClick={()=>{
                swal("Enter Your Email Address", {
                    content: "input",
                })
                .then((value) => {
                  firebase.auth().sendPasswordResetEmail(value)
                  .then(function() {
                    swal(`Password reset, Email send to ${value}`);
                  })
                  .catch(function(error) {
                    
                    swal('',error.message,'error')
                  });
                  
                  });}}>Forget Your Password?</p>
          
        </Form>
        <Message>
          New to us? <span className='textclick' onClick={()=>{this.props.history.push('/signup')}}>Sign Up</span>
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
    logAsGuest:()=>dispatch(logAsGuest()),
    signIn:(creds)=>dispatch(signIn(creds)),
    errorClear:()=>dispatch(errorClear()),
    logWithProvider:(prov)=>dispatch(logWithProvider(prov))
  }
  
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginForm))
