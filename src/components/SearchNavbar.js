import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import {Search ,Button,Table,Icon} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import {signOut} from '../store/actions/authAction'
// import moment from 'moment'

const styles = {
  root: {
    width: '100%',
    position:'fixed',
    zIndex:10,
  },
  grow: {
    flexGrow: 1,
  },
  appbar:{
    backgroundColor:'grey',
    position:'static'
    
  },

}

class SearchNavbar extends React.Component {
  state = {
    isLoading: false,
    results: [],
    value: ""
  };
  
componentWillMount() {
  this.resetComponent()
}
getResults = (result,name)=>{
  return result.map(obj=>{
    if (name==='Orders') {
      return {obj,title:obj.OrderId}
    } else {
      return {obj,title:obj.ItemName}
    }
    })
}

resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

handleResultSelect = (e,{result}) => {
  const tmp = []
  var header
  console.log(result)
  for (const key in result.obj) {
        if (key==='Address'||key==='Quantity') {
          
        }
        else{
          if (key==='IsStandard') {
            header = 'Item'
            tmp.push(
              <Table.Row>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{(key,result.obj[key])?'Yes':'No'}</Table.Cell>
              </Table.Row>
            )
          }
          else if (key==='Part') {
            header= 'Order'
            tmp.push(
              <Table.Row>
              <Table.Cell>Items</Table.Cell>
              <Table.Cell>{(key,result.obj[key].length)}</Table.Cell>
            </Table.Row>
            )
            
          }
          // else if (key==='createdAt') {
          //   tmp.push(
          //     <Table.Row>
          //       <Table.Cell>{key}</Table.Cell>
          //       <Table.Cell>{(key,moment(result.obj[key].toDate()).calendar())}</Table.Cell>
          //     </Table.Row>
              
          //   )
          // }
          else tmp.push(
            <Table.Row>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{(key,result.obj[key])}</Table.Cell>
            </Table.Row>
          )
        }
          
      }
        
  
swal(
    <div>
      <Table celled unstackable compact fixed size='small' >
      <Table.Header >
        <Table.Row textAlign='center'>
          <Table.HeaderCell  colSpan='2'>{header}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {tmp}
        </Table.Body>
      </Table>
      
    </div>
    )
  this.setState({value:result.title})}

handleSearchChange = (e, { value }) => {
  
  this.setState({ isLoading: true, value })

  setTimeout(() => {
    if (this.state.value.length < 1) return this.resetComponent()
    const {data} =this.props
    const re = new RegExp(this.state.value,'i')
    
    const tmp=[]
    
    for (let i = 1; i < 3; i++) {
      if (i===1) {
        const result = data.items.filter(item=>(re.test(item.ItemName)))
        if (result.length>0) {
          tmp.push(
            {
            name:'Items',
            results:this.getResults(result,'Items')
            }
          )
        }
      }
      else if (i===2) {
        const result = data.orders.filter(order=>(re.test(order.OrderId)))
        if (result.length>0) {
          tmp.push(
            {
            name:'Orders',
            results:this.getResults(result,'Orders')
            }
          )
        }
      }
      // else{
      //   const result = data.addresses.filter(address=>(re.test(address.address)))
      //   if (result.length>0) {
      //     tmp.push(
      //       {
      //       name:'Addresses',
      //       results:this.getResults(result)
      //       }
      //     )
      //   }
        
      // }
      }

      
    this.setState({
      isLoading: false,
      results: tmp,
    })
  }, 300)
}
  render() {
    const {auth,classes}=this.props
    return (
      <div className={classes.root}>
      
        <AppBar className={classes.appbar} style={{display:this.props.location.pathname==='/'?'none':this.props.location.pathname==='/login'?'none':''}}>
          <Toolbar>
            <Icon
            name='arrow circle left'
            size='large'
            style={{display:auth.uid?'':'none'}} 
            onClick={()=>{
              if (this.props.location.pathname==='/acount') {  
              }
              else this.props.history.goBack()}}>

            </Icon>

            <div className={classes.grow} />
            <Search 
                className={classes.search}
                placeholder='Search...' 
                style={{display:auth.uid?'':'none'}}
                category
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.results}
                value={this.state.value}
                {...this.props}
                >
            </Search>
            
            <div className={classes.grow} />

            <Button content='Log Out' circular size='mini' onClick={()=>this.props.signOut()} style={{display:auth.uid?'':'none'}}></Button>
            
          </Toolbar>
        </AppBar>


      </div>
    );
  }
}

SearchNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  
  return{
        
        auth:state.firebase.auth,
        // data:state.firestore.ordered
        data:state.data
    }
    
  }
  const mapDispatchToProps =(dispatch)=> {
    return{
      
      signOut:()=>dispatch(signOut())
    }
    
  }
  
export default withRouter(withStyles(styles)(compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'addresses'},{collection:'items'},{collection:'orders'}])
)(SearchNavbar)));