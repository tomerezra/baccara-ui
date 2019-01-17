import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, RouterContext } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
} from 'semantic-ui-react'

import MobileCotainer from './MobileCotainer';

class HomePageForm extends Component{
   state={
       page:'Acount'
   }
    render(){
       return(
           <div>
<MobileCotainer name={this.state.page}/>
    <Segment style={{ padding: '8em 0em' }} vertical>
    <Grid verticalAlign='top' columns={4} centered>
    <Grid.Row>
      <Grid.Column>
        <Card href='history'>
        <Icon name='book' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Orders History</Card.Header>
        </Card>
      </Grid.Column>
      <Grid.Column>
      <Card>
        <Icon name='user' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Profile</Card.Header>
        </Card>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <Card>
        <Icon name='credit card' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Payment Methhod</Card.Header>
        </Card>
      </Grid.Column>
      <Grid.Column>
      <Card>
        <Icon name='shipping' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Shipping Address</Card.Header>
        </Card>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <Card>
        <Icon name='setting' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Setting</Card.Header>
        </Card>
      </Grid.Column>
      <Grid.Column>
      <Card>
        <Icon name='help' size='huge' color='grey' fitted></Icon>
        <Card.Header textAlign='center'>Help</Card.Header>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </Segment>
    </div>
       )
   }
  
}

export default withRouter(HomePageForm)