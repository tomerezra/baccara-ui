import React, { Component } from 'react'
import logo from '../../images/logo.png'
import {withRouter} from 'react-router-dom'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination } from 'semantic-ui-react'
class PageHeading extends Component {
  render() {
    return (
        <Container text style={{maxWidth: 450}}>
          <Image src={logo} size='small' centered ></Image>
          <Header inverted size='madium' style={{marginTop:8,paddingBottom:8}}>{this.props.pagename}</Header>
       
        </Container>
    )
  }
}
export default withRouter(PageHeading)