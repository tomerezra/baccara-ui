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
  Item
} from 'semantic-ui-react'
import MobileCotainer from './MobileCotainer';


class OrderHistoryForm extends Component{
   state={
       page:'Order History'
   }
  render(){
      return(
          <div>
              <MobileCotainer name={this.state.page}/>
              
                <Segment style={{ padding: '2em 0em' }} vertical>
                
                    <Grid verticalAlign='top' columns={1} centered>
                    <Grid.Column>
                        <Card
                            href='/orderdetails'
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer'
                            centered 
                            fluid>
                        </Card>
                        <Card
                            href='#card-example-link-card'
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer' 
                            centered
                            fluid>
                        </Card>
                        <Card
                            href='#card-example-link-card'
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer' 
                            centered
                            fluid>
                        </Card>
                        <Card
                            href='/'
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer'
                            
                            centered 
                            fluid>
                        </Card>
                    </Grid.Column>
                    
                    
                </Grid>
            </Segment>
          </div>
      )
  }
    
    

}
export default withRouter(OrderHistoryForm) 