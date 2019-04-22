import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import Axios from 'axios'
import logo from '../../images/logo.png'
import swal from '@sweetalert/with-react';
import { connect } from 'react-redux'
import {signIn,logasguest} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase/app'
const styles = {
  
  click:{
    cursor: 'pointer',
    color:'#1E90FF'
    
  },

}
class LoginForm extends Component {
    
  state={
        data:{
            email:"",
            password:"",
            guest:false
        },
        loading:true,
        pagename:'Log In To Your Account',
        
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
      else {
        
        this.props.signIn(this.state.data)
        
      } 
      
    }
    
  
    handleInvalid=(e)=>{
      const {value,name}=e.target
      if (value==='') {
        e.target.setCustomValidity(name+' is required')
      } else {
        e.target.setCustomValidity('worng pattern')
      }
      
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
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
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
                value={data.guest}
                onChange={this.HandleChange}>>
            </Form.Checkbox>
            
            <Button color='linkedin'>
              Login
            </Button>
            <Button icon='google' style={{display:auth.uid?'none':''}} color='google plus' onClick={(e)=>{
            e.preventDefault()
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              var user = result.user;
              Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
              
            }).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage)
            });
          }}></Button>
          <Button icon='facebook' style={{display:auth.uid?'none':''}} color='facebook' onClick={(e)=>{
            e.preventDefault()
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              var user = result.user;
              Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
            }).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage)
            });
          }}></Button>
            
            <br/>
            <p style={{cursor: 'pointer',color:'#1E90FF'}} onClick={()=>{
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
          New to us? <span style={{cursor: 'pointer',color:'#1E90FF'}} onClick={()=>{this.props.history.push('/signup')}}>Sign Up</span>
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
