import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

export class CardComponent extends Component {
  state={
    data:this.props.order
  }
  
  
  whichCard=()=>{
    
    if (this.props.location.pathname==='/orders') {
      
      const {OrderId,Status,OrderDate}=this.props.order
      return(
        <Card
              onClick={()=>{this.props.history.push('/orderdetails/' + OrderId)}}
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
      const {FirstName,LastName,Adress,City,ID,PhoneNumber}=this.props.address
      
      
      
      return(
          <Card
              onClick={()=>this.props.history.push('/newaddress/'+ID)}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{FirstName} {LastName}</Card.Header>
                <Card.Meta>City : {City}
                <Button
                    onClick={(e)=>{e.stopPropagation(); this.props.delete(this.props.address)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Meta>Address : {Adress}</Card.Meta>
                <Card.Meta>Phone : {PhoneNumber}</Card.Meta>
              </Card.Content>
          </Card>
      )
      
    }
  }
    render() {
      
    return (
        
          this.whichCard()
        
    )
  }
}


export default withRouter(CardComponent)
