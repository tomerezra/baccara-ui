import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

export class CardComponent extends Component {
  state={
    data:this.props.order
  }
  itemorcard=()=>{
    if (this.props.location.pathname==='/orders') {
      return(
        <Card
              onClick={()=>{this.props.history.push('/orderdetails/' + this.props.order.id)}}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{this.props.order.ordernumber}</Card.Header>
                <Card.Meta>{this.props.order.date}</Card.Meta>
                <Card.Description>{this.props.order.status}</Card.Description>
                
              </Card.Content>
          </Card>
      )
      
    } else if(this.props.location.pathname==='/items'){
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{this.props.item.name}</Card.Header>
                <Card.Meta>{this.props.item.serial}
                <Button
                    onClick={()=>{this.props.delete(this.props.item)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Description>{this.props.item.standart}</Card.Description>
              </Card.Content>
          </Card>
      )
      
    }
    else if(this.props.location.pathname==='/shipping'){
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{this.props.address.country}</Card.Header>
                <Card.Meta>{this.props.address.city}
                <Button
                    onClick={()=>{this.props.delete(this.props.address)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Description>{this.props.address.address}</Card.Description>
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
