import React, { Component } from 'react'
import { Segment,Icon,Input, Button, Search, Grid } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

export class Navbar extends Component {
    logOut=()=>{
        this.props.clicklogOut()
        this.props.history.push('/')
    }
    
    render() {
    return (
      <Segment style={{
        background:'grey',
        top:0,
        zIndex:10,
        width:'100%',
        height:'9%',
        position:'fixed',
        }}
        
    >
    <Grid verticalAlign='middle'>
        <Grid.Row textAlign='center' columns='3'>
        <Grid.Column mobile='1'>
            <Icon 
                inverted
                name='angle left'
                size='large'
                style={{display:this.props.logedin?'':'none'}}
                onClick={()=>{this.props.history.goBack()}}
                >
            </Icon>
        </Grid.Column>
        <Grid.Column>
            <Search icon='search'  placeholder='Search...' style={{display:this.props.logedin?'':'none'}}/>
        </Grid.Column>
        <Grid.Column mobile='5' floated='right'>
            <Button content='Log Out' circular size='small' onClick={this.logOut} style={{display:this.props.logedin?'':'none'}}></Button>
        </Grid.Column>
        </Grid.Row>
        
    </Grid>
            
            
            
      </Segment>
        
      
    )
  }
}
const mapStateToProps = (state) => ({
    logedin:state.logedin
  })
  
  const mapDispatchToProps =(dispatch)=> ({
    clicklogOut:()=>dispatch({type:'Log Out', logout:false})
  })
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar))
