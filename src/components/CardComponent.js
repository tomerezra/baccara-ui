import React, { Component } from 'react'
import {Card, Button,Table} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import swal from '@sweetalert/with-react'
export class CardComponent extends Component {
  state={
    data:this.props.order
  }
  swaladdress=()=>{
    const {address}= this.props
    var tmp=[]
      for (const key in address) {
        if (key=='ID'||key==='Email') {
          
        }    
        else tmp.push(
              
              <Table.Row>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{(key,address[key])}</Table.Cell>
              </Table.Row>
            )
      }
    swal(
      <Table celled unstackable compact fixed size='small'>
        <Table.Body>
          {tmp}
        </Table.Body>
      </Table>
    )
  }
  
  itemorcard=()=>{
    
    if (this.props.location.pathname==='/orders') {
      
      const {OrderId,Status,OrderDate}=this.props.order
      return(
        <Card
              onClick={()=>{this.props.history.push('/orderdetails/' + this.props.order.OrderId)}}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{OrderId}</Card.Header>
                <Card.Meta>{OrderDate}</Card.Meta>
                <Card.Meta>Status : {Status}</Card.Meta>
                
              </Card.Content>
          </Card>
      )
      
    } else if(this.props.location.pathname==='/items'){
      const {ItemName,ItemSerial,IsStandard,Type} = this.props.item
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{ItemName}</Card.Header>
                <Card.Meta>Type : {Type}</Card.Meta>
                <Card.Meta>Serial : {ItemSerial}
                <Button
                    onClick={()=>{this.props.delete(this.props.item)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Meta>Standard : {IsStandard?'Yes':'No'}</Card.Meta>
              </Card.Content>
          </Card>
      )
      
    }
    else if(this.props.location.pathname==='/shipping'){
      const {FirstName,LastName,Adress,City}=this.props.address
      
      
      
      return(
          <Card
              onClick={this.swaladdress}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{FirstName} {LastName}</Card.Header>
                <Card.Meta>City : {City}
                <Button
                    onClick={()=>{this.props.delete(this.props.address)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Meta>Address : {Adress}</Card.Meta>
              </Card.Content>
          </Card>
      )
      
    }
  }
    render() {
      
    return (
        
          this.itemorcard()
        
    )
  }
}


export default withRouter(CardComponent)
