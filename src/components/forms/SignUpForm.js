import React, { Component } from 'react'
import {Button, Form, Grid, Header,Segment} from 'semantic-ui-react'
import Validator from 'validator'
// import InlineError from '../messages/InlineError'
import {createUser,updateUser} from '../../store/actions/authAction'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import firebase from 'firebase/app'
class SignUpForm extends Component {
    state={
        data:{

            // firstname:"",
            // lastname:"",
            // agree:false,
            // country:"",
            // city:"",
            // address:"",
            email:"",
            // phone:"",
            // company:"",
            password:""
        },
        apidata:{},
        errors:{},
        
    }
    componentDidMount = () => {
      
        const {auth}=this.props
        if (auth.uid) {
          
          this.setState({data:{...this.state.data,email:auth.email}})
        }
        
        
    }
    componentDidUpdate(prevProps){
      if(prevProps.auth.uid !== this.props.auth.uid){
        this.props.history.push('/acount')
      }
   }
    handleChange=(e)=>{
        const {value,name}=e.target
        name==="agree" ? this.setState({data:{...this.state.data,[name]:!this.state.data.agree}}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if (this.props.auth.uid) {
            this.props.updateUser(this.state.data)
        }
        else if(this.validate())
        {
          this.props.createUser(this.state.data)
           
          
        }
        
        
   }
   validate=()=>{
     return true
   }
  
  render() {
    const {data}=this.state
    const {auth,authError}=this.props
    // if (auth.uid) {return <Redirect to='/acount'/>}
    var pagename=auth.uid?'Update':'Signup'
    return (
      <div style={{maxWidth: 450}}>
        {/* <MobileCotainer pagename={this.props.logedin? 'Update Profile':'Sign Up'}/> */}
        <Header textAlign='center'>{pagename}</Header>
        <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form >
          
          {/* <Form.Input 
                type="text"
                id="firstname"
                name="firstname"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='First Name'
                value={data.firstname}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="lastname"
                name="lastname"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Last Name'
                value={data.lastname}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="country"
                name="country"
                
                fluid icon='globe' 
                iconPosition='left' 
                placeholder='Country'
                value={data.country}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="city"
                name="city"
                
                fluid icon='address card' 
                iconPosition='left' 
                placeholder='City'
                value={data.city}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="address"
                name="address"
                
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='Address'
                value={data.address}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="phone"
                name="phone"
                
                fluid icon='phone' 
                iconPosition='left' 
                placeholder='Phone Number'
                value={data.phone}
                onChange={this.handleChange}>
            </Form.Input> */}
            {/* <Form.Input 
                type="text"
                id="company"
                name="company"
                
                fluid icon='suitcase' 
                iconPosition='left' 
                placeholder='Company'
                value={data.company}
                onChange={this.handleChange}>
            </Form.Input> */}
            <Form.Input 
                type="email"
                id="email"
                name="email"
                
                fluid icon='at' 
                iconPosition='left' 
                placeholder='Email'
                value={data.email}
                onChange={this.handleChange}>
            </Form.Input>
            <Form.Input 
                type='password'
                id="password"
                name="password"
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                value={data.password}
                onChange={this.handleChange}>
            </Form.Input>
            
            <Form.Checkbox
                style={{display:auth.uid?'none':'inline-block'}}
                id="agree"
                name="agree"
                required
                label="I agree to the Terms and Conditions"
                checked={data.agree}
                onChange={this.handleChange}>>
            </Form.Checkbox>
            
            <Button color='linkedin' onClick={this.handleSubmit}>
                {auth.uid? 'Update' : 'Sign Up'}
            </Button>
            
            
          <Button icon='google' style={{display:auth.uid?'none':''}} color='google plus' onClick={()=>{
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              // ...
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          }}></Button>
          <Button icon='facebook' style={{display:auth.uid?'none':''}} color='facebook' onClick={()=>{
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              // ...
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          }}></Button>
          <Button color='grey' onClick={()=>{this.props.history.goBack()}}>
              Cancel
            </Button>
        </Form>
        
      </Grid.Column>
    </Grid>
    
    {authError?<p style={{color:'red',textAlign:'center'}}>{authError}</p>:null} 
    
    </Segment>
  </div>
      
    )
  }
}
const mapStateToProps = (state) => {
  
  return{
        authError:state.auth.authError,
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        signup:state.firebase.signup
    }
    
  }

const mapDispatchToProps = (dispatch) =>{
  return{
      createUser:(user)=>dispatch(createUser(user)),
      updateUser:(data)=>dispatch(updateUser(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignUpForm))

