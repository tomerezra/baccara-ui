import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Icon, Search ,Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

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
    
  };
  logOut=()=>{
    this.props.clicklogOut()
    this.props.history.push('/')
}
  render() {
    
    const { classes } = this.props;
        return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor:'grey'}}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <Icon 
                name='arrow circle left' 
                onClick={()=>{
                    console.log(this.props.location.pathname)
                    if (this.props.location.pathname==='/acount') {
                        
                    }
                    else this.props.history.goBack()}}
                style={{display:this.props.auth?'':'none'}}/>
            </IconButton>
            
            <div>
              <Search placeholder='Search...' style={{display:this.props.auth?'':'none'}}></Search>
            </div>
            
            <div className={classes.grow} />
            
            <div className={classes.sectionMobile}>
            <Button content='Log Out' circular size='mini' onClick={this.logOut} style={{display:this.props.auth?'':'none'}}></Button>
            
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
        auth:state.auth.logedin,
        nav:state.nav.footer
    }
    
  }
  const mapDispatchToProps =(dispatch)=> ({
    clicklogOut:()=>dispatch({type:'Log Out', logout:false})
  })
  
export default withRouter(withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(PrimarySearchAppBar)));