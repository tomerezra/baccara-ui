import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

import { Icon, Search ,Button, List} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import data from '../../data/data'
import swal from '@sweetalert/with-react'
import {signOut} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
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


  
class PrimarySearchAppBar extends React.Component {
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
  const tmp = result.map(obj=>{return {obj,title:obj.name}})
  return tmp
}

resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

handleResultSelect = (e, { result}) => {
  const tmp = []
  
  for (const key in result.obj) {
        tmp.push(<List.Item>{key} - {(key,result.obj[key])}</List.Item>)}
  swal(<List celled>{tmp}</List>)

  this.setState({value:result.title})}

handleSearchChange = (e, { value }) => {
  
  this.setState({ isLoading: true, value })

  setTimeout(() => {
    if (this.state.value.length < 1) return this.resetComponent()

    const re = new RegExp(this.state.value,'i')
    
    const tmp=[]
    
    for (let i = 1; i < 4; i++) {
      if (i===1) {
        const result = data.items.results.filter(item=>(re.test(item.name)))
        if (result.length>0) {
          tmp.push(
            {
            name:data.items.name,
            results:this.getResults(result)
            }
          )
        }
      }
      else if (i===2) {
        const result = data.orders.results.filter(order=>(re.test(order.name)))
        if (result.length>0) {
          tmp.push(
            {
            name:data.orders.name,
            results:this.getResults(result)
            }
          )
        }
      }
      else{
        const result = data.shipping.results.filter(address=>(re.test(address.name)))
        if (result.length>0) {
          tmp.push(
            {
            name:data.shipping.name,
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
      if (!this.props.location.pathname=='/')
      {
        return <Redirect to='/'/>
      }
    }
     
    
    
        return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor:'grey',display:this.props.location.pathname==='/'?'none':''}}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <Icon 
                name='arrow circle left' 
                onClick={()=>{
                    
                    if (this.props.location.pathname==='/acount') {
                        
                    }
                    else this.props.history.goBack()}}
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

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  
  return{
        
        auth:state.firebase.auth
    }
    
  }
  const mapDispatchToProps =(dispatch)=> {
    return{
      
      signOut:()=>dispatch(signOut())
    }
    
  }
  
export default withRouter(withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(PrimarySearchAppBar)));