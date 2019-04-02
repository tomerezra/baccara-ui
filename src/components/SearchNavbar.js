import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux'
import { Icon, Search ,Button,Table} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import {signOut} from '../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
const styles = {
  root: {
    width: '100%',
    position:'fixed',
    zIndex:10
    
  },
  grow: {
    flexGrow: 1,
  },

}


  
class SearchNavbar extends React.Component {
  state = {
    isLoading: false,
    results: [],
    value: ""
  };
  logOut=()=>{
    
    this.props.signOut();
        
    }
    

componentWillMount() {
  this.resetComponent()
}
getResults = result=>{
  const tmp = result.map(obj=>{return {obj,title:obj.id}})
  return tmp
}

resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

handleResultSelect = (e, {result}) => {
  const tmp = []
  
  for (const key in result.obj) {
        if (key==='orderitems'||key==='agree') {
          
        }
        else{
          if (key==='standard') {
            
            tmp.push(
              <Table.Row>
                <Table.Cell>{key.charAt(0).toUpperCase()+key.slice(1)}</Table.Cell>
                <Table.Cell>{(key,result.obj[key])?'Yes':'No'}</Table.Cell>
              </Table.Row>
            )
          }
          else if (key==='createdAt') {
            tmp.push(
              <Table.Row>
                <Table.Cell>{key.charAt(0).toUpperCase()+key.slice(1)}</Table.Cell>
                <Table.Cell>{(key,moment(result.obj[key].toDate()).calendar())}</Table.Cell>
              </Table.Row>
              
            )
          }
          else tmp.push(
            <Table.Row>
              <Table.Cell>{key.charAt(0).toUpperCase()+key.slice(1)}</Table.Cell>
              <Table.Cell>{(key,result.obj[key])}</Table.Cell>
            </Table.Row>
          )
        }
          
      }
        
  
swal(
    <div>
      <Table celled unstackable compact fixed size='small'>
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
    
    for (let i = 1; i < 4; i++) {
      if (i===1) {
        const result = data.items.filter(item=>(re.test(item.partname)))
        if (result.length>0) {
          tmp.push(
            {
            name:'Items',
            results:this.getResults(result)
            }
          )
        }
      }
      else if (i===2) {
        const result = data.orders.filter(order=>(re.test(order.id)))
        if (result.length>0) {
          tmp.push(
            {
            name:'Orders',
            results:this.getResults(result)
            }
          )
        }
      }
      else{
        const result = data.addresses.filter(address=>(re.test(address.address)))
        if (result.length>0) {
          tmp.push(
            {
            name:'Addresses',
            results:this.getResults(result)
            }
          )
        }
        
      }
      }

      
    this.setState({
      isLoading: false,
      results: tmp,
    })
  }, 300)
}
  render() {
    const {auth}=this.props
    
    const { classes } = this.props;
    if (!auth.uid) {
      if (!this.props.location.pathname==='/')
      {
        return <Redirect to='/'/>
      }
    }
     
    
    
        return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor:'grey',display:this.props.location.pathname==='/'?'none':''}}>
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Open drawer"
              onClick={()=>{
                if (this.props.location.pathname==='/acount') {  
                }
                else this.props.history.goBack()}}
              >
              <Icon 
                name='arrow circle left' 
                style={{display:auth.uid?'':'none'}}/>
            </IconButton>
            
            <div>
              <Search 
                placeholder='Search...' 
                style={{display:auth.uid?'':'none'}}
                category
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.results}
                value={this.state.value}
                {...this.props}
                ></Search>
            </div>
            
            <div className={classes.grow} />
            
            <div className={classes.sectionMobile}>
            <Button content='Log Out' circular size='mini' onClick={this.logOut} style={{display:auth.uid?'':'none'}}></Button>
            
            </div>
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
        data:state.firestore.ordered
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