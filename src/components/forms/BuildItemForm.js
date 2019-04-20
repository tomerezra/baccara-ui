import React, { Component } from 'react'
import {Button,Progress, Grid, Header, Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {createItem,getstandard,createitemguest} from '../../store/actions/dataActions'
import swal from '@sweetalert/with-react'
import {withRouter,Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import Parts from '../../data/parts'
import Axios from 'axios';
import firebase from 'firebase/app'


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
        ItemSerial:'',
        ItemName:'',
        IsStandard:true,
        Type:'',
        Email:this.props.auth.email
      },
      progress:0,
      pagename:"Build New Item",
      child:null,
      value:'',
      cancel:false,
      datatmp:{},
      change:[null,null,null,null,null,null,null,null,null,null],
      first:false,
      tree:[],
      orderbutton:true,
      partdata:{},
      questions:[],
      invalid:[],
      categories:[],
      start:false,
      Type:{}
  }

componentDidMount(){

    this.setState({datatmp:this.state.data})
    Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/Categories')
    .then(res=>this.setState({categories:res.data}))
    .catch(()=>{
        swal('','something worng, try again','error');
        this.props.history.goBack()}
        )
    // Add invalid to firebase
    // Parts.map(part=>{
        
    //     var options = part.options.map(x=>x.value)
    //     options.forEach(opt => {
    //         db.collection('Ainvalid'+part.id).doc(opt).set({
    //             module:"",  
    //             body:"",
    //             port:"",
    //             function:"",
    //             orifice:"",
    //             seals:"",
    //             override:"",
    //             voltage:"",
    //             power:"",
    //             connector:""
    //         })
    //     });
        
    // })
    
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
        title:this.state.add.ItemSerial,
        text:'Give name to the item',    
        content:'input'
    })
    .then((value)=>{
        
        this.setState({add:{...this.state.add,ItemName:value,Type:this.state.Type.Type}})
        if (this.props.guest) {
           this.props.createitemguest(this.state.add) 
        }
        else this.props.createItem(this.state.add)
        this.setState({orderbutton:false})
        this.startOver()
        
        
    })

}
startOver=()=>{
    var tmp =this.state.change.map((i)=>i=null)
    this.setState({
        progress:0,
        start:false,
        data:this.state.datatmp,
        add:{...this.state.add,ItemSerial:'',IsStandard:true,Type:''},
        change:tmp,
        first:false
    });
    
    
}
handleClick=(e)=>{
 
    const {name}=e.target
    if (name==='order') {
        this.props.history.push('/createorder/0')
    }
    else if(name==='Add'){
        this.handleSubmit(e)
    }
    else if (this.state.start) {
          
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
isInvalid=(id,value)=>{
    
    var stage = this.state.invalid.filter(s=>s.stage==id)
    
    var val = stage[0].value.filter(x=>Object.getOwnPropertyNames(x)==value)
    
    if (id===1) {
        
    } else {
        
    for (const name in val[0][value]) {
        
        if (val[0][value][name]=='') {
            
        }
        else if (RegExp(val[0][value][name]).test(this.state.data[name])) {
            
            return true
        }
    }
    }
    
    
    
}
isStandard=(id,value)=>{
   if (this.isInvalid(id,value)) {
       return
   }
    
   if (this.state.add.IsStandard) {
    if (id===1) {
        return 'green'
    }
    else {
        var tmp = this.state.tree.filter(p=>p.id==id)
        var tmp2 = tmp.filter(p=>p.parent.test(this.state.value))
      if(tmp2.length===0){
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
getAllData=()=>{
    const{Type}=this.state
    
    var db =firebase.firestore()
    var tree=[]
    var invalid=[]
    var invtmp=[]
    for (let i = 1; i <= Type.Stages; i++) {
        db.collection(Type.Type+'invalid'+i.toString()).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {    
                invtmp.push({[doc.id]:doc.data()}); 
            });
        })
        .then(()=>invalid.push({stage:i,value:invtmp}))
        .then(()=>{
            
            invtmp=[]
        })
        
    }
    
    this.setState({invalid})
   
    db.collection(Type.Type+"tmp").orderBy('id', 'asc').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {    
            tree.push({id:doc.data().id,parent:new RegExp(doc.data().parent,'i'),value:new RegExp(doc.data().value,'i')});
        });

    })
    this.setState({tree})

    Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/AllItem?type='+Type.Type+'&stages='+Type.Stages)
    .then(res=>this.setState({partdata:res.data}))
    .catch(()=>{
        swal('','something worng, try again','error');
        this.startOver()
    })
      
    Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/Question?type='+Type.Type)
    .then(res=>this.setState({questions:res.data}))
    .catch(()=>{
        swal('','something worng, try again','error');
        this.startOver()
    })
}
makeQuestions=()=>{
    const {partdata,questions,progress,categories,start} =this.state
    this.setState({cancel:false})
    var part = partdata[progress+1]
    var question = questions.filter(q=>q.QID===progress+1)
    question=question[0]
    
    // const tmp = Parts.filter(part=>part.id===this.state.progress+1)
    // const part=tmp[0]
    var buttons
    if (!start) {
        buttons=categories.map(c=>
            <Grid.Column
            style={{width:'30%'}}>
            <Button 
                size='mini'
                fluid
                content={c.Type}
                value={c.Type} 
                color='green'
                onClick={(event,data)=>{
                    var Type =categories.filter(t=>t.Type===data.value)
                    this.setState({Type:Type[0]})
                                                                
                    swal.close()
       
            }}/>
            
            </Grid.Column>
            
            )
    } else {
        buttons =part.map(opt=>
            <Grid.Column
            style={{width:'30%'}}>
            <Button 
                size='mini'
                fluid
                content={opt.Description}
                value={opt.ID} 
                color={this.isStandard(progress+1,opt.ID)}
                disabled={this.isInvalid(progress+1,opt.ID)}
                onClick={(event,data)=>{
                    this.setState({data:{...this.state.data,[question.Name.toLowerCase()]:data.value}})
                    this.setState(prev=>{return{add:{...this.state.add,ItemSerial:prev.add.ItemSerial+data.value,IsStandard:data.color==='yellow'?false:true}}})
                    
                    this.setState({value:data.value})
                                                                
                    swal.close()
                    
                       
            }}/>
            
            </Grid.Column>
            
            )
    }
    
    if (!start) {
        swal({
        
            content:(
            <div>
                <h1>Type</h1>
                <p>Choose Type</p>
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
            else {
                this.setState({start:true})
                this.getAllData()
                setTimeout(()=>{
                    this.makeQuestions()
                },1500)
                }
  
    })
    } else {
        swal({
        
            content:(
            <div>
                <h1>{question.Name}</h1>
                <p>{question.Question}</p>
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
         
        
    }) 
    } 

    
    }


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
    // console.log(this.state.partdata)
    if (!auth.uid) {
        if (!guest) {
            return <Redirect to='/'/>
        } 
    }
        return (
            
            <div style={{width:'100%',maxWidth: 450}} >
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
                        success={this.state.progress===10?true:false}
                        warning={this.state.add.IsStandard?false:true}
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
                    
                    >
                </Button>
                <Button 
                    color='green'
                    size='medium'
                    name='order'
                    onClick={this.handleClick}
                    disabled={this.state.orderbutton}
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
    //   data:state.firestore.ordered

    }
     
  }
const mapDispatchToProps = (dispatch) =>{
    return{
        createItem:(item)=>dispatch(createItem(item)),
        getstandard:()=>dispatch(getstandard()),
        createitemguest:(item)=>dispatch(createitemguest(item))
    }
  }
export default withRouter(compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:'standard'}])
  )(BuildItemForm))