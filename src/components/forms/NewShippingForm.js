import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Grid,Header,Segment,Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createAddress} from '../../store/actions/dataActions'

class NewShippingForm extends Component {
    state={
        pagename:'New Shipping Address',
        data:{
            firstname:'',
            lastname:'',
            country:'',
            city:'',
            address:'',
            phone:'',
            company:''
        }
    }
  handleChange =(e)=>{
      
      const {name,value}=e.target
      this.setState({data:{...this.state.data,[name]:value}})
  } 
  handleSubmit=()=>{
    this.props.createAddress(this.state.data)
    
  }   
   render(){
    const {data}=this.state
    const {auth}=this.props
    if (!auth.uid) {return <Redirect to='/'/>}
       return(
           <div style={{maxWidth: 450}}>
               {/* <MobileCotainer pagename={this.state.pagename}/> */}
               <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form>
        <Header textAlign='center'>{this.state.pagename}</Header>
          <Form.Input 
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
                id="company"
                name="company"
                
                fluid icon='suitcase' 
                iconPosition='left' 
                placeholder='Company'
                value={data.company}
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
            </Form.Input>
            <Button 
                color='linkedin'
                content='Add'
                onClick={()=>{this.handleSubmit()}}
                >
            </Button>
            <Button 
                color='grey' 
                content='Cancel'
                onClick={()=>{this.props.history.goBack()}}>
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
        profile:state.firebase.profile
    }
    
  }

const mapDispatchToProps = (dispatch) =>{
    return{
        createAddress:(address)=>dispatch(createAddress(address)),
        
    }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewShippingForm))
