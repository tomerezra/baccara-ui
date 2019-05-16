import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Header,Segment,Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createAddress,updateAddress} from '../../store/actions/dataActions'


class NewShippingForm extends Component {
    state={
      
      citys:[],  
      pagename:'New Shipping Address',
        data:{
            FirstName:'',
            LastName:'',
            PhoneNumber:'',
            CompanyName:'',
            Adress:'',
            City:'',
            Email:this.props.auth.email
        }
    }
    componentDidMount = () => {
      
      const {id} = this.props.match.params
        if (id!=='0') {
          // eslint-disable-next-line eqeqeq
          const tmp=this.props.data.addresses.find(a=>id==a.ID)
          this.setState({
          data:{...this.state.data,
          FirstName:tmp.FirstName,
          LastName:tmp.LastName,
          PhoneNumber:tmp.PhoneNumber,
          CompanyName:tmp.CompanyName,
          Adress:tmp.Adress,
          City:tmp.City
          },
          pagename:'Update Address'
        })
        }
        
      
    }
    componentDidUpdate(prevProps, prevState) {
      
      if(prevProps.data.success !== this.props.data.success){
          this.props.history.push('/shipping')
        }
    }
  handleChange =(e,d)=>{
      
      const {name,value}=d
      this.setState({data:{...this.state.data,[name]:value}})
  } 
  handleSubmit=(e)=>{
    e.preventDefault()
    if (this.props.match.params.id!=='0') {
      this.props.updateAddress(this.state.data,this.props.match.params.id)
    } 
    else {
      this.props.createAddress(this.state.data)
    }
    
    
    
}
handleInvalid=(e)=>{
  const {value,name}=e.target
  if (value==='') {
    e.target.setCustomValidity(name.toLowerCase()+' is required')
  } 
  else if (name==='PhoneNumber') {
      e.target.setCustomValidity('Please enter 10 digits')
  }
  else e.target.setCustomValidity('Please enter at least 2 characters')
  
}
   render(){
    const {data}=this.state
    const {auth}=this.props
    if (auth.isEmpty) {return <Redirect to='/login'/>}
 
    return(
    <>
    <Header textAlign='center'>{this.state.pagename}</Header>          
    <Segment textAlign='center'>

       
        <Form onSubmit={this.handleSubmit}>
        
          <Form.Input 
                type="text"
                id="FirstName"
                name="FirstName"
                pattern="[a-zA-Z]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='user' 
                iconPosition='left' 
                placeholder='First Name'
                value={data.FirstName}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="LastName"
                name="LastName"
                pattern="[a-zA-Z]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Last Name'
                value={data.LastName}
                onChange={this.handleChange}>
            </Form.Input>
            <Form.Input 
                type="text"
                id="CompanyName"
                name="CompanyName"
                pattern="[a-zA-Z0-9_.-]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='suitcase' 
                iconPosition='left' 
                placeholder='Company'
                value={data.CompanyName}
                onChange={this.handleChange}>
            </Form.Input>
          
          <Form.Select
            
            search
            name='City'
            placeholder='Select your City' 
            options={this.props.data.citys} 
            onChange={this.handleChange}
            value={data.City}
            required
            
            />
          
          <Form.Input 
                type="text"
                id="Adress"
                name="Adress"
                pattern="[a-zA-Z0-9]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='Address'
                value={data.Adress}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                pattern="[0-9]{10,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='phone' 
                iconPosition='left' 
                placeholder='Phone Number'
                value={data.PhoneNumber}
                onChange={this.handleChange}>
            </Form.Input>
            <Button 
                color='linkedin'
                content={this.props.match.params.id!=='0'?'Update':'Add'}
                
                >
            </Button>
            <Button 
                color='grey' 
                content='Cancel'
                onClick={(e)=>{e.preventDefault(); this.props.history.push('/acount')}}>
            </Button>
        </Form>

    </Segment>
           </>
       )
    }
}

const mapStateToProps = (state) => {
  
  return{
        
        auth:state.firebase.auth,
        data:state.data
    }
    
  }

const mapDispatchToProps = (dispatch) =>{
    return{
        createAddress:(address)=>dispatch(createAddress(address)),
        updateAddress:(address,id)=>dispatch(updateAddress(address,id))
    }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewShippingForm))
