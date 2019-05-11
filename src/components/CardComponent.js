import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

function CardComponent (props) {
    
    if (props.location.pathname==='/orders') {
      
      const {OrderId,Status,OrderDate}=props.order
      return(
        <Card
              onClick={()=>{props.history.push('/orderdetails/' + OrderId)}}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{OrderId}</Card.Header>
                <Card.Meta>{OrderDate}</Card.Meta>
                <Card.Meta>Status : {Status}</Card.Meta>
                
              </Card.Content>
          </Card>
      )
      
    } else if(props.location.pathname==='/items'){
      const {ItemName,ItemSerial,IsStandard,Type} = props.item
      return(
          <Card
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{ItemName}</Card.Header>
                <Card.Meta>Type : {Type}
                  <Button
                      onClick={(e)=>{e.stopPropagation(); props.delete(props.item)}}
                      floated='right'
                      content='Delete'
                      color='youtube'
                      size='small'>
                  </Button>
                </Card.Meta>
                <Card.Meta>Serial : {ItemSerial}</Card.Meta>
                <Card.Meta>Standard : {IsStandard?'Yes':'No'}</Card.Meta>
              </Card.Content>
          </Card>
      )
      
    }
    else if(props.location.pathname==='/shipping'){
      const {FirstName,LastName,Adress,City,ID,PhoneNumber}=props.address
      
      
      
      return(
          <Card
              onClick={()=>props.history.push('/newaddress/'+ID)}
              centered 
              fluid>
              <Card.Content>
                <Card.Header>{FirstName} {LastName}</Card.Header>
                <Card.Meta>City : {City}
                <Button
                    onClick={(e)=>{e.stopPropagation(); props.delete(props.address)}}
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

export default withRouter(CardComponent)
