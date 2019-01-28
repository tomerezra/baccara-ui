import React, { Component } from 'react'
import {Icon, Button, Grid, Segment} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

class Footer extends Component{
    state={
        pagename:''
    }
    addButton=()=>{
        const visible=this.props.location.pathname
        if (visible==='/history/orders'||visible==='/history/items'||visible==='/history/addresses') {
            return ''
        }
        else return 'none'
    }
    
    handleClickAdd=()=>{
        
        if (this.props.location.pathname==='/history/orders') {
            this.props.history.push('/createorder/0')
            this.setState({pagename:'orders'})
        }
        else if (this.props.location.pathname==='/history/items') {
            this.props.history.push('/builditem')
            this.setState({pagename:'items'})
        }
        else if (this.props.location.pathname==='/history/addresses') {
            this.props.history.push('/newshipping')
            this.setState({pagename:'shipping'})
        }
        
      }
      handleClick=(e)=>{
          
        this.props.history.push(e)
        
        //   if (this.props.location.pathname==='/history/orders') {
        //     this.props.history.push('/createorder/0')
        //     this.setState({pagename:'orders'})
        // }
        // else if (this.props.location.pathname==='/history/items') {
        //     this.props.history.push('/builditem')
        //     this.setState({pagename:'items'})
        // }
        // else if (this.props.location.pathname==='/history/addresses') {
        //     this.props.history.push('/newshipping')
        //     this.setState({pagename:'shipping'})
        // }
      }

    render(){
    return (
        <>
        {/* <footer style={{
            position:'fixed',
            zIndex:10,
            background:'black',
            top:'auto',
            bottom:0,
            width:450,
            height:'8%'}}
            >
            <Icon 
                inverted
                name='angle left'
                size='large'
                style={{position:'fixed',marginTop:'4%',marginLeft:5,display:this.props.logedin?'':'none'}}
                onClick={()=>{this.props.history.goBack()}}
                >
            </Icon>
            <Button 
                circular 
                size='large'
                icon='add'
                style={{bottom:'5%',left:'45%',position:'fixed',display:this.addButton()}}
                onClick={this.handleClick}
                >
            </Button>
        </footer>  */}
        <Segment 
            style={{
                background:'grey',
                bottom:0, 
                width:'100%',
                position:'fixed'}}
            >
            <Grid verticalAlign='middle'>
            <Grid.Row columns='equal' textAlign='center'  >
            <Grid.Column>
            <Icon 
                inverted
                name='barcode'
                size='large'
                
                onClick={()=>this.handleClick('/history/items')}
                >
            </Icon>
            </Grid.Column>
            <Grid.Column>
            <Icon 
                inverted
                name='unordered list'
                size='large'
                
                onClick={()=>this.handleClick('/history/orders')}
                >
            </Icon>
            </Grid.Column>
            <Grid.Column>
            <Icon 
                inverted
                name='user'
                size='large'
                
                onClick={()=>this.handleClick('/acount')}
                >
            </Icon>
            </Grid.Column>
            <Grid.Column>
            <Icon 
                inverted
                name='setting'
                size='large'
                color='blue'
                onClick={()=>{this.props.history.push()}}
                >
            </Icon>
            </Grid.Column>
                        
            </Grid.Row>
            
            </Grid>
            
            <Button 
                circular 
                size='large'
                icon='add'
                style={{bottom:'5%',left:'45%',position:'fixed',display:this.addButton()}}
                onClick={this.handleClickAdd}
                >
            </Button>
        </Segment> 
        </>
      )
  }
    
}
const mapStateToProps = (state) => ({
  logedin:state.logedin
})



export default withRouter(connect(mapStateToProps)(Footer))
