import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../images/logo.png'
import PageHeading from './PageHeading'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination } from 'semantic-ui-react'


class MobileCotainer extends Component {
    state={
      visible:false
    }
    handleSidebarHide = () => {
      this.setState({ visible:!this.state.visible})
      
    }
    
    logOut=()=>{
      this.props.clicklogOut()
      this.props.history.push('/')
    }
    menubar=()=>{
      if (this.props.logedin) {
        return(
          <Menu.Item 
          
          onClick={this.handleSidebarHide}>
            <Icon name='sidebar' />Menu
          </Menu.Item>
        )
      } 
    }
    handleClick=(e,{name})=>{
      this.props.history.push(name)
      
      
    }
    
    
    render() {
        
        
    return (
        
                <Responsive as={Sidebar.Pushable} style={{maxWidth: 450,position:'fixed',zIndex:10,maxHeight:164}} >
                  
                  <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    vertical
                    
                    visible={this.state.visible}
                    onClick={this.handleSidebarHide}
                  >
                    <Menu.Item  name='/acount'  as='a' onClick={this.handleClick}>Acount</Menu.Item>
                    <Menu.Item  name='/createorder/0' as='a' onClick={this.handleClick}>Create New Order </Menu.Item>
                    <Menu.Item  name='/builditem' as='a' onClick={this.handleClick}>Build New Item</Menu.Item>
                    <Menu.Item  as='a' onClick={this.logOut}>Log Out</Menu.Item>
                  </Sidebar>
                  <Sidebar.Pusher dimmed={this.state.visible} >
                        <Menu style={{position:'fixed',
                                    zIndex:10,
                                    top:'auto',
                                    borderWidth:0                                    
                                    }} 
                              inverted pointing secondary size='large'>
                           {this.menubar()}
                        </Menu>
                        <Image src={logo}  sistyle={{height:100}}></Image>
                  </Sidebar.Pusher>
                
                </Responsive>
                
                
              )
            }
            
          }
          
          const mapStateToProps = (state) => ({
            logedin:state.logedin
          })
          
          const mapDispatchToProps =(dispatch) =>({
            
            clicklogOut:()=>dispatch({type:'Log Out', logout:false})
            
          })
          
 export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MobileCotainer))         
          
    
  

