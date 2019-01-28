import React, { Component } from 'react'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination, GridRow, Ref } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import logo from '../images/baccara.jpg'
import swal from '@sweetalert/with-react'
import MobileContainer from './MobileCotainer'
import {withRouter} from 'react-router-dom'
import Question from '../Question';
import Parts from '/Users/tomerezra/React/ui/src/data/parts'
class BuildItemForm extends Component {
  state={
      data:{
        module:"-",  
        body:"-",
        port:"-",
        function:"-",
        orifice:"-",
        seals:"-",
        override:"-",
        voltage:"-",
        power:"-",
        connector:"-"
      },
      progress:0,
      pagename:"Build New Order",
      part:"",
      partname:"",
      cancel:false,
      datatmp:{}
  }
componentDidMount(){
    this.setState({datatmp:this.state.data})
    
}
handleSubmit=()=>{
    swal({
        title:this.state.part,
        text:'Give name to the item',    
        content:'input'
    })
    .then((value)=>{
        this.setState({partname:value})
        
    })

}
handleClick=(e)=>{
    
    const {name}=e.target
    if (name==='order') {
        this.props.history.push('/createorder/0')
    }
    else if(name==='Add'){
        this.handleSubmit()
    }
    else if (this.state.progress>0) {
           
        swal({
            content:(
                <div>
                    <h3>Start Over?</h3>
                    <Button size='mini' content='No' onClick={()=>{swal.close()}}></Button>
                    <Button size='mini' content='Yes' onClick={()=>{
                        this.setState({progress:0});
                        this.setState({data:this.state.datatmp})
                        swal.close();}}>
                    </Button>
                </div>
            ),
            button:{visible:false},
            closeOnClickOutside: false,
        })
        .then(()=>{
            this.setState({cancel:false});
            this.makeQuestions()
        })
        
        
    } 
    else {this.makeQuestions()}          
}

makeQuestions=()=>{
    this.setState({cancel:false})
    const tmp = Parts.filter(part=>part.id===this.state.progress+1)
    const part=tmp[0]
    
    
    const buttons =part.options.map(opt=>
                                    <Button 
                                        size='mini'
                                        content={opt.name}
                                        value={opt.value} 
                                        color='green'
                                        onClick={()=>{
                                            this.setState({data:{...this.state.data,[part.value]:opt.value}})
                                            this.setState(prev=>{return{part:prev.part+opt.value}})
                                            swal.close()
                                    }}/>)
    
    swal({
        content:(
        <div>
            <h1>{part.name}</h1>
            <p>{part.question}</p>
            {buttons}
            <br/>
            <br/>
            <Button 
                negative
                floated='right'
                value='cancel'
                size='mini'
                content='Cancel'
                onClick={()=>{swal.close(); this.setState({cancel:true})}}></Button>
            <br/>
        </div>
        ),
        button:{visible:false},
        closeOnClickOutside: false,
        
        
      
    })
    .then(()=>{
        
        if (this.state.cancel) {
            
        }
        else if (this.state.progress<10)
            {
                this.setState({progress:this.state.progress+1})
                
                if (this.state.progress<10)
                {
                    
                    this.makeQuestions()
                }
            }
     
    
})}
buttonChange=()=>{
    
    if (this.state.progress===10) {
        return 'Add'
    }
    else if (this.state.progress>0) {
        return 'Continue'
    }
    else return 'Start'
}
    render() {
    const data=this.state.data
        return (
            
            <div style={{maxWidth: 450}} >
            {/* <MobileContainer pagename={this.state.pagename}/> */}
            <Header textAlign='center'>{this.state.pagename}</Header>
            <Segment >
                <Grid columns={10}  divided style={{fontSize:'9px'}}>
                    <Grid.Row textAlign='center' columns='equal'>
                    <Grid.Column textAlign='center' >
                        {data.module}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.body}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.port}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.function}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.orifice}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.seals}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.override}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.voltage}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.power}
                    </Grid.Column>
                    <Grid.Column  >
                        {data.connector}
                    </Grid.Column>
                    
                    </Grid.Row>
                  
              </Grid>
              <Progress
                        style={{display:this.state.progress>0?'block':'none'}}
                        attached='top'
                        value={this.state.progress} 
                        total='10' 
                        
                        active
                        color='green'>
                    </Progress>
              <Progress
                        style={{display:this.state.progress>0?'block':'none'}}
                        attached='bottom'
                        value={this.state.progress}
                        total='10' 
                        
                        active
                        color='green'>
                    </Progress>
              </Segment>
              <Segment 
              textAlign='center'
              >
               
                <Button 
                    color='youtube'
                    name={this.buttonChange()}
                    onClick={this.handleClick}
                    content={this.buttonChange()}
                    // disabled={this.state.progress===10?true:false}
                    >
                </Button>
                <Button 
                    color='green'
                    size='medium'
                    name='order'
                    onClick={this.handleClick}
                    disabled={this.state.progress===10?false:true}
                    content='Order'
                    >
                </Button>
                <Button 
                    color='grey'
                    size='medium'
                    onClick={()=>{this.props.history.goBack()}}
                    content='Cancel'
                    >
                </Button>
              </Segment>
              <Segment size='mini' style={{paddingTop:0, paddingBottom:0}}>
                  <Grid columns={3} celled>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Module</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.module}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Body</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.body}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>3</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Port</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.port}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>4</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Function</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.function}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>5</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Orifice</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.orifice}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Seals</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.seals}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Override</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.override}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Voltage</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.voltage}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>9</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Power</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.power}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column textAlign='center' mobile='2'>10</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Connector</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.connector}</Grid.Column> 
                    </Grid.Row>
                  </Grid>
                  
              </Segment>
            
              </div>
    )
  }
}
export default withRouter(BuildItemForm)