/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import { Table,Select,Button,Step,Icon, Form, Grid, Header,Segment,Container, Divider, Label, StepContent } from 'semantic-ui-react'
import {withRouter,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {createOrder,getItems,getAddresses} from '../../store/actions/dataActions'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import swal from '@sweetalert/with-react'




export class CreateOrderForm extends Component {
   state = { 
            pagename:'Create New Order',
            agree:null, 
            p:[],
            q:[],
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
            citys:[],
            isOpen:false
            
        };
        
      
   

componentDidMount(){
    const {auth}=this.props
   
    
    if (this.props.match.params.id!=='0') {
        
        this.clone()
    }
    if (!auth.isEmpty) {
        this.setState({data:{...this.state.data,Address:{...this.state.data.Address,Email:this.props.auth.email}}})
        
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
    this.setState({step:3,confirm:true,billing:true})   
    var tmp = this.props.data.orders.find(order=>order.OrderId==this.props.match.params.id)
    this.setState({p:tmp.Part,q:tmp.Quantity},()=>{
        this.setState({data:{...this.state.data,Address:tmp.Address}})
    })
    
}
handleChange=(e,data)=>{
    
    const {value,name,id,type}=data
    if (name==='agree') {
        this.setState({agree:e.target.checked})
    }
    else if (type==='checkbox') {
        var p=this.state.p.slice()
        
        if (e.target.checked) {
            p[id]=name
            
            this.setState({p})
        }
        else {
            p[id]=undefined
            
            this.setState({p})
            
            
        }
        
    }
    else if (name==='quantity') {
        var q=this.state.q.slice()
        q[id]=Math.round(value)
        this.setState({q})
        
    }
    
    else if (data.name==='selectaddress') {
        var tmp = this.props.data.addresses.find(adr=>adr.ID===data.value)
        
          this.setState({data:{...this.state.data,Address:{...this.state.data.Address,
            FirstName:tmp.FirstName,
            LastName:tmp.LastName,
            PhoneNumber:tmp.PhoneNumber,
            CompanyName:tmp.CompanyName,
            Adress:tmp.Adress,
            City:tmp.City,
            ID:tmp.ID
        }}})
        
    }
    else {
        
        this.setState({data:{...this.state.data,Address:{...this.state.data.Address,[name]:value,ID:null}}})   
    }
    
    
    
}
handleInvalid=(e)=>{
    const {value,name}=e.target
    if (value==='') {
      e.target.setCustomValidity(name.toLowerCase()+' is required')
    } 
    else if (name==='quantity') {
        e.target.setCustomValidity('must to be 1 or more')
    }
    else if (name==='Email') {
        e.target.setCustomValidity('should be like xxx@xxx.xxx')
    }
    else if (name==='PhoneNumber') {
        e.target.setCustomValidity('Please enter 10 digits')
    }
    else e.target.setCustomValidity('Please enter at least 2 characters')
    
}
orderdetails=()=>{
    
    const {p,q} =this.state
    const {Address}=this.state.data
    this.setState({submit:true})
    var orderitems
    var Part=[]
    var Quantity=[]
    // eslint-disable-next-line array-callback-return
    orderitems=p.map((part,i)=>{
            
        if (part) {
            Part.push(part)
            Quantity.push(q[i])
            return(
            <Table.Row key={i}>
            <Table.Cell>{part}</Table.Cell>
            <Table.Cell>{q[i]}</Table.Cell>
            </Table.Row>
            )
            
        } 
    })
    this.setState({data:{...this.state.data,Part:Part,Quantity:Quantity}})
    
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
                {orderitems}
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
    if (this.state.step===1) {
        if (this.state.p.filter(p=>p!==undefined).length>0) {
            this.nextstep('next')
            this.setState({billing:true})
        }
        else swal('','You need to choose at least one item','warning')
        
    }
    else if (this.state.step===2) {
        if (this.state.data.Address.City==='') {
            swal('','You must to choose city','warning')
        } else {
            this.nextstep('next')
            this.setState({confirm:true})
        }
        
    } 
    else {
        if (this.Validate()) {
            
            this.props.createOrder(this.state.data)
            
        }  
    }
    
    
    
}
Validate=()=>{
    
    if (this.state.data.Part.length===0 || !this.state.data.Quantity.reduce((a,b)=>a+b)>0) {
        swal('',"You don't choose any item or quantity",'warning')
        return false
    }
    else if (this.state.data.Address.City==='') {
        swal('','You must to choose city','warning')
        return false
    }
    else if (!this.state.agree) {
        swal('','You must to agree the terms','warning')
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
                        options={this.props.data.citys} 
                        onChange={this.handleChange}
                        value={this.state.data.Address.City}
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
                            pattern="[a-zA-Z0-9_.-]{2,}"
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
                            disabled={!this.props.auth.isEmpty}
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

            <Divider></Divider>
            <Button
                      disabled={this.props.match.params.id!=='0'?true:false}
                      onClick={(e)=>{e.preventDefault();this.nextstep(e)}}
                      name='back'
                      color='blue'
                      content='Back'>
                  </Button>
                  <Button
                    
                      name='next'
                      floated='right'
                      color='blue'
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
            <Form onSubmit={this.handleSubmit}>
                
                <Grid columns='2' verticalAlign='middle'>
                
                {items.map((item,i)=>{
                    
                    return(
                       
                       <Grid.Row key={i}>
                         
                        <Grid.Column>
                        <Form.Checkbox
                            
                            id={i}
                            name={item.ItemSerial}
                            label={item.ItemName}
                            checked={this.state.p[i]?true:false}
                            onChange={this.handleChange}
                            
                            >
                        </Form.Checkbox>
                        </Grid.Column>
                       
                        <Grid.Column>
                        <Form.Input
                            
                            placeholder='Quantity'
                            size='mini'
                            type='tel'
                            pattern="[1-9][0-9]*"
                            onInvalid ={this.handleInvalid}
                            onInput={(e)=>{e.target.setCustomValidity('')}}
                            id={i}
                            disabled={this.state.p[i]?false:true}
                            name='quantity'
                            value={this.state.q[i]}
                            onChange={this.handleChange}
                            required
                            >
                         
                        </Form.Input>  
                        </Grid.Column>
                        
                    </Grid.Row>
                    
                    )
                })}
                
                </Grid>
                
             <Divider></Divider>  
                
            <Button

                name='next'
                floated='right'
                color='blue'
                content='Next'>
            </Button>
            <br/>
            <br/>
            </Form>
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
                
                this.orderdetails()}}
                content='Order Details'
                circular
                color='blue'
                >
                
                </Button>
           
            
          <Divider></Divider>
            <Form.Checkbox
                id="agree"
                name="agree"
                label="I agree to the Terms and Conditions"
                checked={this.state.agree}
                onChange={this.handleChange}
                required
                >
            </Form.Checkbox>
            
            
            <Button color='green' disabled={!this.state.submit}>
            Submit
            </Button>
            <Button color='grey' onClick={(e)=>{
                e.preventDefault()
                this.props.history.push('/acount')}}>
            Cancel
            </Button>
            </Container>
        </Form>
        <Divider></Divider>
        <Button
            // disabled={this.props.match.params.id!=='0'?true:false}
            onClick={(e)=>{this.nextstep(e) ;this.setState({submit:false})}}
            name='back'
            color='blue'
            content='Back'>
        </Button>
    
    </>
        )
    
}  
    render() {
        
        const {auth,guest}=this.props
        
        if (auth.isEmpty) {
            if (!guest) {
                return <Redirect to='/login'/>
            } 
        }
            return (
                <>
                 
                  <Header textAlign='center'>{this.state.pagename}</Header>
                  <Step.Group size='tiny' unstackable fluid widths={3}>
                      <Step
                        completed={this.state.billing?true:false}
                        active={this.state.step===1?true:false} 
                        disabled={this.props.match.params.id!=='0'?true:false}
                        onClick={()=>{this.setState({step:1,submit:false})}}>
                      <Icon name='barcode' />
                      <StepContent>Items</StepContent>
                      </Step>
                      <Step completed={this.state.confirm?true:false}
                        active={this.state.step===2?true:false} 
                        disabled={this.state.billing?false:true}
                        onClick={()=>{this.setState({step:2,submit:false})}}>
                      <Icon name='truck' />
                      <StepContent>Shipping</StepContent>
                      </Step>
                      <Step 
                          active={this.state.step===3?true:false}
                          disabled={this.state.confirm?false:true}
                          onClick={()=>{this.setState({step:3})}}>
                      
                      <Icon name='info' />
                      <StepContent>Confirm</StepContent>
                      </Step>
                  </Step.Group>
                  
                  <Segment>
                      
                  
                        {this.state.step===1?this.itemlist():null}
                        {this.state.step===2?this.billing():null}
                        {this.state.step===3?this.confirm():null}
               
                  
                  </Segment>
                  
              </>
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
