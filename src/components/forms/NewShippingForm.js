import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Grid,Header,Segment,Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createAddress,updateAddress} from '../../store/actions/dataActions'
import Axios from 'axios';
import swal from 'sweetalert';

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
          const tmp=this.props.data.addresses.filter(a=>id==a.ID)
          this.setState({
          data:{...this.state.data,
          FirstName:tmp[0].FirstName,
          LastName:tmp[0].LastName,
          PhoneNumber:tmp[0].PhoneNumber,
          CompanyName:tmp[0].CompanyName,
          Adress:tmp[0].Adress,
          City:tmp[0].City
          },
          pagename:'Update Address'
        })
        }
        
      Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/City')
      .then(res=>this.setState({citys:res.data}))
      .catch(()=>{
        swal('','something worng, try again','error');
        this.props.history.goBack()}
        )
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
    e.target.setCustomValidity(name+' is required')
  } else {
    e.target.setCustomValidity('wrong pattern')
  }
  
}
   render(){
    const {data}=this.state
    const {auth}=this.props
    if (auth.isEmpty) {return <Redirect to='/'/>}
    var citylist = this.state.citys.map(city=>{return{text:city.Name,value:city.Name}})
    return(
    <div style={{maxWidth: 450}}>
               
    <Segment>
    <Grid textAlign='center'>
      <Grid.Column>
       
        <Form onSubmit={this.handleSubmit}>
        <Header textAlign='center'>{this.state.pagename}</Header>
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
                pattern="[a-zA-Z0-9]{2,}"
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
            options={citylist} 
            onChange={this.handleChange}
            value={data.City}
            required
            
            />
          
          <Form.Input 
                type="text"
                id="Adress"
                name="Adress"
                pattern="[a-zA-Z]{2,}"
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
      </Grid.Column>
    </Grid>
    </Segment>
           </div>
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
