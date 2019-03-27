import React, { Component } from 'react'
import { Table,Select,Loader,Button,Step,Icon, Form, Grid, Header,Segment,Container } from 'semantic-ui-react'
import Validator from 'validator'
import {withRouter,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {createOrder} from '../../store/actions/dataActions'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import swal from '@sweetalert/with-react'

export class CreateOrderForm extends Component {
  state={
        pagename:'Create New Order',
        data:{
        
            firstname:"",
            lastname:"",
            agree:false,
            country:"",
            city:"",
            address:"",
            email:"",
            phone:"",
            company:"",
            orderitems:[],
        
        }, 
        
        step:1,
        

  }
componentDidMount(){
    const {auth}=this.props
    if (this.props.match.params.id!=0) {
        this.setState({step:3})
    }
    if (!auth.isEmpty) {
        this.setState({data:{...this.state.data,email:auth.email}})
        
    }
    
  }
clone=()=>{
    if (this.props.match.params.id!=0) {
                
        var tmp = this.props.data.orders.filter(order=>order.id===this.props.match.params.id)
        tmp={
            firstname:tmp[0].firstname,
            lastname:tmp[0].lastname,
            agree:false,
            country:tmp[0].country,
            city:tmp[0].city,
            address:tmp[0].address,
            email:tmp[0].email,
            phone:tmp[0].phone,
            company:tmp[0].company,
            orderitems:tmp[0].orderitems
        }
        this.state.data=tmp
        // this.setState({data:{...this.state.data,
        //     firstname:tmp[0].firstname,
        //     lastname:tmp[0].lastname,
        //     agree:false,
        //     country:tmp[0].country,
        //     city:tmp[0].city,
        //     address:tmp[0].address,
        //     email:tmp[0].email,
        //     phone:tmp[0].phone,
        //     company:tmp[0].company,
        //     orderitems:tmp[0].orderitems
        // }})
    }
}

handleChange=(e,data)=>{
    const {value,name,id,type}=e.target
    const {guest} =this.props
    if (type==='checkbox') {
        var itemtopush={id:id,serial:name,quantity:value}
        if (e.target.checked) {
            this.state.data.orderitems.push(itemtopush)
                        
        }
        else {
            var tmp=this.state.data.orderitems.filter(item=>!(guest?item.serial:item.id===id))
            
            this.setState({data:{...this.state.data,orderitems:tmp}})
            
        }
        
    }
    else if (name==='quantity' && this.state.data.orderitems.length>0) {
        var tmp=this.state.data.orderitems.filter(item=>(guest?item.serial:item.id===id))
        
        tmp[0].quantity=value
    }
    else if (data.name==='select') {
        var tmp = this.props.data.addresses.filter(adr=>adr.id===data.value)
        
        this.setState({data:{...this.state.data,
            firstname:tmp[0].firstname,
            lastname:tmp[0].lastname,
            country:tmp[0].country,
            city:tmp[0].city,
            address:tmp[0].address,
            phone:tmp[0].phone,
            company:tmp[0].company
            
          }})
    }
    else {
        this.setState({data:{...this.state.data,[name]:value}})   
    }
    
    
    
}
orderdetails=()=>{
    
    const {data} =this.state
    console.log(data)
    var items = data.orderitems.map(item=>{
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
                        <Table.Cell>{data.firstname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Last Name</Table.Cell>
                        <Table.Cell>{data.lastname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Address</Table.Cell>
                        <Table.Cell>{data.address}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>City</Table.Cell>
                        <Table.Cell>{data.city}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Country</Table.Cell>
                        <Table.Cell>{data.country}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Company</Table.Cell>
                        <Table.Cell>{data.company}</Table.Cell>
                    </Table.Row>   
                    <Table.Row>
                        <Table.Cell>Phone Number</Table.Cell>
                        <Table.Cell>{data.phone}</Table.Cell>
                    </Table.Row> 
                    <Table.Row>
                        <Table.Cell>Email</Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
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
    if (this.Validate(this.state.data)) {
        this.props.createOrder(this.state.data)
} 
    
}
Validate=(data)=>{
     
    // if (!Validator.isEmail(data.email)||!data.password) {
    //     this.setState({error:true})
    //     return false
    // }
    return true
  }
nextstep=(e)=>{
    
    const {name}=e.target  
    
    if (name==='next') {
        //add validation
        this.setState({step:this.state.step+1})

    }
    if (name==='back')  {
        this.setState({step:this.state.step-1})
    }
  }
billing=()=>{
    var tmp = this.props.data.addresses.filter(adr=>adr.userid===this.props.auth.uid)
    var tmp2 = tmp.map(adr=>{return{text:adr.firstname+' '+ adr.lastname,value:adr.id}})
    console.log(this.state.data.email)
    return(
    <>
    <Select 
        
        name='select'
        placeholder='Select your address' 
        options={tmp2} 
        onChange={this.handleChange}
        disabled={this.props.guest}
        />
    
    <Grid textAlign='center'>
                <Grid.Column>
                
                    <Form onSubmit={this.handleSubmit} size='large'>
                    
                    <Form.Input 
                            type="text"
                            id="firstname"
                            name="firstname"
                            
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='First Name'
                            value={this.state.data.firstname}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="lastname"
                            name="lastname"
                            
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='Last Name'
                            value={this.state.data.lastname}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="country"
                            name="country"
                            
                            fluid icon='globe' 
                            iconPosition='left' 
                            placeholder='Country'
                            value={this.state.data.country}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="city"
                            name="city"
                            
                            fluid icon='address card' 
                            iconPosition='left' 
                            placeholder='City'
                            value={this.state.data.city}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="address"
                            name="address"
                            
                            fluid icon='envelope' 
                            iconPosition='left' 
                            placeholder='Address'
                            value={this.state.data.address}
                            onChange={this.handleChange}>
                        </Form.Input>
                    <Form.Input 
                            type="text"
                            id="phone"
                            name="phone"
                            
                            fluid icon='phone' 
                            iconPosition='left' 
                            placeholder='Phone Number'
                            value={this.state.data.phone}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="text"
                            id="company"
                            name="company"
                            
                            fluid icon='suitcase' 
                            iconPosition='left' 
                            placeholder='Company'
                            value={this.state.data.company}
                            onChange={this.handleChange}>
                        </Form.Input>
                        <Form.Input 
                            type="email"
                            id="email"
                            name="email"
                            
                            fluid icon='at' 
                            iconPosition='left' 
                            placeholder='Email'
                            value={this.state.data.email}
                            onChange={this.handleChange}>
                        </Form.Input>
                        
                    </Form>
                </Grid.Column>
            </Grid>
            </>
    )
    }
itemlist=()=>{
    const {auth,data,guestdata,guest}=this.props
    if (guest) {
        var items = guestdata.items
    } else {
        var items = data.items.filter(item=>auth.uid===item.userid)
    }
       
    return(
            <Grid columns='2' verticalAlign='middle'>
            {items.map(item=>{
                
                return(
                   
                   <Grid.Row>
                       
                    <Grid.Column>
                    <Form.Checkbox
                        
                        id={guest?item.serial:item.id}
                        name={item.serial}
                        label={item.partname}
                        onChange={this.handleChange}
    
                        >
                    </Form.Checkbox>
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Input
                        
                        placeholder='Quantity'
                        size='mini'
                        type='number'
                        min='1'
                        id={item.id}
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
        )
        
    }

confirm=()=>{
    
    this.clone()
    return(
           <Container textAlign='center'>
           
           <Button onClick={this.orderdetails}>Order</Button>
          
            <Form.Checkbox
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                value={this.state.data.agree}
                onChange={()=>{this.setState({data:{...this.state.data,agree:!this.state.data.agree}})}}>>
            </Form.Checkbox>
            <br/>
            <Button color='linkedin' onClick={this.handleSubmit}>
            Submit
            </Button>
            <Button color='grey' onClick={()=>{this.props.history.goBack()}}>
            Cancel
            </Button>
        </Container> 
        )
    }
    
      isEmptyObject=(obj)=>{
        return (Object.getOwnPropertyNames(obj).length === 0);
      }
    render() {
        const {auth,guest}=this.props
        
        if (!auth.uid) {
            if (!guest) {
                return <Redirect to='/'/>
            } 
        }

        if (!this.isEmptyObject(this.props.data)) {
            
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
                  <Button
                      disabled={this.state.step===1}
                      onClick={this.nextstep}
                      name='back'
                      color='linkedin'
                      content='Back'>
                  </Button>
                  <Button
                      disabled={this.state.step===3}
                      onClick={this.nextstep}
                      name='next'
                      floated='right'
                      color='linkedin'
                      content='Next'>
                  </Button>
                  </Segment>
              </div>
              )
        } else {
            return (
                <Loader active inline='centered'></Loader>
            )
            
            
        }
    
  }
}
const mapStateToProps = (state) => {
  
    return{
         
          auth:state.firebase.auth,
        //   profile:state.firebase.profile,
          data:state.firestore.ordered,
          guest:state.auth.guest,
          guestdata:state.data
      }
      
    }
const mapDispatchToProps = (dispatch) =>{
    return{
        createOrder:(order)=>dispatch(createOrder(order)),
        
    }
  }
export default withRouter(compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:'items'},{collection:'addresses'},{collection:'orders'}])
  )(CreateOrderForm))
