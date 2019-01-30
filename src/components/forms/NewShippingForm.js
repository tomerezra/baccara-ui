import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Form,
    Item,
    Input
  } from 'semantic-ui-react'
import MobileCotainer from './MobileCotainer';
import { connect } from 'react-redux'
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
            phone:''
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
       return(
           <div style={{maxWidth: 450}}>
               {/* <MobileCotainer pagename={this.state.pagename}/> */}
               <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form onSubmit={this.handleSubmit}>
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
const mapDispatchToProps = (dispatch) =>{
    return{
        createAddress:(address)=>dispatch(createAddress(address)),
        
    }
  }
export default withRouter(connect(null,mapDispatchToProps)(NewShippingForm))
