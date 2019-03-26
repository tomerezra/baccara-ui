import React, { Component } from 'react'
import {Responsive, Sidebar,Button,Progress,Menu,Card,Icon,Label, Table,Form,Input, Grid, Header, Image, Message, Segment, Checkbox, GridColumn, Container,Pagination, GridRow, Ref } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {createItem,getstandard} from '../../store/actions/dataActions'
import swal from '@sweetalert/with-react'
import MobileContainer from './MobileCotainer'
import {withRouter,Redirect} from 'react-router-dom'

import Parts from '../../data/parts'

import tree2 from '../../data/tree2'

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
        connector:"-",
        
      },
      add:{
        serial:'',
        partname:'',
        standard:true
      },
      progress:0,
      pagename:"Build New Item",
      child:null,
      value:'',
      cancel:false,
      datatmp:{},
      change:[null,null,null,null,null,null,null,null,null,null],
      first:false
  }
componentDidMount(){
    this.setState({datatmp:this.state.data})
    this.props.getstandard()
    // swal({
    //     content:(
    //     <div>
    //         <h1>How to build a item</h1>
    //         <p>green is good the else is bad, good luck</p>
    //         <p>lets go!!</p>
    //     </div>)
    // })
}
handleSubmit=(e)=>{
    e.preventDefault()
    swal({
        title:this.state.add.serial,
        text:'Give name to the item',    
        content:'input'
    })
    .then((value)=>{
        
        this.setState({add:{...this.state.add,partname:value}})
        this.props.createItem(this.state.add)
        this.startOver()
        
    })

}
startOver=()=>{
    this.setState({progress:0});
    this.setState({data:this.state.datatmp})
    this.setState({add:{...this.state.add,serial:'',standard:true}})
    var tmp =this.state.change.map((i)=>i=null)
    this.setState({change:tmp,first:false})
    
}
handleClick=(e)=>{
    
    const {name}=e.target
    if (name==='order') {
        this.props.history.push('/createorder/0')
    }
    else if(name==='Add'){
        this.handleSubmit(e)
    }
    else if (this.state.progress>0) {
          
        swal({
            content:(
                <div>
                    <h3>Start Over?</h3>
                    <Button size='mini' content='No' onClick={()=>{swal.close()}}></Button>
                    <Button size='mini' content='Yes' onClick={()=>{
                        this.startOver()
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

isStandard=(id,value)=>{
    
   if (this.state.add.standard) {
    if (id==1) {
        return 'green'
    }
    else {
        var tmp = tree2.filter(p=>p.id==id)
        

        var tmp2 = tmp.filter(p=>p.parent.test(this.state.value))
      if(tmp2.length==0){
        return 'yellow'
      }
      
        else if (tmp2[0].value.test(value)) {
            
            return 'green'
        }
        
        else return 'yellow'
   }
   
    }
    else {
        if (!this.state.first) {
            this.state.change[id-2]=true
            this.setState({first:true})
        }
        
        return 'yellow'
    }
    
    

    
}
makeQuestions=()=>{
    this.setState({cancel:false})
    const tmp = Parts.filter(part=>part.id===this.state.progress+1)
    const part=tmp[0]
    
    
    const buttons =part.options.map(opt=>
                                    <Grid.Column
                                    style={{width:'30%'}}>
                                    <Button 
                                        size='mini'
                                        fluid
                                        content={opt.name}
                                        value={opt.value} 
                                        color={this.isStandard(part.id,opt.value)}
                                        onClick={(event,data)=>{
                                            this.setState({data:{...this.state.data,[part.value]:data.value}})
                                            this.setState(prev=>{return{add:{...this.state.add,serial:prev.add.serial+data.value,standard:data.color=='yellow'?false:true}}})
                                            
                                            this.setState({value:data.value})
                                                                                        
                                            swal.close()
                                            
                                               
                                    }}/>
                                    
                                    </Grid.Column>
                                    
                                    )

    
    swal({
        content:(
        <div>
            <h1>{part.name}</h1>
            <p>{part.question}</p>
            <Grid columns='3' centered>
                {buttons}
            </Grid>
            
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
    const {auth,guest}=this.props
    
    if (!auth.uid) {
        if (!guest) {
            return <Redirect to='/'/>
        } 
    }
        return (
            
            <div style={{width:'100%',maxWidth: 450}} >
            {/* <MobileContainer pagename={this.state.pagename}/> */}
            <Header textAlign='center'>{this.state.pagename}</Header>
            <Segment style={{display:this.state.progress>0?'block':'none'}} compact>
                {/* <Grid columns={10}  divided style={{fontSize:'8px'}}>
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
                  
              </Grid> */}
              <Progress
                        style={{marginTop:'5%'}}
                        // attached='top'
                        value={this.state.progress} 
                        total='10' 
                        progress='ratio'
                        active
                        success={this.state.progress==10?true:false}
                        warning={this.state.add.standard?false:true}
                        // color='green'
                        >
                    </Progress>
              {/* <Progress
                        style={{display:this.state.progress>0?'block':'none'}}
                        attached='bottom'
                        value={this.state.progress}
                        total='10' 
                        
                        active
                        color='green'>
                    </Progress> */}
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
                    <Grid.Row color={this.state.change[0]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>1</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Module</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.module}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[1]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>2</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Body</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.body}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[2]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>3</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Port</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.port}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[3]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>4</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Function</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.function}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[4]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>5</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Orifice</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.orifice}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[5]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>6</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Seals</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.seals}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[6]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>7</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Override</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.override}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[7]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>8</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Voltage</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.voltage}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[8]?'yellow':''}>
                        <Grid.Column textAlign='center' mobile='2'>9</Grid.Column>
                        <Grid.Column textAlign='center' mobile='7'>Power</Grid.Column>  
                        <Grid.Column textAlign='center' mobile='7'>{data.power}</Grid.Column> 
                    </Grid.Row>
                    <Grid.Row color={this.state.change[9]?'yellow':''}>
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
const mapStateToProps = (state) => {
  
    return{
      auth:state.firebase.auth,
      guest:state.auth.guest,
    }
     
  }
const mapDispatchToProps = (dispatch) =>{
    return{
        createItem:(item)=>dispatch(createItem(item)),
        getstandard:()=>dispatch(getstandard())
    }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BuildItemForm))