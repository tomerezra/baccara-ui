import React, { Component } from 'react'
import {Button, Form, Grid, Header,Segment,Message} from 'semantic-ui-react'
import {createUser,updateUser} from '../../store/actions/authAction'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import firebase from 'firebase/app'
import swal from 'sweetalert';
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
        agree:false
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
        name==="agree" ? this.setState({agree:!this.state.agree}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if (this.props.auth.uid) {
            this.props.updateUser(this.state.data)
        }
        else
        {
          if (this.state.agree) {
            this.props.createUser(this.state.data)
          } else {
            swal('','You must to agree the terms','error')
          }
          
           
          
        }
       
   }
   handleInvalid=(e)=>{
    const {value,name}=e.target
    if (value==='') {
      e.target.setCustomValidity(name+' is required')
    } else {
      e.target.setCustomValidity('wrong pattern')
    }
    
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
       
        <Form onSubmit={this.handleSubmit}>
          
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
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
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
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
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
                checked={this.state.agree}
                onChange={this.handleChange}>>
            </Form.Checkbox>
            {this.props.authError?<Message color='red'>{this.props.authError}</Message>:null}
            <Button color='linkedin' >
                {auth.uid? 'Update' : 'Sign Up'}
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

