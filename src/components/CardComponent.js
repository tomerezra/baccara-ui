import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
export class CardComponent extends Component {
  state={
    data:this.props.order
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
                <Card.Description>{Status}</Card.Description>
                
              </Card.Content>
          </Card>
      )
      
    } else if(this.props.location.pathname==='/items'){
      const {ItemName,ItemSerial,IsStandard} = this.props.item
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{ItemName}</Card.Header>
                <Card.Meta>{ItemSerial}
                <Button
                    onClick={()=>{this.props.delete(this.props.item)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Description>Standard : {IsStandard?'Yes':'No'}</Card.Description>
              </Card.Content>
          </Card>
      )
      
    }
    else if(this.props.location.pathname==='/shipping'){
      const {FirstName,LastName,Adress,City}=this.props.address
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{FirstName} {LastName}</Card.Header>
                <Card.Meta>{City}
                <Button
                    onClick={()=>{this.props.delete(this.props.address)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Description>{Adress}</Card.Description>
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
