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
      const {id,status,createdAt}=this.props.order
      return(
        <Card
              onClick={()=>{this.props.history.push('/orderdetails/' + this.props.order.id)}}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{id}</Card.Header>
                <Card.Meta>{moment(createdAt.toDate()).calendar()}</Card.Meta>
                <Card.Description>{status}</Card.Description>
                
              </Card.Content>
          </Card>
      )
      
    } else if(this.props.location.pathname==='/items'){
      const {partname,serial} = this.props.item
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{partname}</Card.Header>
                <Card.Meta>{serial}
                <Button
                    onClick={()=>{this.props.delete(this.props.item)}}
                    floated='right'
                    content='Delete'
                    color='youtube'
                    size='small'>
                  </Button>
                  
                  
                    </Card.Meta>
                <Card.Description>Standard : {this.props.item.standard?'Yes':'No'}</Card.Description>
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
