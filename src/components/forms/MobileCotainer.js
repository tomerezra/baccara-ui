import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter,Route,Link,Switch,withRouter} from 'react-router-dom'

import PageHeading from './PageHeading'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination } from 'semantic-ui-react'


class MobileCotainer extends Component {
    state = {
      logedin:true
    }
    
    
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
    
    logOut=()=>{
      if (this.state.logedin) {
        this.setState({logedin:!this.state.logedin})
        this.handleSidebarHide()
      } else {
        this.props.history.push('/login')
        
      }
    
      
    }
    
    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state
    return (
        
                <Responsive as={Sidebar.Pushable}>
                  <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                  >
                    <Link to='/'>
                    <Menu.Item  as='a' >Home</Menu.Item>
                    </Link>
                    <Link to='/acount'>
                    <Menu.Item  as='a' >Acount </Menu.Item>
                    </Link>
                    <Link to='/order'>
                    <Menu.Item as='a' >Order</Menu.Item>
                    </Link>
                    <Menu.Item as='a' onClick={this.logOut}>{this.state.logedin? 'Log Out':'Log In'}</Menu.Item>
                  </Sidebar>
          
                  <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                      
                      inverted
                      textAlign='center'
                      style={{ minHeight: 100, padding: '0em 0em' }}
                      vertical
                    >
                      <Container>
                        <Menu inverted pointing secondary size='large'>
                          <Menu.Item onClick={this.handleToggle}>
                            <Icon name='sidebar' />
                          </Menu.Item>
                          
                        </Menu>
                      </Container>
                      <PageHeading name={this.props.name} />
                    </Segment>
          
                    {children}
                  </Sidebar.Pusher>
                </Responsive>
              )
            }
            
          }
          
 export default withRouter(MobileCotainer)         
          
    
  

