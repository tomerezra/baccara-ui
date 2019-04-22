import React, { Component } from 'react'
import { Table,Select,Button,Step,Icon, Form, Grid, Header,Segment,Container, Divider, Label } from 'semantic-ui-react'
import {withRouter,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {createOrder,getItems,getAddresses} from '../../store/actions/dataActions'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import swal from '@sweetalert/with-react'
import Axios from 'axios'
export class CreateOrderForm extends Component {
  state={
        pagename:'Create New Order',
        orderitems:[],
        agree:false, 
        submit:false,
        
        data:{
            
            Part:[],
            Quantity:[],
            Address:{
                ID:null,
                FirstName:'',
                LastName:'',
                PhoneNumber:'',
                CompanyName:'',
                Adress:'',
                City:'',
                Email:'',
                
            },       
        },
        step:1,
        clone:false,
        citys:[]

  }
componentDidMount(){
    const {auth}=this.props
    Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/City')
      .then(res=>this.setState({citys:res.data}))
      .catch(()=>{
        swal('','something worng, try again','error');
        this.props.history.goBack()}
        )
    if (this.props.match.params.id!=='0') {
        this.setState({step:3,clone:true})
    }
    if (!auth.isEmpty) {
        
        this.props.getItems()
        this.props.getAddresses()
        
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.guest) {
        if(prevProps.data.success !== this.props.data.success){
            this.props.history.push('/builditem')
          }
    } else {
        if(prevProps.data.success !== this.props.data.success){
            this.props.history.push('/orders')
          }
    }  
    
  }
  
clone=()=>{
    if (this.state.clone) {
        this.setState({clone:false})     
        var tmp = this.props.data.orders.filter(order=>order.OrderId==this.props.match.params.id)
        
        this.state.data.Address=tmp[0].Address
        tmp[0].Part.map((p,i)=>{
            this.state.orderitems.push({serial:p,quantity:tmp[0].Quantity[i]})
        })
        
    }
}

handleChange=(e,data)=>{
    const {value,name,id,type}=data
    
    
    if (type==='checkbox') {
        var itemtopush={id:id,serial:name,quantity:value}
        if (e.target.checked) {
            this.state.orderitems.push(itemtopush)
            
        }
        else {
            var tmp=this.state.orderitems.filter(item=>!(item.id===id))
            
            this.setState({orderitems:tmp})
            
        }
        
    }
    else if (name==='quantity' && this.state.orderitems.length>0) {
        var tmp=this.state.orderitems.filter(item=>(item.id===id))
        tmp[0].quantity=value
    }
    else if (data.name==='selectaddress') {
        var tmp = this.props.data.addresses.filter(adr=>adr.ID===data.value)
        
          this.setState({data:{...this.state.data,Address:{...this.state.data.Address,
            FirstName:tmp[0].FirstName,
            LastName:tmp[0].LastName,
            PhoneNumber:tmp[0].PhoneNumber,
            CompanyName:tmp[0].CompanyName,
            Adress:tmp[0].Adress,
            City:tmp[0].City,
            Email:tmp[0].Email,
            ID:tmp[0].ID
        }}})
        
    }
    else {
        
        this.setState({data:{...this.state.data,Address:{...this.state.data.Address,[name]:value}}})   
    }
    
    
    
}
handleInvalid=(e)=>{
    const {value,name}=e.target
    if (value==='') {
      e.target.setCustomValidity(name+' is required')
    } else {
      e.target.setCustomValidity('Worng pattern')
    }
    
  }
orderdetails=()=>{
    
    const {orderitems} =this.state
    const {Address}=this.state.data
    this.setState({submit:true})
    var items = orderitems.map(item=>{
        return(
            <Table.Row>
            <Table.Cell>{item.serial}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            </Table.Row>
        )
    })
    swal({
        content:(
        <div>
            <h2>Order Details</h2>
            
            <Table celled unstackable compact fixed size='small'>
                
                <Table.Body >
                    <Table.Row>
                        <Table.Cell>First Name</Table.Cell>
                        <Table.Cell>{Address.FirstName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Last Name</Table.Cell>
                        <Table.Cell>{Address.LastName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Address</Table.Cell>
                        <Table.Cell>{Address.Adress}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>City</Table.Cell>
                        <Table.Cell>{Address.City}</Table.Cell>
                    </Table.Row>
                    
                    <Table.Row>
                        <Table.Cell>Company</Table.Cell>
                        <Table.Cell>{Address.CompanyName}</Table.Cell>
                    </Table.Row>   
                    <Table.Row>
                        <Table.Cell>Phone Number</Table.Cell>
                        <Table.Cell>{Address.PhoneNumber}</Table.Cell>
                    </Table.Row> 
                    <Table.Row>
                        <Table.Cell>Email</Table.Cell>
                        <Table.Cell>{Address.Email}</Table.Cell>
                    </Table.Row> 
                 
                </Table.Body>
            </Table>
            <h2>Items</h2>
            <Table celled unstackable compact fixed size='small'>
            <Table.Header>
                <Table.HeaderCell>Serial</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {items}
            </Table.Body>
            </Table>
        </div>
        ),
        button:{visible:true},
        closeOnClickOutside: false,
        
        
      
    })
}
handleSubmit=(e)=>{
    e.preventDefault()
    
    if (this.state.step===2) {
        this.nextstep('next')
    } 
    else {
        this.state.orderitems.map((item)=>{
            this.state.data.Part.push(item.serial)
            this.state.data.Quantity.push(item.quantity)
        })
        if (this.Validate()) {
            
            this.props.createOrder(this.state.data)
            
        }  
    }
    
    
    
}
Validate=()=>{
     
    if (this.state.orderitems.length===0) {
        swal('',"You don't choose any item",'error')
        return false
    }
    else if (this.state.data.Address.FirstName==='') {
        swal('',"You don't choose any address",'error')
        return false
    }
    else if (!this.state.agree) {
        swal('','You must to agree the terms','error')
        return false
    }
    else return true
  }
nextstep=(e)=>{
    if (e==='next') {
        this.setState({step:this.state.step+1})
    }
    
    else if (e.target.name==='next') {
        this.setState({step:this.state.step+1})
    }
    else if (e.target.name==='back')  {
        this.setState({step:this.state.step-1})
    }
  }
billing=()=>{
    
    var citylist = this.state.citys.map(city=>{return{text:city.Name,value:city.Name}})
    // var tmp = this.props.data.addresses.filter(adr=>adr.userid===this.props.auth.uid)
    var tmp = this.props.data.addresses.map(adr=>{return{text:adr.FirstName+' '+ adr.LastName,value:adr.ID}})
    
    return(
        <Form onSubmit={this.handleSubmit}>
        <Select 
            
            name='selectaddress'
            placeholder='Select your address' 
            options={tmp} 
            onChange={this.handleChange}
            disabled={this.props.guest}
            />
        <Divider></Divider>
        <Grid textAlign='center'>
                <Grid.Column>

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
                            value={this.state.data.Address.FirstName}
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
                            value={this.state.data.Address.LastName}
                            onChange={this.handleChange}>
                        </Form.Input>
                    
                    <Form.Select
                        search 
                        name='City'
                        placeholder='Select your City' 
                        options={citylist} 
                        onChange={this.handleChange}
                        value={this.state.data.Address.City}
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
                            value={this.state.data.Address.Adress}
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
                            value={this.state.data.Address.PhoneNumber}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="text"
                            id="CompanyName"
                            name="CompanyName"
                            pattern="[a-zA-Z]{2,}"
                            onInvalid ={this.handleInvalid}
                            onInput={(e)=>{e.target.setCustomValidity('')}}
                            required
                            fluid icon='suitcase' 
                            iconPosition='left' 
                            placeholder='Company'
                            value={this.state.data.Address.CompanyName}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="email"
                            id="Email"
                            name="Email"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
                            onInvalid ={this.handleInvalid}
                            onInput={(e)=>{e.target.setCustomValidity('')}}
                            required
                            fluid icon='at' 
                            iconPosition='left' 
                            placeholder='Email'
                            value={this.state.data.Address.Email}
                            onChange={this.handleChange}>
                        </Form.Input>
                        
                    
                </Grid.Column>
            </Grid>
            <br/>
            <Button
                      
                      onClick={(e)=>{e.preventDefault();this.nextstep(e)}}
                      name='back'
                      color='linkedin'
                      content='Back'>
                  </Button>
                  <Button
                    
                      name='next'
                      floated='right'
                      color='linkedin'
                      content='Next'>
                  </Button>
                  </Form>
    )
    }
itemlist=()=>{
    const {data,guest}=this.props
    var items
    if (guest) {
        items = data.gitems
    } else { 
        items = data.items
    }
       
    return(
        <>
            <Grid columns='2' verticalAlign='middle'>
            {items.map((item,i)=>{
                
                return(
                   
                   <Grid.Row>
                       
                    <Grid.Column>
                    <Form.Checkbox
                        
                        id={guest?i:item.ItemID}
                        name={item.ItemSerial}
                        label={item.ItemName}
                        onChange={this.handleChange}
    
                        >
                    </Form.Checkbox>
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Input
                        
                        placeholder='Quantity'
                        size='mini'
                        type='tel'
                        pattern="[0-9]*"
                        min='1'
                        id={guest?i:item.ItemID}
                        name='quantity'
                        // value={this.state.tmp[item.id-1].quantity}
                        onChange={this.handleChange}
                        
                        >
                     
                    </Form.Input>  
                    </Grid.Column>
                </Grid.Row>
                )
            })}
            </Grid>
            <br/>
            
        <Button
            
            onClick={this.nextstep}
            name='next'
            floated='right'
            color='linkedin'
            content='Next'>
        </Button>
        <br/>
        </>
        )
        
    }

confirm=()=>{
    
    
    return(
        <>
        <Form onSubmit={this.handleSubmit} >
           
           <Container textAlign='center'>
           <Label 
                pointing='below' 
                style={{display:this.state.submit?'none':''}}
                
                content='Check your order before you submit'
                ></Label>
           <br/>
           <Button onClick={(e)=>{
                e.preventDefault()
                this.clone();
                this.orderdetails()}}
                content='Order Details'
                circular
                color='linkedin'
                >
                
                </Button>
           
            
          <Divider></Divider>
            <Form.Checkbox
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                value={this.state.agree}
                onChange={()=>{this.setState({agree:!this.state.agree})}}
                required
                >
            </Form.Checkbox>
            <br/>
            <Button color='green' disabled={!this.state.submit}>
            Submit
            </Button>
            <Button color='grey' onClick={(e)=>{
                e.preventDefault()
                this.props.history.goBack()}}>
            Cancel
            </Button>
            </Container>
        </Form>
        <Button
        
        onClick={(e)=>{this.nextstep(e) ;this.setState({submit:false})}}
        name='back'
        color='linkedin'
        content='Back'>
    </Button>
    
    </>
        )
    }
    
      
    render() {
        
        const {auth,guest}=this.props
        
        if (auth.isEmpty) {
            if (!guest) {
                return <Redirect to='/'/>
            } 
        }
            return (
                <div style={{ maxWidth: 450 }}>
                 
                  <Header textAlign='center'>{this.state.pagename}</Header>
                  <Step.Group size='mini' unstackable fluid>
                      <Step active={this.state.step===1?true:false} onClick={()=>{this.setState({step:1})}}>
                      <Icon name='truck' />
                      <Step.Content>
                          <Step.Title>Items</Step.Title>
                      </Step.Content>
                      </Step>
                      <Step active={this.state.step===2?true:false} onClick={()=>{this.setState({step:2})}}>
                      <Icon name='payment' />
                      <Step.Content>
                          <Step.Title>Billing</Step.Title>
                      </Step.Content>
                      </Step>
                      <Step 
                          active={this.state.step===3?true:false}
                          disabled={this.state.step===3?false:true}
                      >
                      <Icon name='info' />
                      <Step.Content>
                          <Step.Title>Confirm</Step.Title>
                      </Step.Content>
                      </Step>
                  </Step.Group>
                  <Segment>
                  
                  {this.state.step===1?this.itemlist():null}
                  {this.state.step===2?this.billing():null}
                  {this.state.step===3?this.confirm():null}
                  <br/>
                  
                  </Segment>
              </div>
              )
        } 
    
  
}
const mapStateToProps = (state) => {
  
    return{
         
          auth:state.firebase.auth,
        //   profile:state.firebase.profile,
        //   data:state.firestore.ordered,
          guest:state.auth.guest,
          data:state.data,
          
      }
      
    }
const mapDispatchToProps = (dispatch) =>{
    return{
        createOrder:(order)=>dispatch(createOrder(order)),
        getItems:()=>dispatch(getItems()),
        getAddresses:()=>dispatch(getAddresses())
    }
  }
export default withRouter(compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:'items'},{collection:'addresses'},{collection:'orders'}])
  )(CreateOrderForm))
